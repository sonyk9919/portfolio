---
work: side
title: JobSync
tagline: 채용 공고 HTML에서 마감일을 파싱해 캘린더로 옮기는 도구
role: 1인 개발
period: 2026.03
stack: [Next.js 16, TypeScript, Tailwind v4, TanStack Query, Zod, Google Calendar API, Vitest]
accent: "#2563eb"
problem: 여러 채용 플랫폼에 지원하면서 공고 정보를 일일이 캘린더에 옮겨 적어 관리해야 했습니다. 마감일을 놓치지 않으려면 손이 많이 갔고, 실제 구직 과정에서 직접 겪은 불편이었습니다.
metrics:
  - label: 지원 플랫폼
    value: "3곳"
    detail: 잡코리아 · 잡플래닛 · 원티드
  - label: 서버
    value: 불필요
    detail: 클라이언트 단독 영속성
highlights:
  - 크롤링은 약관 위반 소지와 로그인 세션 문제로 배제하고, 저장된 HTML에서 JSON-LD(schema.org/JobPosting)를 파싱하는 방식 선택
  - AbstractParser·ParserFactory 구조로 팩토리 수정 없이 신규 플랫폼을 확장할 수 있게 설계
  - Zod 런타임 검증으로 파싱 결과를 ParsedJob 타입으로 정규화
  - 서버 없이 Google Calendar extendedProperties에 원본을 직렬화 저장해 클라이언트 단독 영속성 확보
  - 마감 기준 D-3·D-7·D-10 칸반 보드와 월별 캘린더 뷰 제공
  - Vitest 단위 테스트에서 Helper가 최소 Document를 생성하고 필요한 필드만 오버라이드하는 방식으로 파서 검증, D-day는 fake timer로 재현성 확보
links:
  - label: GitHub
    href: https://github.com/sonyk9919/JobSync
  - label: 배포
    href: https://job-sync-five.vercel.app
---

## 왜 크롤링이 아닌가

크롤링은 약관 위반 소지가 있고 로그인 세션 문제도 있어 배제했습니다. 대신 채용
플랫폼이 **SEO 목적으로 공고 페이지에 삽입하는 JSON-LD**(schema.org/JobPosting)에
주목했습니다. 사용자가 Cmd+S로 저장한 HTML만 있으면 서버 없이도 공고 정보를 추출할 수
있다고 판단했습니다.

## 확장 가능한 파서 구조

`AbstractParser`와 `ParserFactory` 구조로 설계해 신규 플랫폼을 추가할 때 팩토리를
수정하지 않아도 되게 했습니다. 파싱 결과는 Zod 런타임 검증으로 `ParsedJob` 타입으로
정규화합니다.

## 서버 없는 영속성

Google Calendar의 `extendedProperties`에 원본을 직렬화해 저장하는 방식으로 별도 서버
없이 데이터를 유지합니다. 마감 기준 D-3·D-7·D-10 칸반 보드와 월별 캘린더 뷰를
제공합니다.

## 테스트

파서 테스트는 실제 HTML을 고정해 두는 대신, Helper가 JSON-LD와 og:url을 조합한 최소
Document를 생성하고 필요한 필드만 오버라이드하는 방식으로 작성했습니다. D-day 계산은
fake timer로 시스템 시간을 고정해 재현성을 확보했습니다.
