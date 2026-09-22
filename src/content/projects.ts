import type { Project } from "./types";

export const projects: Project[] = [
  {
    slug: "ieum",
    name: "이음",
    tagline: "오늘 쓴 일기에서 지금 필요한 성경 구절을 찾아 이어주는 앱",
    period: "2026 ~ 진행 중",
    context: "개인 프로젝트",
    role: "기획 · 개발 전담",
    status: "개발 중",
    problem:
      "성경을 펼쳤을 때 어디를 읽어야 할지 모르는 것이 시작점이었습니다. 검색은 단어가 맞아떨어져야 찾아지고, 통독표는 오늘 내 상황과 무관하게 순서대로 흘러갑니다. 정작 필요한 순간에 맞는 구절을 만나기가 어려웠습니다.",
    approach: [
      {
        name: "일기를 입구로 삼기",
        detail:
          "구절을 검색하게 하는 대신 오늘의 일기와 다이어리를 입구로 놓았습니다. 사용자가 자기 상태를 검색어로 번역할 필요가 없어집니다.",
      },
      {
        name: "의미 기반 구절 매칭",
        detail:
          "작성한 글의 맥락과 감정을 읽어 관련된 성경 구절을 매칭합니다. 단어가 겹치지 않아도 닿을 수 있게 하는 것이 핵심입니다.",
      },
      {
        name: "LLM 해설 제공",
        detail:
          "매칭된 구절이 왜 지금 이 글과 연결되는지를 LLM이 함께 설명해, 구절만 던져주고 끝나지 않도록 했습니다.",
      },
    ],
    metrics: [
      { label: "입력", value: "일기 · 다이어리" },
      { label: "핵심", value: "의미 기반 매칭" },
      { label: "상태", value: "개발 중" },
    ],
    outcome:
      "TODO: 현재 어디까지 구현했는지, 사용자 수나 반응 같은 수치가 있으면 채워주세요.",
    stack: [], // TODO: 실제 스택 (앱 프레임워크 / 임베딩·모델 / 백엔드)
    links: [],
    figures: [],
    featured: true,
  },
  {
    slug: "lexai",
    name: "LexAI",
    tagline: "법률 문서를 읽어주고, 필요한 전문가까지 찾아주는 서비스",
    period: "2025",
    context: "3인 팀 · 팀장",
    role: "기획 · 개발",
    status: "완료",
    problem:
      "일반인은 법률 정보에 접근하기도 어렵고, 찾더라도 해석이 어렵습니다. 반대로 법률인은 필요한 자료를 검색하는 데 시간을 씁니다. 두 문제가 별개로 다뤄지면서 어느 쪽도 해결되지 않고 있었습니다.",
    approach: [
      {
        name: "법률 데이터 정형화",
        detail:
          "민사·행정·형사 분야의 법령·판결문·해석례를 검색과 질의응답이 가능한 구조로 정형화했습니다.",
      },
      {
        name: "문서 업로드 파이프라인",
        detail:
          "CLOVA OCR로 사용자가 올린 문서를 텍스트화해, 손에 든 서류 그대로 질문할 수 있게 했습니다.",
      },
      {
        name: "근거를 함께 제시하는 RAG",
        detail:
          "Vector DB 기반 RAG로 답변과 함께 근거 조항·판례를 제시했습니다. 법률 도메인에서는 답이 맞는지보다 왜 그런지를 보여주는 쪽이 신뢰를 만든다고 판단했습니다.",
      },
      {
        name: "전문가 탐색 연결",
        detail:
          "법률 정보 이해와 전문가 탐색을 하나의 서비스 흐름으로 통합했습니다.",
      },
    ],
    metrics: [
      { label: "수상", value: "조선대 종합학술대회 금상" },
      { label: "대상 분야", value: "민사 · 행정 · 형사" },
      { label: "역할", value: "3인 팀 팀장" },
    ],
    outcome:
      "2025 조선대학교 종합학술대회에서 금상을 수상했습니다.",
    stack: ["HyperCLOVA X", "CLOVA OCR", "Vector DB", "RAG"],
    links: [],
    figures: [],
    featured: true,
  },
  {
    slug: "talktalk-design",
    name: "Talktalk deSign",
    tagline: "라즈베리파이 위에서 실시간으로 도는 수어 번역기",
    period: "2024",
    context: "3인 팀 · 팀장",
    role: "기획 · 모델 설계 · 구현",
    status: "완료",
    problem:
      "초기 Attention-CNN+LSTM 모델은 공개 데이터에서는 잘 맞았지만 실제 카메라 앞에서는 무너졌습니다. 원인을 배경·옷차림·체형 같은 비핵심 시각 정보로 판단했습니다. 데이터를 더 모으는 쪽이 아니라 모델이 보는 입력 자체를 바꾸기로 했습니다.",
    approach: [
      {
        name: "입력을 골격으로 치환",
        detail:
          "MediaPipe Pose/Hands로 47개 골격 좌표를 추출해, 배경과 외형 정보를 입력 단계에서 제거했습니다.",
      },
      {
        name: "그래프 변환 후 ST-GCN 적용",
        detail:
          "좌표를 그래프로 변환하고 ST-GCN을 적용해 관절 간 공간 관계와 시간 변화를 함께 학습시켰습니다.",
      },
      {
        name: "임베디드 실시간 파이프라인",
        detail:
          "Raspberry Pi 4에 탑재해 카메라 입력 → 골격 추출 → 인식 → Google TTS 음성 출력까지 실시간 동작을 시연했습니다.",
      },
    ],
    metrics: [
      { label: "KSL-77 정확도", value: "94.73%" },
      { label: "데이터", value: "77개 클래스 · 20인" },
      { label: "구동 환경", value: "Raspberry Pi 4 실시간" },
      { label: "수상", value: "조선대 종합학술대회 금상" },
    ],
    outcome:
      "KSL-77 77개 클래스·20인 데이터에서 94.73%를 달성하고, 임베디드 보드에서 end-to-end 실시간 동작까지 시연했습니다. 2024 조선대학교 종합학술대회 금상.",
    stack: ["MediaPipe", "ST-GCN", "PyTorch", "Raspberry Pi 4", "Google TTS"],
    links: [],
    figures: [],
    featured: true,
  },
  {
    slug: "stock-cause-analysis",
    name: "주가 변동 원인 분석 알림",
    tagline: "가격이 움직인 사실이 아니라, 움직인 이유를 알려주는 파이프라인",
    period: "2024",
    context: "3인 팀", // TODO: 대회 연도 확인 (자소서 2024.10.16 / 상장 파일명 2025)
    role: "LLM 기반 주가변동 원인 분석 파트",
    status: "완료",
    problem:
      "기존 알림 서비스는 가격 변동만 알리거나 뉴스를 그대로 전달할 뿐, 변동의 원인 해석이 빠져 있었습니다. 게다가 유사 기사가 반복 전송되면서 사용자가 알림 기능 자체를 꺼버리는 문제가 있었습니다.",
    approach: [
      {
        name: "급변 종목 탐지 → 원인 분석 파이프라인",
        detail:
          "급변 종목을 탐지하고 뉴스를 크롤링한 뒤 CLOVA Summary로 요약하고, HyperCLOVA X로 변동 원인을 분석하는 흐름을 설계했습니다.",
      },
      {
        name: "보유 종목 기반 개인화",
        detail:
          "분석 결과를 사용자의 보유 종목과 매칭해 개인화된 알림으로 연결했습니다.",
      },
      {
        name: "중복 알림 억제",
        detail:
          "BoW 코사인 유사도 0.35를 임계값으로 유사 기사 반복 전송을 억제했습니다. 알림을 끄게 만드는 원인을 직접 제거한 설계입니다.",
      },
    ],
    metrics: [
      { label: "수상", value: "대상 (336개 팀 중)" },
      { label: "중복 억제 임계값", value: "코사인 유사도 0.35" },
      { label: "역할", value: "원인 분석 파트 담당" },
    ],
    outcome:
      "미래에셋증권 AI·데이터 페스티벌에서 336개 참가팀 중 대상을 수상했습니다. 새로운 서비스를 만들기보다 기존 서비스에 AI를 연계해 사용자 경험을 개선하는 쪽에 초점을 뒀습니다.",
    stack: [
      "HyperCLOVA X",
      "CLOVA Summary API",
      "Python",
      "News Crawler",
      "BoW · Cosine Similarity",
    ],
    links: [],
    figures: [],
  },
  {
    slug: "teachers",
    name: "티처스",
    tagline: "내가 올린 자료로 바로 수업이 시작되는 AI 음성 학습 서비스",
    period: "2025",
    context: "4인 팀 · 팀장",
    role: "기획 · 프로토타입 구현 · 발표",
    status: "완료",
    problem:
      "기존 교육 앱은 대부분 특정 분야나 과목에 특화돼 있어, 사용자가 지금 공부하려는 자료가 그 범위 밖이면 쓸 수 없었습니다.",
    approach: [
      {
        name: "자료 기반 학습 연결",
        detail:
          "분야·과목에 상관없이 이용자가 입력한 학습 자료를 기반으로 교육을 연결하는 구조로 기획했습니다.",
      },
      {
        name: "음성 인터페이스 결합",
        detail:
          "LLM과 STT/TTS를 결합해 학습자 수준에 맞춘 설명과 실시간 상호작용을 제공했습니다.",
      },
      {
        name: "페르소나 다양화",
        detail:
          "여러 페르소나를 제공해 학습 경험의 몰입도를 높였습니다.",
      },
    ],
    metrics: [
      { label: "수상", value: "호남권 LLM 해커톤 우수상" },
      { label: "역할", value: "4인 팀 팀장" },
      { label: "범위", value: "기획 → 프로토타입 → 발표" },
    ],
    outcome:
      "제한된 해커톤 일정 안에서 기획부터 프로토타입 구현, 발표까지 전 과정을 수행해 2025 SW중심대학 호남권 LLM 해커톤 경진대회 우수상을 받았습니다.",
    stack: ["LLM", "STT", "TTS", "음성 인터페이스"],
    links: [],
    figures: [],
  },
];

export const featuredProjects = projects.filter((p) => p.featured);

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
