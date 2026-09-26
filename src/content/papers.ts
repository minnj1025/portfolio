import type { Paper } from "./types";

export const papers: Paper[] = [
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
    hook: "차량에서 센서를 전부 항상 처리하면 너무 무겁고, 센서가 하나라도 빠지면 인식이 흔들립니다.",
    problem:
      "모든 모달리티를 항상 처리하는 방식은 비용이 크고, 실제 차량에서는 센서가 빠지면 입력 구성 자체가 달라집니다. 비용 문제와 결손 문제가 따로 다뤄져 왔지만, 실차에서는 이 둘이 같은 문제입니다.",
    approach: [
      {
        name: "ACVE",
        detail:
          "비용이 큰 branch 인코딩에 들어가기 전에, 각 입력이 태스크 손실에 주는 반사실적 변화를 먼저 추정합니다. 쓰기 전에 가치를 판단하는 구조입니다.",
        depth:
          "추정에 쓰는 입력은 저해상도 프리뷰와 키포인트에서 뽑은 128차원 scout token이라, 224×224 ResNet-18 분기를 한 번도 타지 않고 31개 후보를 모두 평가할 수 있습니다. 학습 신호는 임의의 부분집합을 처리하도록 따로 학습시킨 Teacher가 후보별 정규화 손실을 미리 채워둔 표에서 가져왔고, 손실 변화와 함께 그 추정의 불확실성도 같이 내놓게 했습니다.",
      },
      {
        name: "SSR",
        detail:
          "고정된 예산이나 비용 항 없이, 추정된 가치를 기준으로 최소 크기의 모달리티 부분집합을 선택합니다.",
        depth:
          "기준선은 외부에서 주는 값이 아니라 그 샘플에서 쓸 수 있는 모달리티를 전부 썼을 때의 손실입니다. 네 태스크 평균 손실이 그 기준선을 넘지 않는 후보 중 가장 작은 것을 고르고, 같은 크기가 여럿이면 보정된 위험값으로 순서를 가립니다. 불확실성을 통과 조건으로 두면 애매한 장면마다 전체를 쓰게 되기 때문에, 합격 여부가 아니라 순위에만 반영했습니다.",
      },
      {
        name: "SCML",
        detail:
          "Knowledge distillation 기반 학습으로 임의의 부분집합 조건에서도 추론이 가능하도록 만들어, 센서 결손 상황을 학습 단계에서 흡수합니다.",
        depth:
          "구성이 바뀌면 같은 모달리티 토큰이라도 통계와 관계가 달라집니다. 그래서 선택된 구성에서 만든 벡터로 scale·shift를 생성해 토큰을 보정하고, 선택되지 않은 스트림은 attention mask로 융합에서 빼버립니다. 보정 층은 0으로 초기화해 처음에는 Teacher 표현을 그대로 두고 구성별 차이만 점진적으로 학습하게 했습니다.",
      },
    ],
    metrics: [
      { label: "AIDE mAcc", value: "85.40% ± 0.61" },
      { label: "사용 모달리티", value: "평균 3.76개" },
      { label: "branch 비용", value: "-22.22%" },
      { label: "실측 latency", value: "-15.52%" },
    ],
    outcome:
      "모든 모달리티를 쓰지 않고 평균 3.76개만으로 mAcc 85.40% ± 0.61을 유지하면서, branch 비용 22.22%와 실측 latency 15.52%를 줄였습니다. latency는 CUDA 동기화 기반으로 측정했습니다. 센서가 빠진 조건에서는 절감폭이 더 커져, 외부 시점이 없을 때 branch 비용이 42% 내려갑니다.",
    figures: [
      {
        src: "/figures/cova-mtl-selection.mp4",
        poster: "/figures/cova-mtl-selection-poster.png",
        alt: "AIDE 테스트 클립 네 개를 차례로 재생하며, 클립마다 ACVE가 31개 후보 부분집합의 예측 손실을 추정하고 SSR이 손실 기준선 아래에서 가장 작은 것을 골라 실행 분기와 절감률까지 보여주는 영상.",
        caption:
          "실제 동작 — 점 하나가 후보 부분집합 하나입니다. 가로축은 그 후보가 쓰는 모달리티 개수, 세로축은 다섯 개를 다 썼을 때 대비 예측 손실입니다.",
        note:
          "점선 아래면 충분하고, 그중 가장 왼쪽이 선택됩니다. 2개만 써도 되는 클립부터 다섯 개가 전부 필요한 클립까지 차례로 나오며, 마지막은 절약할 수 없는 경우입니다. 화면 아래 수치는 seed 42 단일 시드 기준이라 위의 5-seed 결과와는 다릅니다. AIDE 피험자 보호를 위해 얼굴과 상반신은 흐리게 처리했습니다.",
        width: 1280,
        height: 720,
      },
      {
        src: "/figures/cova-mtl-paradigm.png",
        alt: "멀티모달 멀티태스크 주행 인식에서 모달리티 선택 방식들을 비교한 그림.",
        caption:
          "선택 방식 비교 — 기존 방식들이 언제 판단하는지, COVA-MTL은 언제 판단하는지",
        note:
          "기존 방식은 인코딩을 마친 특징을 보고 중요도를 매기거나, 데이터셋 전체에 같은 개수 제한을 겁니다. 앞은 안 쓸 입력까지 이미 계산한 뒤라 비용이 줄지 않고, 뒤는 장면마다 필요한 것이 다르다는 점을 반영하지 못합니다.",
        width: 1062,
        height: 578,
      },
      {
        src: "/figures/cova-mtl-architecture.png",
        alt: "COVA-MTL 전체 구조도. ACVE가 반사실 가치를 추정하고, SSR이 최소 부분집합을 고르며, SCML이 부분집합 조건 학습을 담당한다.",
        caption:
          "전체 아키텍처 — (a) ACVE 반사실 가치 추정, (b) SSR 최소 부분집합 선택, (c) SCML 부분집합 조건 학습",
        note:
          "왼쪽 경량 프리뷰가 만든 scout token만으로 31개 후보의 손실 변화를 예측하고, 그중 가장 작은 것을 고른 뒤, 선택된 분기만 실제로 실행합니다. 무거운 인코더를 지나가는 것은 선택된 모달리티뿐입니다.",
        width: 1165,
        height: 483,
      },
      {
        src: "/figures/cova-mtl-tsne.png",
        alt: "COVA-MTL과 단순 공유 인코더의 모달리티별 특징 분포를 t-SNE로 비교한 그림.",
        caption:
          "모달리티별 특징 분포 — 위가 COVA-MTL, 아래가 단순 공유 인코더",
        note:
          "다섯 모달리티가 서로 다른 덩어리로 갈라져 있어야 공유 인코더가 각 입력의 성격을 유지하고 있다는 뜻입니다. 아래는 색이 뒤섞여 있고, 특히 일부만 쓰는 (d)에서 구분이 무너집니다. 같은 조건의 (b)는 세 덩어리가 그대로 떨어져 있습니다.",
        width: 2121,
        height: 1373,
      },
      {
        src: "/figures/cova-mtl-qualitative.png",
        alt: "AIDE 테스트 샘플 세 건에 대해 선택된 모달리티 부분집합과 네 태스크 예측을 단순 공유 인코더와 비교한 그림. 붉은 X는 실행하지 않은 입력.",
        caption:
          "실제 예측 — 붉은 X는 실행하지 않은 입력입니다.",
        note:
          "(a)는 다섯 중 둘만 쓰고도 네 태스크를 모두 맞혔고, 같은 장면에서 전부 쓴 단순 공유 인코더는 넷 중 하나만 맞혔습니다. 적게 써서 싸진 것이 아니라, 덜 쓰는 편이 오히려 정확했던 경우입니다. AIDE 피험자 보호를 위해 얼굴과 상반신은 가렸습니다.",
        width: 1873,
        height: 827,
      },
    ],
    featured: true,
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
    hook: "운전자의 시선 이동이 좌회전 때문인지 한눈을 판 것인지는, 같은 순간의 도로 상황을 봐야 가려집니다.",
    problem:
      "기존 멀티모달 멀티태스크 연구는 시간 모델링과 태스크 간 상호작용을 서로 분리된 두 축으로 다뤄왔습니다. 그래서 한 태스크의 이전 시점이 다른 태스크의 현재 판단에 주는 영향, 즉 태스크 사이의 시간적 인과 의존성을 잡아내지 못합니다.",
    approach: [
      {
        name: "VISTA",
        detail:
          "얼굴·신체·자세·제스처의 인캐빈 기하 관계를 별도 모달리티 스트림을 추가하지 않고 two-stream 인코더에 직접 반영해, 운전자 중심 증거를 추출합니다.",
        depth:
          "네 단서를 primitive map과 쌍별 관계 map으로 바꿔 공간 어텐션을 만든 뒤, 평균을 뺀 centered attention으로 원 영상에 residual 변조만 겁니다. 영상을 대체하지 않고 기하 관계가 필요하다고 말하는 영역만 끌어올리기 때문에, 보는 단서가 늘어도 인코더 수는 그대로입니다.",
      },
      {
        name: "MoVE",
        detail:
          "Sparse expert routing으로 다중 시점 특징을 태스크별 증거로 정렬합니다. 태스크마다 필요한 전문가만 선택적으로 활성화됩니다.",
        depth:
          "학습 가능한 expert query가 네 시점 토큰을 어텐션해 후보 증거를 만들고, 태스크 query가 sparsemax로 그중 일부만 집습니다. sparsemax는 softmax와 달리 나머지에 정확히 0을 주기 때문에, 운전자 상태를 보는 태스크와 도로 상황을 보는 태스크가 실제로 다른 전문가 집합을 쓰게 됩니다.",
      },
      {
        name: "TRACE",
        detail:
          "인과 지연창(causal lag window) 안에서 태스크 간 증거를 전파해, 시간 축을 따라 발생하는 태스크 간 영향을 포착합니다.",
        depth:
          "여기서 인과는 Granger 의미의 예측적 인과로, 소스 태스크의 과거 증거가 타깃 태스크의 현재 판단에 기여하는 관계를 말합니다. 지연 구간마다 어텐션 가중치를 따로 두고 소스별 관계 게이트를 통과시켜, 어떤 태스크가 몇 프레임 전 증거를 볼지를 모델이 직접 정하게 했습니다.",
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
        src: "/figures/trace-mtl-paradigm.png",
        alt: "주행 인식 접근 비교. (a) 태스크별 시간 모델링, (b) 정적 태스크 상호작용 모델링, (c) 제안하는 TRACE-MTL.",
        caption:
          "접근 비교 — (a) 태스크별 시간 모델링, (b) 정적 태스크 상호작용, (c) TRACE-MTL",
        note:
          "(a)는 각 태스크의 시간 흐름만 따로 보고, (b)는 태스크 사이를 잇지만 시간 축이 없습니다. 둘 사이에 비어 있는 것이 '다른 태스크의 몇 프레임 전 상태가 지금 이 판단에 영향을 주는가'이고, 이 연구가 맡은 자리입니다.",
        width: 1058,
        height: 641,
      },
      {
        src: "/figures/trace-mtl-architecture.png",
        alt: "TRACE-MTL 전체 구조도. VISTA 증거 추출, MoVE 전문가 라우팅, TRACE 인과 전파의 세 단계.",
        caption:
          "전체 아키텍처 — (A) VISTA 증거 추출, (B) MoVE 전문가 라우팅, (C) TRACE 인과 전파",
        note:
          "추출 · 정렬 · 전파의 세 단계로 나뉩니다. 인캐빈과 외부를 두 스트림으로 인코딩해 운전자 중심 증거를 뽑고, 태스크마다 필요한 전문가만 골라 증거를 정렬한 뒤, 태스크 사이로 그 증거를 시간 축을 따라 흘려보냅니다.",
        width: 1207,
        height: 622,
      },
      {
        src: "/figures/trace-mtl-qualitative.png",
        alt: "빈 주차장에서 좌회전하는 AIDE 클립에 대해 TRACE의 태스크 간 인과 전파가 운전자 행동 예측을 교정하는 과정을 보여주는 그림.",
        caption:
          "실제 동작 — 빈 주차장에서 좌회전하는 장면",
        note:
          "좌회전 때문에 생긴 시선 이동을 운전자 영상만으로 보면 '두리번거림'으로 읽힙니다. 같은 시점의 교통 상황(원활)과 차량 거동(회전) 증거를 운전자 행동 쪽으로 전파하면 '정상 주행'의 확신도가 0.53에서 0.90으로 올라갑니다. 아래 히트맵은 그 영향이 어느 시점에 몰리는지를 보여줍니다. AIDE 피험자 보호를 위해 인캐빈 영상은 가렸습니다.",
        width: 2007,
        height: 1037,
      },
      {
        src: "/figures/trace-mtl-results.png",
        alt: "AIDE 데이터셋에서 TRACE-MTL과 기존 방법들의 태스크별 정확도·F1-score를 비교한 레이더 차트.",
        caption:
          "AIDE 비교 — (a) 태스크별 정확도와 mAcc, (b) F1-score",
        note:
          "축에서 바깥쪽일수록 좋습니다. 굵은 분홍이 TRACE-MTL이고, 다섯 축 전부에서 기존 방법들 바깥에 있습니다. 네 태스크 평균 85.84%로 기존 최고 대비 3.13%p 앞섭니다.",
        width: 1391,
        height: 818,
        narrow: true,
      },
    ],
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
    hook: "입력 종류가 늘 때마다 인코더를 하나씩 더 붙이면, 모델이 차에 올릴 수 없을 만큼 커집니다.",
    problem:
      "ADAS의 기존 멀티모달 학습은 모달리티마다 독립 인코더를 둡니다. 모달리티가 늘어날수록 파라미터와 연산량이 선형으로 증가하고, 모달리티 간 분포 차이 때문에 표현 공간이 분리돼 의미 정렬도 어려워집니다.",
    approach: [
      {
        name: "PS-MSBN",
        detail:
          "모달리티별 running statistics와 전역 running statistics를 학습 가능한 혼합 계수로 결합해, 인코더를 공유하면서도 모달리티별 특징 분포의 고유성을 보존합니다.",
        depth:
          "차이를 정규화 단계에서만 흡수하므로 합성곱 가중치는 끝까지 하나로 유지됩니다. 추론에서도 학습과 같은 혼합 규칙을 적용해 두 단계의 통계가 어긋나지 않게 했습니다.",
      },
      {
        name: "StaG-LoRA",
        detail:
          "특징 통계를 게이트로 사용해 모달리티마다 파라미터 갱신 폭을 적응적으로 조절합니다. 공유 인코더가 특정 모달리티에 끌려가지 않게 합니다.",
        depth:
          "깊은 단계의 conv2에 1×1 → 1×1 저랭크 보정항을 달되, 입력 특징의 통계로 만든 게이트가 그 보정을 얼마나 반영할지 정합니다. 가중치를 쪼개지 않고도 모달리티별 갱신 폭이 갈라져서, 표현 붕괴와 negative transfer를 한 번에 누릅니다.",
      },
      {
        name: "ETB (Early Temporal Bottleneck)",
        detail:
          "학습 초기 단계에서 시간 특징의 길이를 미리 줄여 연산 비용을 낮춥니다.",
        depth:
          "인접 두 프레임을 평균(정적 성분)과 차분(단기 움직임)으로 나눈 뒤, 평균의 채널 통계로 만든 게이트가 차분을 얼마나 더할지 정합니다. 2단계에서 시간 길이가 절반이 되므로 이후 깊은 단계 전체가 절반 비용으로 돕니다.",
      },
      {
        name: "TSMF 헤드 연결",
        detail:
          "MUSE가 추출한 멀티모달 특징을 경량 TSMF 헤드로 넘겨, 태스크 토큰과의 cross-attention으로 태스크별 중요 단서를 선택합니다.",
        depth:
          "태스크 토큰이 query, 다섯 모달리티 토큰이 key·value이므로 태스크마다 참조하는 모달리티 분포가 달라집니다.",
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
        src: "/figures/muse-mtl-motivation.png",
        alt: "주행 인식의 학습 방식 비교. (a) 단일 태스크, (b) 독립 인코더 멀티모달, (c) 멀티태스크, (d) 제안하는 MUSE-MTL의 공유 인코더.",
        caption:
          "왜 인코더를 공유하는가 — (a)~(c) 기존 방식, (d) MUSE-MTL",
        note:
          "(b)처럼 모달리티마다 인코더를 따로 두면 입력이 하나 늘 때마다 모델도 그만큼 커집니다. (d)는 인코더 하나를 모든 모달리티가 나눠 쓰고, 대신 정규화와 저랭크 보정으로 모달리티 사이의 차이를 흡수합니다. AIDE 피험자 보호를 위해 얼굴과 상반신은 가렸습니다.",
        width: 1621,
        height: 1043,
      },
      {
        src: "/figures/muse-mtl-architecture.png",
        alt: "MUSE-MTL 전체 구조도. PS-MSBN, StaG-LoRA, ETB를 적용한 공유 멀티모달 인코더와 TSMF 멀티태스크 헤드.",
        caption:
          "전체 아키텍처 — 좌측 PS-MSBN·StaG-LoRA, 중앙 공유 인코더, 우측 ETB와 TSMF",
        note:
          "합성곱 가중치는 하나만 두고, 모달리티별 차이는 정규화 통계(PS-MSBN)와 저랭크 보정(StaG-LoRA)이 맡습니다. ETB가 2단계에서 시간 길이를 절반으로 줄이므로, 이후 깊은 단계는 전부 절반 비용으로 돕니다.",
        width: 991,
        height: 580,
      },
      {
        src: "/figures/muse-mtl-tsne.png",
        alt: "단순 공유 인코더와 MUSE의 모달리티별 특징 분포를 t-SNE로 비교한 그림.",
        caption:
          "모달리티별 특징 분포 — (a) MUSE 없이, (b) MUSE 적용",
        note:
          "인코더 하나를 그냥 공유하면 (a)처럼 얼굴·신체·장면이 겹쳐 서로 간섭합니다. (b)는 같은 가중치를 쓰면서도 모달리티별로 덩어리가 갈라집니다. 공유로 아낀 크기가 표현을 망치지 않았다는 근거입니다.",
        width: 1860,
        height: 749,
      },
      {
        src: "/figures/muse-mtl-results.png",
        alt: "AIDE 데이터셋에서 MUSE-MTL과 기존 방법들의 태스크별 정확도·F1-score를 비교한 레이더 차트.",
        caption:
          "AIDE 비교 — (a) 태스크별 정확도와 mAcc, (b) F1-score",
        note:
          "축에서 바깥쪽일수록 좋습니다. 네 태스크 평균 86.38%로 기존 최고 대비 4.08%p 앞서면서, 모달리티마다 인코더를 따로 두는 구조 대비 파라미터는 59% 적습니다.",
        width: 1965,
        height: 966,
        narrow: true,
      },
    ],
  },
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
    hook: "운전자 감정과 도로 상황을 한 모델로 함께 인식하면, 서로 필요한 정보가 달라 오히려 성능을 깎아먹습니다.",
    problem:
      "ADAS는 운전자 감정(DER)·행동(DBR)과 교통상황(TCR)·차량 거동(VBR)을 함께 이해해야 하지만, 기존 연구는 각 태스크를 단일 태스크 학습으로 따로 설계해 태스크 간 상호작용을 반영하지 못했습니다. 네 태스크를 한 모델에서 공동 학습하면 태스크마다 필요한 단서가 달라 서로 간섭하는 negative transfer가 발생합니다.",
    approach: [
      {
        name: "HSA-Net 멀티모달 인코더",
        detail:
          "계층적 단계별 어텐션으로 다중 시점 영상에서 전역 구조 패턴과 핵심 공간 영역을 단계적으로 강조해 시각 모달리티 토큰을 추출합니다. Token-SE는 관절 데이터의 공간 구성을 반영한 joint modality token을 생성합니다.",
        depth:
          "네 단계가 서로 다른 연산을 씁니다. 1단계는 항등으로 초기 국소 정보를 지키고, 2단계는 차선·차량 윤곽처럼 방향성이 강한 구조를, 3단계는 표정이나 움직임이 일어나는 영역을, 4단계는 판별에 유효한 채널을 강조합니다. 관절 쪽은 시퀀스 전체의 채널 통계로 게이트를 만들어, 자세와 손동작에서 중요한 차원만 남겨 토큰으로 넘깁니다.",
      },
      {
        name: "TSMF (Task-Specific Modality Fusion)",
        detail:
          "학습 가능한 태스크 토큰이 멀티모달 토큰을 참조해, 각 태스크에 실제로 유효한 모달리티 단서만 선택적으로 강조하는 태스크별 융합 특징을 만듭니다. 이 지점이 negative transfer를 직접 겨냥한 설계입니다.",
        depth:
          "태스크 토큰이 query, 다섯 모달리티 토큰이 key·value인 cross-attention을 multi-head로 수행해 태스크마다 다른 모달리티 상호작용 부분공간을 학습합니다. 태스크별 분기나 게이트를 따로 두지 않고 하나의 연산 안에서 라우팅이 끝나는 것이 설계의 요점입니다.",
      },
      {
        name: "시간 축 요약과 태스크 헤드",
        detail:
          "생성된 태스크별 융합 특징을 temporal mean pooling으로 요약한 뒤, 각 태스크 헤드가 운전자 상태와 교통상황을 예측합니다.",
        depth:
          "각 헤드는 자기 태스크의 클립 단위 표현만 받으므로, 인코더를 공유하면서도 출력단에서는 태스크가 섞이지 않습니다.",
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
        note:
          "왼쪽에서 얼굴·신체·장면은 HSA-Net이, 자세·제스처는 Token-SE가 토큰으로 만듭니다. 다섯 토큰이 한자리에 모인 뒤에야 태스크별로 갈라지는데, 그 갈라지는 지점이 오른쪽 TSMF입니다.",
        width: 1600,
        height: 707,
      },
      {
        src: "/figures/prism-mtl-tsmf.png",
        alt: "TSMF 모듈 구조. 학습 가능한 태스크 토큰을 query로, 5개 모달리티 토큰을 key와 value로 쓰는 멀티헤드 cross-attention 구조.",
        caption:
          "TSMF — 태스크 토큰이 query, 모달리티 토큰이 key·value로 들어갑니다.",
        note:
          "태스크마다 학습 가능한 토큰을 하나씩 두고, 그 토큰이 다섯 모달리티 중 자기에게 필요한 쪽에만 가중치를 싣습니다. 운전자 감정은 얼굴 쪽으로, 교통상황은 장면 쪽으로 쏠리기 때문에 한 태스크의 학습이 다른 태스크를 끌고 가지 않습니다.",
        width: 1600,
        height: 570,
      },
      {
        src: "/figures/prism-mtl-results.png",
        alt: "AIDE 데이터베이스에서 PRISM-MTL과 기존 방법들의 태스크별 정확도·F1-score를 비교한 레이더 차트.",
        caption:
          "AIDE 비교 — (a) 태스크별 정확도와 mAcc, (b) F1-score",
        note:
          "축에서 바깥쪽일수록 좋습니다. 굵은 갈색이 PRISM-MTL이고, 네 태스크 평균 86.25%로 기존 최고 대비 3.95%p 앞섭니다. 특정 태스크만 좋아진 것이 아니라 네 축이 함께 밀려난 점이 요점입니다.",
        width: 2282,
        height: 1348,
        narrow: true,
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
    hook: "운전자가 마스크나 선글라스를 쓰거나 조명이 바뀌면, 얼굴만 보는 졸음 검출은 멈춥니다.",
    problem:
      "운전자가 액세서리를 착용해 얼굴 특징이 부분적으로 가려지거나, 차량 내외부 조명 변화로 빛이 산란해 순간 해상도가 떨어지면 기존 졸음 검출 시스템은 상태를 인식하지 못합니다. 얼굴만 보는 접근으로는 실제 주행 환경의 졸음과 부주의를 함께 감당할 수 없었습니다.",
    approach: [
      {
        name: "MediaPipe Face Mesh 기반 특징 추출",
        detail:
          "얼굴 랜드마크를 추출해 눈·입·고개의 다중 행동 특징을 확보하고, 가려짐에 따라 일부 특징이 사라져도 나머지로 판단할 수 있는 입력 구성을 만들었습니다.",
        depth:
          "랜드마크에서 EAR·MAR과 고개 각도를 따로 계산해 두면, 눈이 가려진 구간에서는 입과 고개가, 마스크 구간에서는 눈과 고개가 판단을 이어받습니다.",
      },
      {
        name: "RCN 기반 two-stream cross attention",
        detail:
          "운전자의 얼굴 영상과 행동 영상을 두 스트림으로 분리해 각각의 공간 특징을 학습한 뒤, cross attention으로 서로를 참조하게 했습니다. 한쪽이 가려지면 다른 쪽이 보완합니다.",
        depth:
          "각 스트림은 ResNet-18에 CBAM을 붙여 채널 어텐션과 공간 어텐션을 차례로 거칩니다. 융합은 얼굴 특징을 query, 원본 영상 특징을 key·value로 두는 비대칭 구조라, 얼굴 단서가 약한 구간일수록 전신 영상 쪽 정보가 더 많이 끌려옵니다.",
      },
      {
        name: "TCN 기반 시간 특징 추출",
        detail:
          "추출된 특징의 시간 축 변화를 TCN으로 학습해, 순간적인 화질 저하가 판단을 흔들지 않도록 했습니다.",
        depth:
          "dilated convolution으로 수용 영역을 넓히고 residual 연결로 기울기 소실을 막아, 세 층만으로 클립 전체의 순서 패턴을 봅니다.",
      },
      {
        name: "공간·시간 특징 앙상블",
        detail: "공간 특징과 시간 특징을 앙상블해 최종 운전자 상태를 분류합니다.",
        depth:
          "TCN 출력에 RCN의 공간 특징을 residual로 더하는 형태라, 시간 모델링이 흔들리는 구간에도 프레임 단위 판단이 남습니다.",
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
        note:
          "공간 정보와 시간 정보를 따로 뽑아 마지막에 합칩니다. 시간 모델링이 흔들리는 구간에도 프레임 단위 판단이 남도록, TCN 출력에 공간 특징을 residual로 더했습니다.",
        width: 1600,
        height: 988,
      },
      {
        src: "/figures/stftransnet-cross-attention.png",
        alt: "Cross-attention 구조도. 얼굴 스트림과 행동 스트림이 서로를 참조하는 구조.",
        caption:
          "Cross-attention — 얼굴 특징이 query, 원본 영상 특징이 key·value입니다.",
        note:
          "두 스트림을 같은 비중으로 섞지 않고 한쪽을 질의로 둔 비대칭 구조입니다. 그래서 얼굴 단서가 약한 구간일수록 전신 영상 쪽 정보가 더 많이 끌려옵니다.",
        width: 1600,
        height: 785,
      },
      {
        src: "/figures/stftransnet-results.png",
        alt: "제안 STFTransNet과 전이학습 모델의 정확도, F1-score, 파라미터 수, FLOPs 비교 그래프.",
        caption:
          "성능 비교 — 정확도·F1-score와 파라미터·FLOPs를 함께 놓았습니다.",
        note:
          "정확도만 놓고 고르면 무거운 모델이 유리하므로 비용 축을 같이 뒀습니다. 공개 데이터 3종 모두에서 기존 방법을 넘으면서 파라미터와 연산량은 더 낮은 지점을 찾았습니다.",
        width: 1600,
        height: 1103,
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
    hook: "공개 데이터의 졸음 라벨부터 모호해서, 모델을 바꿔도 정확도가 오르지 않았습니다.",
    problem:
      "기존 졸음 검출 시스템은 운전자의 신체 특징 하나에 의존해, 신체 일부가 가려지면 검출이 무너지는 한계가 있었습니다. 또한 공개 데이터의 졸음 라벨이 하품·눈 감김 구간에서 모호했습니다.",
    approach: [
      {
        name: "다중 행동 특징 추출",
        detail:
          "눈·입·고개의 행동 특징을 함께 추출해, 하나가 가려져도 나머지로 판단할 수 있게 했습니다.",
        depth:
          "Dlib 랜드마크에서 EAR과 MAR, 고개 각도를 각각 지표로 뽑아 단일 특징 의존을 끊었습니다.",
      },
      {
        name: "계층적 라벨 정제",
        detail:
          "EAR·MAR 지표로 실제 분포를 재분석해 비졸음·졸음 전조·졸음 3단계로 라벨을 재정의했습니다. 모델을 바꾸지 않고 라벨 정의만 고쳐 큰 폭의 개선을 얻었습니다.",
        depth:
          "공개 DB의 하품 라벨은 졸음과 비졸음 양쪽에 모두 들어 있었습니다. MAR로 확인하니 실제 입이 열린 구간이 11.6%뿐이라 졸음 지표로 쓸 수 없다고 보고 제외했고, 남은 구간은 EAR 평균이 졸음과 비졸음 사이에 놓이는 것을 확인해 '졸음 전조'로 따로 세웠습니다.",
      },
      {
        name: "SERN 모델",
        detail:
          "ResNet18에 Squeeze-and-Excitation 블록을 결합해 채널별 중요도를 재조정했습니다.",
        depth:
          "각 residual block 출력에 global average pooling으로 채널 통계를 뽑고 두 층의 완전연결로 가중치를 학습해, 가려짐으로 일부 채널이 무의미해지면 나머지 채널의 비중이 올라가게 했습니다.",
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
        note:
          "모델을 바꾸기 전에 라벨부터 본 작업입니다. 하품 구간은 졸음과 비졸음 양쪽에 걸쳐 있어 지표로 쓸 수 없다고 보고 제외했고, 눈 개방이 불완전한 구간은 두 상태 사이에 놓이는 것을 확인해 '전조'로 따로 세웠습니다.",
        width: 1134,
        height: 285,
      },
      {
        src: "/figures/sern-architecture.png",
        alt: "SERN 모델 구조도. ResNet의 residual block에 Squeeze-and-Excitation 블록을 결합한 SE Residual Block 구성.",
        caption:
          "SERN 구조 — ResNet18의 residual block에 SE 블록을 결합했습니다.",
        note:
          "블록마다 채널별 중요도를 다시 매기는 구조라, 가려짐으로 일부 채널이 무의미해지면 나머지 채널의 비중이 올라갑니다.",
        width: 540,
        height: 621,
        narrow: true,
      },
    ],
  },
];

// 목록은 papers 배열 순서를 그대로 따릅니다. 최신 연구가 위로 옵니다.

export function getPaper(slug: string) {
  return papers.find((p) => p.slug === slug);
}
