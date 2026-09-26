export type ResumeEntry = {
  period: string;
  title: string;
  org: string;
  detail?: string;
  points?: string[];
};

export const education: ResumeEntry[] = [
  {
    // 사유는 개인 사유라 표기하지 않습니다. 복학 예정일이 정해지면
    // "2027.03 복학 예정"을 덧붙이면 읽는 쪽에 더 친절합니다.
    period: "2026.03 ~",
    title: "석사과정 · 인공지능공학과",
    org: "조선대학교 일반대학원",
    detail: "지능형데이터처리 연구실 (지도교수 최규호) · 2026.09부터 휴학",
    points: [
      "멀티모달 멀티태스크 주행 인식 연구 수행",
      "연구실 실장",
    ],
  },
  {
    period: "2022.03 ~ 2026.02",
    title: "학사 · AI소프트웨어학부 인공지능공학전공",
    org: "조선대학교",
    detail: "평점 4.27 / 4.5 (백분율 97.37) · 학과 석차 1/19 전 학년 수석",
    points: [
      "학업성적우수상 (학교법인 조선대학교 이사장상) 수상",
      "학부 재학 중 제1저자 논문 게재 및 특허 출원",
      "신설 학과 초대 학생회장",
    ],
  },
];

export const researchExperience: ResumeEntry[] = [
  {
    period: "2026.01 ~ 2026.08",
    title: "대학원생 연구원",
    org: "조선대학교 지능형데이터처리 연구실",
    points: [
      "얼굴·신체·다중 시점 장면·자세·제스처 5개 모달리티로 운전자 감정(DER)·행동(DBR), 교통상황(TCR)·차량 거동(VBR) 4개 태스크를 통합 인식하는 멀티모달 멀티태스크 연구를 제1저자로 수행",
      "PRISM-MTL(정확도) · MUSE-MTL(효율) · TRACE-MTL(인과) · COVA-MTL(실차 적용성)의 4개 축으로 연구를 전개",
      "다중 seed · ablation · robustness 실험 설계, CUDA 동기화 기반 latency 측정",
    ],
  },
  {
    period: "2023.05 ~ 2024.11",
    title: "학부연구원",
    org: "조선대학교 지능형데이터처리 연구실",
    points: [
      "운전자 졸음·부주의 인식을 주제로 데이터 분석, 라벨 재정의, 모델 설계, 비교실험, 논문 작성까지 연구 전 과정을 제1저자로 수행",
      "SERN: 다중 행동 특징 계층적 라벨링 + ResNet18/SE 결합, NTHU-DDD 기준 1.03%p 개선, KCI 학술지 게재",
      "STFTransNet: 얼굴·신체 two-stream + cross-attention + TCN 융합, 공개 데이터 3종 모두에서 기존 방법 상회, Sensors(SCI) 게재 및 국내 특허 출원",
    ],
  },
];

export const internships: ResumeEntry[] = [
  {
    period: "2025.01 ~ 2025.02",
    title: "인턴 · Data솔루션팀",
    org: "미래에셋증권",
    detail: "생성형 LLM을 이용한 주식테마 및 연관 종목 제공 서비스 (3인 팀)",
    // 어떻게 만들었는지는 포트폴리오 쪽 프로젝트 항목에서 다룹니다.
    points: ["파이프라인 첫 단계인 뉴스 카테고리·중요도 분석 모듈을 단독 담당"],
  },
];

export type Award = {
  date: string;
  name: string;
  org: string;
  note?: string;
};

export const awards: Award[] = [
  {
    date: "2026.02",
    name: "학업성적우수상 (학교법인 조선대학교 이사장상)",
    org: "조선대학교",
    note: "전 학년 평점 4.27/4.5, 학과 석차 1/19 수석",
  },
  {
    date: "2025.11",
    name: "조선대학교 종합학술대회 금상",
    org: "조선대학교 IT융합대학",
    note: "LexAI — 법률 문서 분석 및 전문가 탐색 서비스",
  },
  {
    date: "2025.08",
    name: "SW중심대학 호남권 LLM 해커톤 경진대회 우수상",
    org: "소프트웨어중심대학사업단",
    note: "티처스 — 개인 맞춤형 실시간 AI 음성 학습 서비스",
  },
  {
    date: "2024.12",
    name: "조선대학교 종합학술대회 금상",
    org: "조선대학교 IT융합대학",
    note: "Talktalk deSign — 실시간 수어 번역 시스템",
  },
  {
    date: "2024.10",
    name: "2024 미래에셋증권 AI·데이터 페스티벌 대상",
    org: "미래에셋증권",
    note: "336개 참가팀 중 대상 · 퍼스널LLM 팀",
  },
  {
    date: "2023.11",
    name: "조선대학교 종합학술대회 은상",
    org: "조선대학교 IT융합대학",
    note: "멀티모달 운전자 졸음 인식 시스템",
  },
];

export const patents = [
  {
    number: "10-2025-0107230",
    title:
      "트랜스포머 기반 시공간 융합 네트워크를 이용한 향상된 다중 모달 운전자 상태 감지 시스템 및 방법",
    status: "출원 (2025.08.05) · 출원인 조선대학교산학협력단",
    role: "공동발명자 (최규호, 김민준)",
    year: 2025,
  },
];

export type DomesticPaper = {
  venue: string;
  year: string;
  title: string;
  authors: string;
};

export const domesticPapers: DomesticPaper[] = [
  {
    venue: "제38회 영상처리 및 이해에 관한 워크샵 (IPIU)",
    year: "2026",
    title:
      "MTCANet: 운전자 부주의 상태 인식을 위한 Multimodal Two-stream Cross Attention Network",
    authors: "김민준, 최규호",
  },
  {
    venue: "대한전자공학회 하계종합학술대회 (IEIE)",
    year: "2025",
    title: "3D-CMTFusionNet 기반 폐 결절 분류 시스템",
    authors: "김민준, 최규호",
  },
  {
    venue: "제36회 영상처리 및 이해에 관한 워크샵 (IPIU)",
    year: "2024",
    title: "운전자 행동 특징을 이용한 Enhanced ResNet 기반 졸음 검출 시스템",
    authors: "김민준, 최규호",
  },
];

export const skills = [
  {
    category: "연구 · 모델링",
    items: [
      "PyTorch",
      "Python",
      "Cross-Attention",
      "Transformer",
      "LoRA",
      "Sparse MoE",
      "Knowledge Distillation",
      "ST-GCN",
      "TCN",
      "ResNet / SE",
    ],
  },
  {
    category: "실험 · 인프라",
    items: [
      "CUDA",
      "Ubuntu",
      "다중 seed 실험 설계",
      "Ablation Study",
      "Robustness 평가",
      "Latency 측정",
      "MediaPipe",
    ],
  },
  {
    category: "응용 개발",
    items: [
      "HyperCLOVA X",
      "RAG",
      "Vector DB",
      "CLOVA OCR / Summary",
      "STT / TTS",
      "Raspberry Pi",
      "FastAPI",
      "FAISS",
    ],
  },
];

export const activities: ResumeEntry[] = [
  {
    period: "2024.03 ~ 2024.12",
    title: "초대 학생회장",
    org: "조선대학교 AI소프트웨어학부 (신설 학과)",
  },
  {
    period: "2025.12 ~ 2026.08",
    title: "연구실 실장",
    org: "조선대학교 지능형데이터처리 연구실",
  },
];
