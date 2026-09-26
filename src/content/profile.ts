export const profile = {
  nameKo: "김민준",
  nameEn: "Minjun Kim",
  role: "AI Research Engineer",
  lab: "조선대학교 지능형데이터처리 연구실",
  advisor: "최규호 교수",
  tagline: "흩어진 데이터를 하나의 판단으로 만드는 연구·개발자",
  intro:
    "여러 갈래로 들어오는 데이터를 한 모델에서 함께 학습시키는 연구를 하고, 검색과 언어 모델을 엮어 사람이 실제로 쓰는 서비스를 만듭니다. 어느 쪽이든 정확도에서 끝내지 않고, 감당할 수 있는 크기인지와 입력이 빠져도 버티는지를 같은 비중으로 봅니다.",

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
   * 상단에 먼저 내미는 대표 프로젝트 셋. 게재 여부 대신 무엇을 다룬 일인지를
   * 앞세웁니다. 학회명은 각 상세 페이지에 있습니다.
   */
  highlights: [
    {
      focus: "MODALITY SELECTION · EFFICIENCY",
      name: "COVA-MTL",
      detail: "쓸 모달리티를 먼저 고르게 해서, 정확도를 지키며 연산을 줄였습니다.",
      metric: "branch 비용 −22.22%",
      href: "/research/cova-mtl",
    },
    {
      focus: "SELECTIVE FUSION · TASK INTERFERENCE",
      name: "PRISM-MTL",
      detail: "태스크마다 필요한 모달리티만 골라 융합해 간섭을 줄였습니다.",
      metric: "AIDE mAcc 86.25%",
      href: "/research/prism-mtl",
    },
    {
      focus: "RETRIEVAL · LLM PIPELINE",
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
