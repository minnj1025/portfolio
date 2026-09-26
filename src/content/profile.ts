export const profile = {
  nameKo: "김민준",
  nameEn: "Minjun Kim",
  role: "AI Research Engineer",
  lab: "조선대학교 지능형데이터처리 연구실",
  advisor: "최규호 교수",
  tagline: "흩어진 데이터를 하나의 판단으로 만듭니다.",
  intro:
    "얼굴·신체·차량 밖 장면·자세·제스처처럼 따로 들어오는 신호를 한 모델에서 학습시켜, 운전자의 감정과 행동부터 도로 상황까지 함께 인식하는 연구를 해왔습니다. 정확도만 보지 않고, 차량에 올릴 크기인지와 센서가 빠져도 버티는지를 같은 비중으로 봅니다.",

  /** 상단을 가로지르는 키워드 띠. 무엇을 다루는 사람인지 먼저 보이게 합니다. */
  disciplines: [
    "MULTIMODAL FUSION",
    "MULTI-TASK LEARNING",
    "DRIVER PERCEPTION",
    "EFFICIENT INFERENCE",
    "MISSING MODALITY",
    "RETRIEVAL",
    "LLM SYSTEMS",
    "EVALUATION DESIGN",
    "EDGE DEPLOYMENT",
  ],
  /**
   * 상단에 먼저 내미는 대표 작업 셋. 게재된 연구 하나, 가장 최근 연구 하나,
   * 개발 하나로 잡아 한쪽으로 쏠리지 않게 합니다. 카드를 누르면 상세로 갑니다.
   */
  highlights: [
    {
      kind: "연구",
      meta: "Neurocomputing (SCIE) 심사 중",
      name: "COVA-MTL",
      detail: "쓸 모달리티를 먼저 고르게 해서, 정확도를 지키며 연산을 줄였습니다.",
      metric: "branch 비용 −22.22%",
      href: "/research/cova-mtl",
    },
    {
      kind: "연구",
      meta: "Mathematics (SCIE) 게재",
      name: "PRISM-MTL",
      detail: "태스크마다 필요한 모달리티만 골라 융합해 간섭을 줄였습니다.",
      metric: "AIDE mAcc 86.25% · SOTA",
      href: "/research/prism-mtl",
    },
    {
      kind: "개발",
      meta: "개인 프로젝트 · 진행 중",
      name: "이음",
      detail: "일기에서 필요한 것을 읽어내 성경 본문을 찾아주는 앱입니다.",
      metric: "판별 마진 0.169 → 0.268",
      href: "/projects/ieum",
    },
  ],
  contact: {
    email: "ryan6768@gmail.com",
    github: "https://github.com/minnj1025",
    // 주소를 채우면 푸터에 자동으로 링크가 붙습니다.
    scholar: "",
    orcid: "",
    linkedin: "",
  },
} as const;
