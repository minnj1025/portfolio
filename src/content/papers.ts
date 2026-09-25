import type { Paper } from "./types";

export const papers: Paper[] = [
  {
    slug: "prism-mtl",
    axis: "정확도 — 태스크 간 간섭 해소",
    shortTitle: "PRISM-MTL",
    title:
      "PRISM-MTL: Inter-Modal Selective Multi-Task Learning for Assistive Driving Perception",
    koreanTitle: "태스크마다 필요한 모달리티만 골라 융합하는 멀티태스크 주행 인식",
    authors: ["Minjun Kim", "Gyuho Choi"],
    role: "제1저자",
    status: "published",
    venueLabel: "Mathematics (SCIE) 게재",
    citation: "Mathematics, 2026, 14(15), 2812",
    doi: "10.3390/math14152812",
    year: 2026,
    keywords: [
      "Multi-Task Learning",
      "Multimodal Fusion",
      "Negative Transfer",
      "ADAS",
      "AIDE",
    ],
    problem:
      "ADAS는 운전자 감정(DER)·행동(DBR)과 교통상황(TCR)·차량 거동(VBR)을 함께 이해해야 하지만, 기존 연구는 각 태스크를 단일 태스크 학습으로 따로 설계해 태스크 간 상호작용을 반영하지 못했습니다. 네 태스크를 한 모델에서 공동 학습하면 태스크마다 필요한 단서가 달라 서로 간섭하는 negative transfer가 발생합니다.",
    approach: [
      {
        name: "HSA-Net 멀티모달 인코더",
        detail:
          "계층적 단계별 어텐션으로 다중 시점 영상에서 전역 구조 패턴과 핵심 공간 영역을 단계적으로 강조해 시각 모달리티 토큰을 추출합니다. Token-SE는 관절 데이터의 공간 구성을 반영한 joint modality token을 생성합니다.",
      },
      {
        name: "TSMF (Task-Specific Modality Fusion)",
        detail:
          "학습 가능한 태스크 토큰이 멀티모달 토큰을 참조해, 각 태스크에 실제로 유효한 모달리티 단서만 선택적으로 강조하는 태스크별 융합 특징을 만듭니다. 이 지점이 negative transfer를 직접 겨냥한 설계입니다.",
      },
      {
        name: "시간 축 요약과 태스크 헤드",
        detail:
          "생성된 태스크별 융합 특징을 temporal mean pooling으로 요약한 뒤, 각 태스크 헤드가 운전자 상태와 교통상황을 예측합니다.",
      },
    ],
    metrics: [
      { label: "AIDE mAcc", value: "86.25% ± 0.35" },
      { label: "비교", value: "SOTA 달성" },
      { label: "평가", value: "5-seed 반복" },
      { label: "태스크", value: "DER · DBR · TCR · VBR" },
    ],
    outcome:
      "공개 AIDE 데이터베이스에서 네 태스크 통합 인식 기준 mAcc 86.25% ± 0.35로 state-of-the-art를 달성했습니다. 5-seed 반복 실험으로 성능의 안정성까지 함께 보였습니다.",
    figures: [
      {
        src: "/figures/prism-mtl-architecture.png",
        alt: "PRISM-MTL 전체 구조도. 멀티모달 전처리, HSA-Net 기반 인코더, TSMF 모듈을 거쳐 DER·DBR·TCR·VBR 네 태스크를 예측한다.",
        caption:
          "전체 아키텍처 — 5개 모달리티가 HSA-Net·Token-SE 인코더를 거쳐 TSMF에서 태스크별로 선택 융합됩니다.",
        width: 1600,
        height: 707,
      },
      {
        src: "/figures/prism-mtl-tsmf.png",
        alt: "TSMF 모듈 구조. 학습 가능한 태스크 토큰을 query로, 5개 모달리티 토큰을 key와 value로 쓰는 멀티헤드 cross-attention 구조.",
        caption:
          "TSMF — 태스크 토큰이 query, 모달리티 토큰이 key·value로 들어가 태스크마다 필요한 모달리티에 집중합니다.",
        width: 1600,
        height: 570,
      },
      {
        src: "/figures/prism-mtl-results.png",
        alt: "AIDE 데이터베이스에서 PRISM-MTL과 기존 방법들의 태스크별 정확도·F1-score를 비교한 레이더 차트.",
        caption: "AIDE 벤치마크 비교 — 태스크별 정확도와 F1-score",
        width: 1600,
        height: 927,
      },
    ],
    featured: true,
  },
  {
    slug: "stftransnet",
    axis: "강건성 — 가려짐과 조명 변화",
    shortTitle: "STFTransNet",
    title:
      "STFTransNet: A Transformer Based Spatial Temporal Fusion Network for Enhanced Multimodal Driver Inattention State Recognition System",
    koreanTitle: "얼굴이 가려지고 조명이 바뀌어도 버티는 운전자 부주의 상태 인식",
    authors: ["Minjun Kim", "Gyuho Choi"],
    role: "제1저자",
    status: "published",
    venueLabel: "Sensors (SCIE) 게재",
    citation: "Sensors, 2025, 25(18), 5819",
    doi: "10.3390/s25185819",
    year: 2025,
    keywords: [
      "Driver Inattention State Recognition",
      "Partial Occlusion",
      "Cross-Attention",
      "TCN",
      "Multimodal Fusion",
    ],
    problem:
      "운전자가 액세서리를 착용해 얼굴 특징이 부분적으로 가려지거나, 차량 내외부 조명 변화로 빛이 산란해 순간 해상도가 떨어지면 기존 졸음 검출 시스템은 상태를 인식하지 못합니다. 얼굴만 보는 접근으로는 실제 주행 환경의 졸음과 부주의를 함께 감당할 수 없었습니다.",
    approach: [
      {
        name: "MediaPipe Face Mesh 기반 특징 추출",
        detail:
          "얼굴 랜드마크를 추출해 눈·입·고개의 다중 행동 특징을 확보하고, 가려짐에 따라 일부 특징이 사라져도 나머지로 판단할 수 있는 입력 구성을 만들었습니다.",
      },
      {
        name: "RCN 기반 two-stream cross attention",
        detail:
          "운전자의 얼굴 영상과 행동 영상을 두 스트림으로 분리해 각각의 공간 특징을 학습한 뒤, cross attention으로 서로를 참조하게 했습니다. 한쪽이 가려지면 다른 쪽이 보완합니다.",
      },
      {
        name: "TCN 기반 시간 특징 추출",
        detail:
          "추출된 특징의 시간 축 변화를 TCN으로 학습해, 순간적인 화질 저하가 판단을 흔들지 않도록 했습니다.",
      },
      {
        name: "공간·시간 특징 앙상블",
        detail: "공간 특징과 시간 특징을 앙상블해 최종 운전자 상태를 분류합니다.",
      },
    ],
    metrics: [
      { label: "NTHU-DDD", value: "+4.56%p vs VBFLLFA" },
      { label: "StateFarm", value: "+3.48%p vs InceptionV3+HRNN" },
      { label: "YawDD", value: "+3.78%p vs VBFLLFA" },
      { label: "연계 성과", value: "국내 특허 출원" },
    ],
    outcome:
      "공개 데이터 3종 모두에서 기존 방법을 상회했습니다. 이 연구를 바탕으로 국내 특허(10-2025-0107230)를 공동발명자로 출원했습니다.",
    figures: [
      {
        src: "/figures/stftransnet-architecture.png",
        alt: "STFTransNet 전체 구조도. 얼굴 랜드마크 추출, RCN 기반 two-stream cross-attention, TCN 시간 특징 추출, 앙상블 분류로 이어지는 흐름.",
        caption:
          "전체 아키텍처 — 얼굴·행동 two-stream을 cross-attention으로 묶고 TCN으로 시간 축을 더합니다.",
        width: 1600,
        height: 988,
      },
      {
        src: "/figures/stftransnet-cross-attention.png",
        alt: "Cross-attention 구조도. 얼굴 스트림과 행동 스트림이 서로를 참조하는 구조.",
        caption: "Cross-attention — 한쪽이 가려져도 다른 스트림이 보완합니다.",
        width: 1600,
        height: 785,
      },
      {
        src: "/figures/stftransnet-results.png",
        alt: "제안 STFTransNet과 전이학습 모델의 정확도, F1-score, 파라미터 수, FLOPs 비교 그래프.",
        caption: "성능 비교 — 정확도·F1-score와 파라미터·FLOPs를 함께 비교",
        width: 1600,
        height: 1103,
      },
    ],
    featured: true,
  },
  {
    slug: "muse-mtl",
    axis: "효율 — 모달리티 확장 비용",
    shortTitle: "MUSE-MTL",
    title:
      "MUSE-MTL: Modality-Unified Stage-wise Multi-Task Learning for Efficient Multimodal Driving Perception",
    koreanTitle: "모달리티가 늘어도 모델이 커지지 않는 공유 인코더 설계",
    authors: ["Minjun Kim", "Gyuho Choi"],
    role: "제1저자",
    status: "under-review",
    venueLabel: "Engineering Applications of Artificial Intelligence (SCIE) 심사 중",
    year: 2026,
    keywords: [
      "Parameter Efficiency",
      "Shared Encoder",
      "LoRA",
      "Batch Normalization",
      "ADAS",
    ],
    problem:
      "ADAS의 기존 멀티모달 학습은 모달리티마다 독립 인코더를 둡니다. 모달리티가 늘어날수록 파라미터와 연산량이 선형으로 증가하고, 모달리티 간 분포 차이 때문에 표현 공간이 분리돼 의미 정렬도 어려워집니다.",
    approach: [
      {
        name: "PS-MSBN",
        detail:
          "모달리티별 running statistics와 전역 running statistics를 학습 가능한 혼합 계수로 결합해, 인코더를 공유하면서도 모달리티별 특징 분포의 고유성을 보존합니다.",
      },
      {
        name: "StaG-LoRA",
        detail:
          "특징 통계를 게이트로 사용해 모달리티마다 파라미터 갱신 폭을 적응적으로 조절합니다. 공유 인코더가 특정 모달리티에 끌려가지 않게 합니다.",
      },
      {
        name: "ETB (Early Temporal Bottleneck)",
        detail:
          "학습 초기 단계에서 시간 특징의 길이를 미리 줄여 연산 비용을 낮춥니다.",
      },
      {
        name: "TSMF 헤드 연결",
        detail:
          "MUSE가 추출한 멀티모달 특징을 경량 TSMF 헤드로 넘겨, 태스크 토큰과의 cross-attention으로 태스크별 중요 단서를 선택합니다.",
      },
    ],
    metrics: [
      { label: "파라미터", value: "-59%" },
      { label: "GFLOPs", value: "-61.1%" },
      { label: "AIDE mAcc", value: "+0.11%p" },
      { label: "기준", value: "독립 인코더 구조 대비" },
    ],
    outcome:
      "독립 인코더 구조 대비 파라미터 59%, GFLOPs 61.1%를 줄이면서 mAcc는 오히려 0.11%p 향상시켰습니다. 정확도를 내주지 않고 효율을 얻는 trade-off 지점을 확인했습니다.",
    figures: [
      {
        src: "/figures/muse-mtl-architecture.png",
        alt: "MUSE-MTL 전체 구조도. PS-MSBN, StaG-LoRA, ETB를 적용한 공유 멀티모달 인코더와 TSMF 멀티태스크 헤드.",
        caption:
          "전체 아키텍처 — 좌측 PS-MSBN·StaG-LoRA, 중앙 공유 인코더, 우측 ETB와 TSMF",
        width: 991,
        height: 580,
      },
      {
        src: "/figures/muse-mtl-results.png",
        alt: "AIDE 데이터셋에서 MUSE-MTL과 기존 방법들의 태스크별 정확도와 mAcc를 비교한 레이더 차트.",
        caption: "AIDE 비교 — mAcc 86.38%로 독립 인코더 구조를 넘어섭니다.",
        width: 401,
        height: 468,
      },
    ],
  },
  {
    slug: "trace-mtl",
    axis: "인과 — 태스크 간 시간 의존성",
    shortTitle: "TRACE-MTL",
    title:
      "TRACE-MTL: Temporal Relation-Aware Causal Evidence Propagation for Multi-Task Assistive Driving Perception",
    koreanTitle: "태스크 사이의 시간적 인과관계까지 전파하는 통합 인식",
    authors: ["Minjun Kim", "Gyuho Choi"],
    role: "제1저자",
    status: "under-review",
    // 이중맹검 심사 중이라 학회명을 노출하지 않습니다. 공개 여부는 확인 후 결정.
    venueLabel: "Top-tier AI Conference 심사 중",
    year: 2026,
    keywords: [
      "Causal Propagation",
      "Sparse MoE",
      "Temporal Modeling",
      "Multi-Task Learning",
      "Lightweight Backbone",
    ],
    problem:
      "기존 멀티모달 멀티태스크 연구는 시간 모델링과 태스크 간 상호작용을 서로 분리된 두 축으로 다뤄왔습니다. 그래서 한 태스크의 이전 시점이 다른 태스크의 현재 판단에 주는 영향, 즉 태스크 사이의 시간적 인과 의존성을 잡아내지 못합니다.",
    approach: [
      {
        name: "VISTA",
        detail:
          "얼굴·신체·자세·제스처의 인캐빈 기하 관계를 별도 모달리티 스트림을 추가하지 않고 two-stream 인코더에 직접 반영해, 운전자 중심 증거를 추출합니다.",
      },
      {
        name: "MoVE",
        detail:
          "Sparse expert routing으로 다중 시점 특징을 태스크별 증거로 정렬합니다. 태스크마다 필요한 전문가만 선택적으로 활성화됩니다.",
      },
      {
        name: "TRACE",
        detail:
          "인과 지연창(causal lag window) 안에서 태스크 간 증거를 전파해, 시간 축을 따라 발생하는 태스크 간 영향을 포착합니다.",
      },
    ],
    metrics: [
      { label: "AIDE mAcc", value: "85.84% ± 0.75" },
      { label: "비교", value: "SOTA (+3.13%p)" },
      { label: "경량 백본", value: "82.97% / 3.42M" },
      { label: "평가", value: "5-run 반복" },
    ],
    outcome:
      "AIDE 벤치마크에서 5회 반복 기준 mAcc 85.84% ± 0.75로 state-of-the-art를 갱신했습니다. MobileNetV3-Small 백본에서도 3.42M 파라미터로 82.97%를 유지해, 정확도와 효율의 trade-off가 양호함을 보였습니다.",
    figures: [
      {
        src: "/figures/trace-mtl-architecture.png",
        alt: "TRACE-MTL 전체 구조도. VISTA의 RIGM과 HSA-Net, MoVE의 expert routing, TRACE의 cross-task causal propagation으로 구성된다.",
        caption:
          "전체 아키텍처 — (A) VISTA 증거 추출, (B) MoVE 전문가 라우팅, (C) TRACE 인과 전파",
        width: 1207,
        height: 622,
      },
      {
        src: "/figures/trace-mtl-results.png",
        alt: "AIDE DB에서 TRACE-MTL과 state-of-the-art 방법들의 태스크별 정확도와 F1-score를 비교한 레이더 차트.",
        caption: "AIDE 비교 — HSA-Net 백본과 MobileNetV3-Small 백본 결과를 함께 표시",
        width: 651,
        height: 366,
      },
    ],
  },
  {
    slug: "cova-mtl",
    axis: "실차 적용성 — 비용과 센서 결손",
    shortTitle: "COVA-MTL",
    title:
      "COVA-MTL: Counterfactual Value-Aware Modality Acquisition for Efficient and Robust Multi-Task Driving Perception",
    koreanTitle: "무엇을 쓰지 않을지 먼저 정하는 반사실 기반 모달리티 선택",
    authors: ["Minjun Kim", "Gyuho Choi"],
    role: "제1저자",
    status: "under-review",
    venueLabel: "Neurocomputing (SCIE) 심사 중",
    year: 2026,
    keywords: [
      "Counterfactual Reasoning",
      "Modality Acquisition",
      "Missing Modality",
      "Knowledge Distillation",
      "Latency",
    ],
    problem:
      "모든 모달리티를 항상 처리하는 방식은 비용이 크고, 실제 차량에서는 센서가 빠지면 입력 구성 자체가 달라집니다. 비용 문제와 결손 문제가 따로 다뤄져 왔지만, 실차에서는 이 둘이 같은 문제입니다.",
    approach: [
      {
        name: "ACVE",
        detail:
          "비용이 큰 branch 인코딩에 들어가기 전에, 각 입력이 태스크 손실에 주는 반사실적 변화를 먼저 추정합니다. 쓰기 전에 가치를 판단하는 구조입니다.",
      },
      {
        name: "SSR",
        detail:
          "고정된 예산이나 비용 항 없이, 추정된 가치를 기준으로 최소 크기의 모달리티 부분집합을 선택합니다.",
      },
      {
        name: "SCML",
        detail:
          "Knowledge distillation 기반 학습으로 임의의 부분집합 조건에서도 추론이 가능하도록 만들어, 센서 결손 상황을 학습 단계에서 흡수합니다.",
      },
    ],
    metrics: [
      { label: "AIDE mAcc", value: "85.41% ± 0.58" },
      { label: "사용 모달리티", value: "평균 4.30 / 5" },
      { label: "branch 비용", value: "-18.1%" },
      { label: "전체 사용 대비", value: "mAcc -0.4%p" },
    ],
    outcome:
      "5-seed 기준 mAcc 85.41% ± 0.58로, 모든 모달리티를 항상 쓰는 구성(85.79%) 대비 0.4%p만 내주면서 branch 비용을 평균 18.1% 줄였습니다. 아래 영상은 seed 42로 테스트셋 580클립을 실제로 돌린 결과이며, 클립마다 선택이 달라지는 것을 그대로 담았습니다. 센서가 빠진 조건에서는 절감폭이 더 커져, 외부 시점이 없을 때 branch 비용이 42% 내려갑니다.",
    figures: [
      {
        src: "/figures/cova-mtl-selection.mp4",
        poster: "/figures/cova-mtl-selection-poster.png",
        alt: "AIDE 테스트 클립 네 개를 차례로 재생하며, 클립마다 ACVE가 31개 후보 부분집합의 예측 손실을 추정하고 SSR이 손실 기준선 아래에서 가장 작은 것을 골라 실행 분기와 절감률까지 보여주는 영상.",
        caption:
          "실제 동작 — 점 하나가 후보 부분집합 하나입니다. 가로축은 그 후보가 쓰는 모달리티 개수, 세로축은 다섯 개를 다 썼을 때 대비 예측 손실입니다. 점선 아래면 충분하고, 그중 가장 왼쪽이 선택됩니다. 클립마다 선택과 절감률이 달라지는 것을 그대로 담았습니다. AIDE 피험자 보호를 위해 얼굴과 상반신은 흐리게 처리했습니다.",
        width: 1280,
        height: 720,
      },
      {
        src: "/figures/cova-mtl-architecture.png",
        alt: "COVA-MTL 전체 구조도. ACVE가 반사실 가치를 추정하고, SSR이 최소 부분집합을 고르며, SCML이 부분집합 조건 학습을 담당한다.",
        caption:
          "전체 아키텍처 — (a) ACVE 반사실 가치 추정, (b) SSR 최소 부분집합 선택, (c) SCML 부분집합 조건 학습",
        width: 1165,
        height: 483,
      },
      {
        src: "/figures/cova-mtl-paradigm.png",
        alt: "멀티모달 멀티태스크 주행 인식에서 모달리티 선택 방식들을 비교한 그림.",
        caption: "모달리티 선택 패러다임 비교 — 기존 방식과 COVA-MTL의 차이",
        width: 1062,
        height: 578,
      },
    ],
  },
  {
    slug: "sern",
    axis: "데이터 — 라벨 정의",
    shortTitle: "SERN",
    title:
      "A Drowsiness Detection System Using Multiple Driver Behavior Features Based on SERN",
    koreanTitle: "SERN 기반 운전자의 다중 행동 특징을 이용한 졸음 검출 시스템",
    authors: ["Minjun Kim", "Wonyeol Kim", "Gyuho Choi"],
    role: "제1저자",
    status: "published",
    venueLabel: "한국차세대컴퓨팅학회 논문지 (KCI) 게재",
    citation: "한국차세대컴퓨팅학회 논문지, 2024, 20(3)",
    doi: "10.23019/kingpc.20.3.202406.005",
    year: 2024,
    keywords: ["Squeeze-and-Excitation", "ResNet", "Data Relabeling", "Occlusion"],
    problem:
      "기존 졸음 검출 시스템은 운전자의 신체 특징 하나에 의존해, 신체 일부가 가려지면 검출이 무너지는 한계가 있었습니다. 또한 공개 데이터의 졸음 라벨이 하품·눈 감김 구간에서 모호했습니다.",
    approach: [
      {
        name: "다중 행동 특징 추출",
        detail:
          "눈·입·고개의 행동 특징을 함께 추출해, 하나가 가려져도 나머지로 판단할 수 있게 했습니다.",
      },
      {
        name: "계층적 라벨 정제",
        detail:
          "EAR·MAR 지표로 실제 분포를 재분석해 비졸음·졸음 전조·졸음 3단계로 라벨을 재정의했습니다. 모델을 바꾸지 않고 라벨 정의만 고쳐 큰 폭의 개선을 얻었습니다.",
      },
      {
        name: "SERN 모델",
        detail:
          "ResNet18에 Squeeze-and-Excitation 블록을 결합해 채널별 중요도를 재조정했습니다.",
      },
    ],
    metrics: [
      { label: "NTHU-DDD", value: "+1.03%p vs 기존 네트워크" },
      { label: "라벨 재정의 효과", value: "91.50% → 97.75%" },
      { label: "분류", value: "3단계 (비졸음/전조/졸음)" },
    ],
    outcome:
      "NTHU-DDD 공개 DB에서 기존 네트워크 모델 대비 1.03%p 향상을 확인했습니다. 첫 주제 연구로, 이후 STFTransNet으로 이어지는 출발점이 된 작업입니다.",
    figures: [
      {
        src: "/figures/sern-labeling.png",
        alt: "운전자 데이터를 Dlib으로 분석하고 Drowsy·Pre Drowsy·Non Drowsy 3단계로 재라벨링한 뒤 SERN으로 분류하는 전체 흐름도.",
        caption:
          "전체 흐름 — 기존 2단계 라벨을 데이터 분석 후 3단계(졸음/전조/비졸음)로 재정의합니다.",
        width: 1134,
        height: 285,
      },
      {
        src: "/figures/sern-architecture.png",
        alt: "SERN 모델 구조도. ResNet의 residual block에 Squeeze-and-Excitation 블록을 결합한 SE Residual Block 구성.",
        caption: "SERN 구조 — ResNet18의 residual block에 SE 블록을 결합해 채널 중요도를 재조정",
        width: 540,
        height: 621,
      },
    ],
  },
];

export const publishedPapers = papers.filter((p) => p.status === "published");
export const underReviewPapers = papers.filter((p) => p.status === "under-review");

export function getPaper(slug: string) {
  return papers.find((p) => p.slug === slug);
}
