---
work: epapyrus
title: 서버 의존 없는 PDF 주석 편집 사이클
tagline: WASM 모듈과 PDF Reference 규격 분석으로 클라이언트 단독 CRUD 구현
role: 프론트 2인 중 주석 CRUD 단독 구현 · 해외 PM·디자이너와 협업
period: 약 1개월
stack: [TypeScript, WASM, PDF Reference, Angular]
accent: "#0369a1"
problem: 고객사가 서버 없이도 도입할 수 있는 클라이언트 단독 신제품을 출시해야 했습니다. 그러려면 서버가 담당하던 주석 생성·수정·삭제 전체 사이클을 클라이언트에서 다시 구현해야 했는데, 사내 WASM 모듈에는 스탬프·폴리곤 등 미구현 주석 타입이 남아 있어 모듈에만 의존해서는 편집 사이클을 완결할 수 없었습니다.
metrics:
  - label: 서버 의존
    value: "0"
    detail: 주요 주석 타입 전체 CRUD
  - label: 외부 뷰어 호환
    value: Acrobat · Chrome
    detail: 표준 뷰어 동일 렌더링
  - label: 납품처
    value: Perplexity
    detail: AI 검색 서비스
highlights:
  - 구현된 주석 타입은 사내 WASM 모듈을 그대로 활용하고, 미구현 타입은 별도 경로를 설계해 분기 처리
  - PDF Reference 규격을 직접 분석해 WASM 로우레벨 메서드로 주석 필드를 생성·편집하는 경로를 구현
  - PDF Reference 기반으로 데이터 구조를 재설계해 Acrobat·Chrome 등 표준 뷰어와의 호환성 확보
links:
  - label: MuPDF Viewer
    href: https://mupdf.epapyrus.com/
---

주석 편집을 타입별로 분기했습니다. WASM 모듈에 이미 구현된 타입은 모듈을 그대로 쓰고,
스탬프·폴리곤처럼 미구현인 타입은 **PDF Reference 규격을 직접 분석해** WASM 로우레벨
메서드로 주석 필드를 생성·편집하는 경로를 따로 만들었습니다.

규격 기반으로 데이터 구조를 재설계한 덕분에 우리 뷰어뿐 아니라 Acrobat이나 Chrome
내장 뷰어에서도 동일한 품질로 렌더링됩니다. 이 제품은 AI 검색 서비스 Perplexity에
납품됐습니다.
