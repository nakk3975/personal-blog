# GhostDesk·EchoLoop 포트폴리오 반영 — 2026-10-08

실무 작업을 먼저 유지하고 개인 프로젝트는 제작 시작일의 최신 순으로 정렬했다. 메인 카드, 상세 목차, 상세 본문을 EchoLoop → GhostDesk → OrbitTrip → Game Chronicle → EternalReturnGG로 맞췄다. 시작일은 Notion 프로젝트 기간과 GitHub 저장소 생성일을 대조했다. EternalReturnGG는 2024.01 원본과 2026.09 리메이크를 함께 표기한다.

기존 흰 카드·테두리·기술 태그·색상과 PC/모바일 구조를 유지했다. 요청된 대표 이미지는 원본을 비율대로 WebP로 최적화해 로컬에 넣었으며 `object-fit: contain`으로 잘림을 방지한다. 이미지에 대체 텍스트·크기·지연 로딩을 지정했다. EchoLoop는 기존 소유자 비공개 플레이 주소를 연결하고 접근 제한을 명시했다. 접근 권한은 변경하지 않았다.

## 내용 근거

| 프로젝트 | 확인한 소스 | 검증 기록 | 남은 범위 |
| --- | --- | --- | --- |
| GhostDesk | WebGameStudio main `9a4a71909fc786e26e600e0d6c74ccf5de4b5212`, README·package.json·ALL_CASE_EVIDENCE_AUDIT.md, 2026-10-07 Notion 페이지 | v6 다섯 사건·파일 158개·문제 50개, 299개 자동 검사·타입 검사·빌드, 운영 공연 9/10 및 자료 창 확인 | 다섯 사건 전체 실제 브라우저 완주, 실제 로그인 저장→세션 재생성→재로그인 왕복, Safari·실제 휴대폰·신규 이용자 플레이테스트 |
| EchoLoop | main `de1c37357bea1edcae7f7a0f2efe197a1fe78ed3`, README·package.json·campaign-browser.json·캠페인/기믹 검사, 2026-10-07 Notion 페이지 | 20챕터·100레벨, 다섯 신규 기믹, 공략 이동+4회, 저장 호환성, Chromium 키보드/390px 방향 버튼 각각 100레벨 순차 완주 기록 | 제어된 게임 시계/DOM 입력과 실제 기기 체감 구분, 사람의 난이도·최단 해답 평가, 실제 모바일/Safari/Firefox, 큰 맵 성능·절전 후 첫 요청 |

게임 테스트는 이번 포트폴리오 변경에서 다시 실행하지 않았다. 위 내용은 각 프로젝트의 기존 코드·결과 기록을 확인한 것이다. 계정 저장 기능 구현과 실제 저장 왕복의 검증 완료를 구분했다. EchoLoop는 여러 사람의 실시간 멀티플레이가 아니라 과거의 자신과 협력하는 개인 플레이이며, 온라인 백업은 계정 동기화가 아닌 브라우저별 백업이다.

대표 이미지 출처:

- [GhostDesk](https://github.com/nakk3975/WebGameStudio/blob/9a4a71909fc786e26e600e0d6c74ccf5de4b5212/docs/evidence/ghostdesk-home.jpg)
- [EchoLoop](https://github.com/nakk3975/EchoLoop/blob/de1c37357bea1edcae7f7a0f2efe197a1fe78ed3/artifacts/ux-mobile.jpg)

## 이번 포트폴리오 검사

`CHROMIUM_EXECUTABLE_PATH=/tmp/chromium npm test` — Chromium 153.0.8010.0.

- 메인·상세 각각 7개 화면 너비(320/390/540/760/980/1366/1920px), 총 14개 조합 통과.
- 메인·상세 프로젝트 순서, 내부 링크 목적지, 이미지 디코딩·대체 텍스트, GitHub 연결, 외부 새 창 링크 보호 속성 확인.
- 카드 내부 콘텐츠 배치와 문서 가로 넘침 없음, 페이지/로컬 HTTP 오류 없음.
- 모바일 메뉴 열기·Esc 닫기·링크 선택 후 닫기 확인.
- PC 1366px·모바일 390px에서 두 게임의 메인/상세 카드 스크린샷을 생성해 확인.
- `git diff --check` 통과.

로컬 정적 포트폴리오 브라우저 검사이며 운영 배포 완료, 외부 게임의 현재 가용성, 실제 휴대폰 하드웨어 검사까지 의미하지 않는다. EchoLoop의 비공개 접근 제한은 사이트 소유 계정의 현재 설정에서 확인했다.
