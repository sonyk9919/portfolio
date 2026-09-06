# 콘텐츠 관리 가이드

이 폴더의 마크다운 파일이 화면에 표시되는 모든 내용입니다.
**코드를 수정할 필요 없이** 파일 추가와 `navigator.json` 수정만으로 이력을 관리합니다.

## 구조

```
content/
├── navigator.json      목차 (표시 순서와 연결 관계)
├── profile.md          이름, 직군, 소개, 스킬
├── work/               소속 (회사 또는 개인)
└── projects/           각 소속에서 한 프로젝트
```

프로젝트는 반드시 하나의 소속에 속합니다.
프로젝트 파일의 `work` 값이 `content/work/` 아래 **파일명**과 연결됩니다.

## 새 회사(소속) 추가하기

1. `content/work/` 아래에 파일을 만듭니다. 파일명이 곧 연결 키가 됩니다.

```markdown
---
name: 회사 이름
kind: company
role: Frontend Developer
period: 2025.01 — 재직 중
current: true
achievements:
  - 소속에서 낸 성과를 적습니다
---

이 회사에서 맡은 역할을 한두 문장으로 적습니다.
```

2. `navigator.json`의 `work` 배열에 경로를 추가합니다.

```json
"work": [
  "content/work/새-회사.md",
  "content/work/acme.md"
]
```

`current: true`인 항목은 "재직 중" 배지가 붙습니다.
개인 프로젝트 묶음은 `kind: personal`로 두면 "사이드 프로젝트" 배지가 붙고,
`role`은 생략해도 됩니다.

## 새 프로젝트 추가하기

1. `content/projects/` 아래에 파일을 만듭니다.

```markdown
---
work: acme
title: 프로젝트 이름
tagline: 한 줄 소개
role: 프론트엔드 개발 · 1인
period: 2025.03 — 2025.08
stack: [React, TypeScript]
accent: "#6366f1"
problem: 무엇이 문제였는지 한두 문장으로 적습니다. 상세 맨 위에 강조되어 표시됩니다.
metrics:
  - label: 응답 시간
    value: "-64%"
    detail: 1.4s → 500ms
  - label: 처리량
    value: "2,000/s"
links:
  - label: GitHub
    href: https://github.com/...
highlights:
  - 무엇을 어떻게 했는지 적습니다
---

본문입니다. 마크다운 문법을 그대로 지원합니다.
```

### problem과 metrics

`problem`은 "왜 이 일을 했는가"입니다. 상세 맨 위에 강조선과 함께 표시되어
읽는 사람이 맥락을 먼저 잡게 합니다. 생략하면 표시되지 않습니다.

`metrics`는 성과를 숫자로 보여주는 부분입니다. 상세를 열었을 때 가장 먼저
눈에 들어오므로 **가장 강한 숫자 2~3개**만 넣는 것이 좋습니다.

- `label`: 무엇을 잰 것인지 (짧게)
- `value`: 숫자 자체. 강조색으로 크게 표시됩니다
- `detail`: 근거나 비교값 (선택)

숫자가 없는 정성적 성과는 `metrics` 대신 `highlights`에 적습니다.

2. `navigator.json`의 `projects` 배열에 경로를 추가합니다.

`work` 값은 소속 파일명에서 `.md`를 뺀 것입니다.
(`content/work/acme.md` → `work: acme`)

`accent`는 카드 상단 강조색이 되고, 배열 순서가 표시 순서입니다.

## 이미지 넣기

이미지는 `public/` 아래에 두고 `/`로 시작하는 경로로 참조합니다.

```markdown
![스크린샷 설명](/images/dashboard.png)
*이미지 아래 이탤릭 한 줄은 캡션으로 표시됩니다.*
```

- 파일은 `public/images/dashboard.png` 에 둡니다.
- 경로는 반드시 `/`로 시작해야 합니다. (`images/foo.png` ✕ → `/images/foo.png` ○)
- 대괄호 안 설명은 대체 텍스트로 쓰이니 화면을 못 보는 사람 기준으로 적습니다.
- 없는 파일을 참조하면 어느 파일의 어떤 경로가 잘못됐는지 에러로 알려줍니다.
- 외부 URL(`https://...`)도 그대로 쓸 수 있습니다.

본문에서는 `##` 소제목, 목록, 인용, 코드 블록도 그대로 쓸 수 있습니다.

## 프로필 수정하기

`content/profile.md`의 frontmatter에서 이름, 직군, 이메일, 스킬을 수정합니다.
본문은 About 섹션에 그대로 표시됩니다.

## 섹션 순서와 메뉴

`navigator.json`의 `sections`가 상단 메뉴를 만듭니다.
`nav: false`로 두면 메뉴에서만 숨겨집니다.

## 자주 하는 실수

- `navigator.json`에 경로를 추가하지 않으면 파일을 만들어도 나타나지 않습니다.
- 존재하지 않는 파일 경로를 적으면 어느 경로가 잘못됐는지 에러로 알려줍니다.
- 프로젝트의 `work` 값이 소속 파일명과 다르면 어느 프로젝트가 문제인지 에러로 알려줍니다.
