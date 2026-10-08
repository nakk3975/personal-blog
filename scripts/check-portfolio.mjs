import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import { readFile, mkdir } from 'node:fs/promises';
import { resolve, extname } from 'node:path';
import { chromium } from 'playwright';

const root = resolve('dist');
const server = createServer(async (req, res) => {
  const path = resolve(root, '.' + new URL(req.url, 'http://localhost').pathname);
  if (!path.startsWith(root + '/')) { res.writeHead(403).end(); return; }
  try {
    const data = await readFile(path);
    res.setHeader('Content-Type', ({ '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.webp': 'image/webp' })[extname(path)] || 'application/octet-stream');
    res.end(data);
  } catch { res.writeHead(404).end(); }
});
await new Promise(r => server.listen(0, '127.0.0.1', r));
const origin = `http://127.0.0.1:${server.address().port}`;
const browser = await chromium.launch({
  headless: true,
  ...(process.env.CHROMIUM_EXECUTABLE_PATH ? { executablePath: process.env.CHROMIUM_EXECUTABLE_PATH } : {}),
  args: ['--no-sandbox', '--disable-dev-shm-usage'],
});
const expected = ['EchoLoop', 'GhostDesk', 'OrbitTrip', 'Game Chronicle', 'EternalReturnGG'];
const results = [];
await mkdir('test-results', { recursive: true });
try {
  for (const width of [320, 390, 540, 760, 980, 1366, 1920]) {
    const context = await browser.newContext({ viewport: { width, height: 900 }, reducedMotion: 'reduce', hasTouch: width < 761 });
    const page = await context.newPage();
    const errors = [];
    page.on('pageerror', e => errors.push(e.message));
    page.on('response', r => { if (r.status() >= 400) errors.push(`${r.status()} ${r.url()}`); });
    for (const file of ['index.html', 'projects.html']) {
      await page.goto(`${origin}/${file}`);
      const order = await page.locator(file === 'index.html' ? '.project-content h4' : '.detail-section-alt .deep-case h3').allTextContents();
      assert.deepEqual(order, expected, `${width} ${file} project order`);
      const invalidLinks = await page.evaluate(async () => {
        const invalid = [];
        for (const a of document.querySelectorAll('a[href]')) {
          const url = new URL(a.href);
          if (url.origin !== location.origin) {
            if (a.target === '_blank' && (!a.rel.includes('noopener') || !a.rel.includes('noreferrer'))) invalid.push(a.href);
            continue;
          }
          const doc = url.pathname === location.pathname ? document : new DOMParser().parseFromString(await (await fetch(url.pathname)).text(), 'text/html');
          if (url.hash && !doc.getElementById(decodeURIComponent(url.hash.slice(1)))) invalid.push(a.href);
        }
        return invalid;
      });
      assert.deepEqual(invalidLinks, [], `${width} ${file} broken anchors`);
      for (const id of ['echoloop', 'ghostdesk']) {
        const card = page.locator(file === 'index.html' ? `[data-project="${id}"]` : `#${id}`);
        await card.scrollIntoViewIfNeeded();
        const img = card.locator('img');
        await img.evaluate(el => el.decode());
        assert.ok(await img.evaluate(el => el.naturalWidth > 0 && el.alt.length > 0), `${id} image`);
        assert.equal(await card.locator('a[href^="https://github.com/nakk3975/"]').count() >= 1, true);
        const metrics = await card.evaluate(el => {
          const parts = [...el.querySelectorAll('h3, h4, p, img, a, .tags')].map(e => ({ r: e.getBoundingClientRect(), text: e.textContent?.slice(0, 40) }));
          const r = el.getBoundingClientRect();
          return parts.filter(({ r: p }) => p.width > 0 && (p.left < r.left - 1 || p.right > r.right + 1)).map(({ text }) => text);
        });
        assert.deepEqual(metrics, [], `${width} ${file} ${id} content outside card`);
        if ([390, 1366].includes(width)) await card.screenshot({ path: `test-results/${file.replace('.html','')}-${id}-${width}.png` });
      }
      const body = await page.locator('body').innerText();
      assert.ok(body.includes('자동') && body.includes('실제') && body.includes('비공개'));
      assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `${width} ${file} horizontal overflow`);
      if (width <= 760) {
        await page.evaluate(() => scrollTo(0, 0));
        await page.getByRole('button', { name: '메뉴 열기' }).click();
        assert.equal(await page.locator('.menu-toggle').getAttribute('aria-expanded'), 'true');
        await page.keyboard.press('Escape');
        assert.equal(await page.locator('.menu-toggle').getAttribute('aria-expanded'), 'false');
        await page.getByRole('button', { name: '메뉴 열기' }).click();
        await page.locator('#primary-nav a').first().click();
        assert.equal(await page.locator('.menu-toggle').getAttribute('aria-expanded'), 'false');
      }
      assert.deepEqual(errors, [], `${width} ${file} page or network errors`);
      results.push({ width, file, status: 'passed' });
    }
    await context.close();
  }
  console.log(JSON.stringify({ browser: await browser.version(), results }, null, 2));
} finally { await browser.close(); await new Promise(r => server.close(r)); }
