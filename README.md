# 김민준 포트폴리오

연구 포트폴리오와 이력서를 담은 개인 사이트입니다.

## 구조

```
src/
├── app/
│   ├── page.tsx              포트폴리오 메인 (연구 · 개발)
│   ├── research/[slug]/      논문 상세
│   ├── projects/[slug]/      프로젝트 상세
│   └── resume/               이력서
├── components/ui.tsx         공통 UI (섹션, 지표, 그림, 케이스 본문)
└── content/                  내용은 전부 여기에 있습니다
    ├── types.ts              Paper · Project · Figure 타입
    ├── profile.ts            이름 · 한 줄 소개 · 연락처
    ├── papers.ts             논문 6편
    ├── projects.ts           개발 프로젝트 5개
    └── resume.ts             학력 · 경력 · 수상 · 특허 · 기술
```

내용과 화면을 분리했습니다. 논문이나 프로젝트를 추가할 때 `src/content/` 아래
데이터만 한 덩어리 넣으면 목록·상세 페이지·이력서에 함께 반영됩니다.

논문과 프로젝트는 모두 **문제 → 접근 → 결과** 한 가지 형식으로 정리했습니다.

## 실행

```bash
npm install
npm run dev
```

## 스택

Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 · Vercel
