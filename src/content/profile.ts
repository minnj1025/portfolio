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
  pillars: [
    {
      no: "01",
      title: "데이터에서 시작한다",
      detail: "성능이 안 나오면 모델보다 데이터를 먼저 봅니다.",
      evidence: [
        "졸음 라벨 3단계 → 97.75%",
        "영상 → 골격 좌표",
        "본문 설명 → 상황 문장",
      ],
    },
    {
      no: "02",
      title: "필요한 것만 골라 엮는다",
      detail: "다 넣으면 태스크끼리 간섭합니다. 쓸 것만 고르게 만듭니다.",
      evidence: ["5 모달리티 → 4 태스크", "태스크별 선택 융합", "공유 인코더"],
    },
    {
      no: "03",
      title: "실제 환경에서 돌아가게 한다",
      detail: "정확도에서 끝내지 않고, 돌아가는 곳까지 봅니다.",
      evidence: ["경량 백본 3.42M", "센서 결손 추론", "라즈베리파이 실시간"],
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
