# 손유관 포트폴리오

Next.js 기반 개인 포트폴리오 사이트입니다.
콘텐츠는 마크다운으로 관리하며, 코드 수정 없이 이력을 추가할 수 있습니다.

## 실행

```bash
npm install
npm run dev
```

http://localhost:3000 에서 확인합니다.

## 콘텐츠 관리

이력 추가·수정 방법은 [content/README.md](content/README.md)를 참고하세요.

```
content/
├── navigator.json      목차 (표시 순서와 연결 관계)
├── profile.md          이름, 직군, 소개, 스킬
├── work/               소속 (회사 또는 개인)
└── projects/           각 소속에서 한 프로젝트
```

## Google Analytics

`NEXT_PUBLIC_GA_ID` 환경변수에 GA4 측정 ID(`G-XXXXXXXXXX`)를 넣으면 활성화됩니다.
값이 없으면 스크립트를 아예 로드하지 않으므로 로컬 개발에는 영향이 없습니다.

```bash
cp .env.example .env.local
# .env.local 에 측정 ID 입력
```

Vercel 등에 배포할 때는 대시보드의 환경변수에 같은 키로 등록합니다.

페이지뷰 외에 아래 이벤트를 수집합니다.

| 이벤트 | 시점 | 파라미터 |
| --- | --- | --- |
| `project_open` | 프로젝트 아코디언을 열 때 | `project_slug`, `project_title` |
| `outbound_click` | 프로젝트의 외부 링크 클릭 시 | `link_label`, `link_href` |

## 명령어

| 명령어 | 설명 |
| --- | --- |
| `npm run dev` | 개발 서버 |
| `npm run build` | 프로덕션 빌드 |
| `npm run start` | 빌드 결과 실행 |
| `npm run lint` | ESLint 검사 |
