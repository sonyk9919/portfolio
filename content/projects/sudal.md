---
work: side
title: 수거의 달인
tagline: 분리배출을 AI가 인증하고 보상으로 섬을 정화하는 힐링 타이쿤 게임
role: 팀장 · 5인 · 풀스택 (게임 화면 프론트엔드 전체 · 퀴즈 도메인·인증 API)
period: 2026.03 — 2026.06
stack: [React 19, TypeScript, Three.js, Zustand, Spring Boot, YOLO, Jenkins, Docker]
accent: "#16a34a"
problem: 재활용 가능 자원의 30.7%가 종량제 봉투에 섞여 배출되며 연간 약 2조 원의 사회적 손실이 발생합니다. 원인이 무관심이 아니라 품목별로 다르고 자주 바뀌는 배출 기준이라고 봤고, 기존 분리수거 앱은 일회성 정보 제공에 그쳐 설치 후 이탈률이 높았습니다.
metrics:
  - label: GLB 에셋 용량
    value: 5MB → 1MB
    detail: 개당 평균, 약 79% 감소
  - label: 전체 로딩
    value: 4~5초 → 2초
    detail: 약 50% 단축
  - label: 인프라 비용
    value: 약 9만원 절감
    detail: EC2 대비 3개월 기준
highlights:
  - 팀장으로 기획·일정 관리와 PR 리뷰 기반 협업 프로세스를 주도 (feat/fix/refactor 브랜치 컨벤션, 최소 1인 Approve 후 머지)
  - Three.js 기반 3D 섬·건물·슬롯 배치 시스템을 포함한 게임 화면 프론트엔드 전체 개발
  - 백엔드에서 퀴즈 도메인과 JWT 인증/인가 API 개발
  - gltfpack 텍스처 압축으로 GLB 에셋을 개당 5MB에서 1MB로 경량화
  - 잔여 지연의 원인을 HTTP/1.1의 origin당 동시 연결 제한으로 특정하고 Nginx에 HTTP/2를 적용
  - 보유 장비 기반 자가 호스팅으로 전환하며 DDNS·Nginx 2계층·Certbot SSL·Jenkins·Docker CI/CD를 직접 구축
links:
  - label: GitHub
    href: https://github.com/sudal-kgu
---

일회성 정보 제공으로는 행동이 바뀌지 않는다고 보고, **반복 가능한 게임 루프**로
전환했습니다. 촬영·AI 인증 → 퀴즈 → 재화 보상 → 건설·섬 정화가 반복되는 구조이고,
슬롯·건물·7단계 레벨 시스템으로 분리배출을 지속할 유인을 만들었습니다.

## GLB 에셋 로딩 최적화

섬과 건물 GLB 에셋 12개가 개당 평균 5MB로 초기 로딩에 4~5초가 걸렸습니다.

1차로 gltfpack 텍스처 압축 파이프라인을 적용해 에셋 용량을 80% 이상 줄였지만, 전체
로딩은 여전히 4~5초였습니다. 잔여 지연의 원인을 두 가지로 분석했는데 — 자체 구축 서버의
네트워크 대역폭 한계는 환경상 통제할 수 없었고, **HTTP/1.1의 origin당 동시 연결
제한**(브라우저당 6개 수준)은 개선 가능했습니다. Nginx에 HTTP/2를 적용해 단일 연결
멀티플렉싱으로 다수 에셋을 병렬 다운로드하도록 바꿔 전체 로딩을 2초 내외로 줄였습니다.

## 자체 서버 인프라 구축

클라우드(EC2) 유지 비용이 부담되어 보유 장비 기반 자가 호스팅으로 전환했습니다.
공유기 이중 NAT 구조를 파악해 2단 포트포워딩을 구성하고, 유동 공인 IP 문제는 ddclient
기반 DDNS 주기 갱신으로 해결했습니다. Nginx 2계층과 Certbot SSL로 HTTPS·HTTP/2를
제공하고, Jenkins·Docker CI/CD 파이프라인으로 push 시 빌드·배포를 자동화했습니다.
