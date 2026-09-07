---
work: revibio
title: Core Web Vitals 개선으로 Lighthouse 60 → 90점
tagline: 이미지 최적화·스켈레톤 UI·App Router 마이그레이션 3단계
role: 분석·개선 단독 진행
stack: [Next.js, App Router, RSC, WebP, TypeScript]
accent: "#65a30d"
problem: Lighthouse 성능 점수가 60점이었습니다. LCP·FCP가 지연되고 로딩 중에 CLS가 발생했는데, Core Web Vitals는 Google 검색 랭킹 신호이기 때문에 낮은 점수가 곧 검색 유입 저하로 직결되는 상황이었습니다.
metrics:
  - label: Lighthouse 성능
    value: 60 → 90점
    detail: 약 50% 향상
highlights:
  - 고용량 원본 이미지(JPEG·PNG)를 WebP로 변환해 다운로드 지연을 줄이고 LCP·FCP 단축
  - 콘텐츠 영역 높이 지정과 스켈레톤 UI로 로딩 중 레이아웃 시프트를 제거해 CLS 개선
  - App Router(RSC)로 마이그레이션해 서버 컴포넌트를 클라이언트 번들·하이드레이션에서 제외
  - next/dynamic 코드 스플리팅으로 첫 화면에 불필요한 컴포넌트를 별도 청크로 분리해 TBT·TTI 개선
---

원인을 세 갈래로 나눠 분석했습니다.

- 고용량 원본 이미지(JPEG·PNG) 다운로드 지연 → LCP·FCP 악화
- 콘텐츠 영역 높이 미지정 → 로딩 시 레이아웃이 밀려 CLS 발생
- Pages Router가 페이지 전체를 클라이언트 번들에 포함 → 초기 JS 파싱·하이드레이션 비용

## 로딩·안정성 최적화

이미지를 WebP로 변환해 용량을 줄이는 방향으로 LCP·FCP를 단축했고, 콘텐츠 영역을
명시하고 스켈레톤 UI를 넣어 레이아웃 시프트를 제거했습니다.

## 렌더링 구조 개선

App Router(RSC)로 전환해 서버 컴포넌트를 클라이언트 번들과 하이드레이션 대상에서
제외했습니다. 여기에 `next/dynamic` 코드 스플리팅으로 첫 화면에 필요 없는 컴포넌트를
별도 청크로 분리해, 초기 로드 시 내려받고 파싱하는 JS 양 자체를 줄였습니다.
