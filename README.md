# 안재원 · 개발 포트폴리오

Spring·PostgreSQL 기반 서비스 운영 경험과 개인 프로젝트를 소개하는 정적 웹사이트입니다.

## 구성

- `dist/index.html`: 포트폴리오 본문
- `dist/projects.html`: 프로젝트 상세·검증 범위
- `dist/assets/`: 게임 대표 이미지(WebP)
- `dist/styles.css`: 반응형 스타일
- `dist/script.js`: 모바일 메뉴

## Render 배포 설정

Static Site로 연결하고 브랜치를 `main`, 게시 경로를 `dist`로 설정합니다. 별도 빌드 단계는 없습니다.

## 로컬 확인

`dist/index.html`을 브라우저로 열면 됩니다. 외부 라이브러리 없이 동작합니다.

## 포트폴리오 회귀 검사

```sh
npm ci
npx playwright install chromium
npm test
```

외부 서버에 의존하지 않는 로컬 HTTP 서버로 두 페이지를 검사합니다. 320·390·540·760·980·1366·1920px에서 프로젝트 순서, 앵커 연결, 대표 이미지 로딩, 카드 내부 배치와 가로 넘침, 모바일 메뉴 열기·Esc·링크 선택을 확인합니다. 390·1366px 카드 스크린샷은 `test-results/`에 생성합니다.

이미 설치된 Chromium은 `CHROMIUM_EXECUTABLE_PATH=/path/to/chromium npm test`로 사용할 수 있습니다. Linux에서는 한글 글꼴을 설치한 환경에서 화면을 확인하세요. 정적 배포에는 npm 설치나 브라우저가 필요하지 않습니다.

게임의 검증 근거와 이번 사이트 검사 결과는 [docs/PORTFOLIO_UPDATE_20261008.md](docs/PORTFOLIO_UPDATE_20261008.md)에 정리했습니다.
