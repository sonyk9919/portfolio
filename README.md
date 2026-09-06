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

## 명령어

| 명령어 | 설명 |
| --- | --- |
| `npm run dev` | 개발 서버 |
| `npm run build` | 프로덕션 빌드 |
| `npm run start` | 빌드 결과 실행 |
| `npm run lint` | ESLint 검사 |
