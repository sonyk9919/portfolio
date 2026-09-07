---
work: revibio
title: 서비스 리텐션 강화를 위한 자체 커뮤니티 구축
tagline: 학습과 커뮤니티를 잇는 순환 구조로 DAU 1,600 · MAU 15,000 달성
role: 프론트 1 · 백엔드 1 · 디자이너 1 · QA 1 협업
period: 약 1개월
stack: [Next.js, TypeScript, GraphQL, ProseMirror, PWA]
accent: "#0891b2"
problem: 전자책 학습과 문제풀이는 활발했지만 서비스 체류 시간과 재방문이 낮았습니다. 학습이 끝나면 다시 찾을 유인이 부족해 리텐션이 서비스 성장의 병목이었습니다. 질문이 생기면 서비스 안에 해결할 수단이 없어 사용자가 외부로 이동했고, 학습 콘텐츠와 커뮤니티가 분리되어 학습 흐름이 끊기는 구조였습니다.
metrics:
  - label: MAU
    value: "15,000+"
    detail: 월 활성 사용자
  - label: DAU
    value: "1,600+"
    detail: 일 활성 사용자
highlights:
  - 계열사 GraphQL 모듈 기반으로 공지·게시글·댓글·북마크·좋아요 CRUD 전반과 커뮤니티 UI/UX를 신규 구현
  - ProseMirror NodeView 커스텀 인라인 임베드 플러그인으로 게시글에서 관련 이론·문제 페이지로 직접 연결
  - PWA와 Web Push Notification 도입을 제안·구현해 재유입 채널 확보
links:
  - label: 알렌의 서재
    href: https://allensbookshelf.co.kr/
---

핵심은 커뮤니티를 따로 만드는 게 아니라 **학습과 커뮤니티를 순환시키는 것**이라고
봤습니다.

학습 중 질문이 생기면 서비스 안 커뮤니티에서 게시글·댓글로 해결하고, 게시글에 박힌
인라인 임베드로 관련 이론·문제 페이지에 바로 재진입해 학습을 재개하는 흐름입니다.
ProseMirror NodeView를 커스텀해 임베드 플러그인을 구현했습니다.

여기에 PWA와 Web Push Notification을 제안·도입해 서비스 밖에서도 다시 불러올 수 있는
재유입 채널을 확보했습니다.
