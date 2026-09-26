export type Approach = {
  name: string;
  tag?: string;
  /** 한두 문장 요약. 목록 카드와 상세 페이지 모두에 나갑니다. */
  detail: string;
  /** 상세 페이지에서만 이어 붙는 설명. 메커니즘과 설계 근거를 적습니다. */
  depth?: string;
};

export type PaperStatus = "published" | "under-review";

export type Figure = {
  /** /public 기준 경로. 비어 있으면 자리만 잡는 플레이스홀더가 나옵니다. */
  src: string;
  alt: string;
  caption: string;
  /** 레이아웃 흔들림을 막기 위한 실제 픽셀 크기 */
  width?: number;
  height?: number;
  /** .mp4일 때 목록과 첫 프레임에 쓰는 정지 이미지 */
  poster?: string;
  /** 상세 페이지에서 캡션 아래 붙는 설명. 무엇을 봐야 하는지를 적습니다. */
  note?: string;
  /** 레이더 차트처럼 크게 띄울 필요가 없는 그림을 좁게 표시합니다. */
  narrow?: boolean;
};

export function isVideo(figure: Figure) {
  return figure.src.endsWith(".mp4");
}

/** 목록 카드에 쓸 정지 이미지. 동영상이면 포스터를 대신 씁니다. */
export function stillImage(figure: Figure) {
  return isVideo(figure) ? figure.poster : figure.src;
}

export type Paper = {
  slug: string;
  /** 약칭. 카드와 목차에 쓰입니다. 예: PRISM-MTL */
  shortTitle: string;
  /** 논문 원제 (영문) */
  title: string;
  /** 한 줄 한글 설명 */
  koreanTitle: string;
  authors: string[];
  /** 저자 기여 표기. 예: 제1저자 */
  role: string;
  /** 이 연구가 맡은 축. 목록에서 논문이 아니라 과제로 읽히게 합니다. */
  axis: string;
  status: PaperStatus;
  /** 화면에 노출할 게재/심사 상태 문구 */
  venueLabel: string;
  /** 정식 인용 정보. 게재된 논문만 채웁니다. */
  citation?: string;
  doi?: string;
  year: number;
  keywords: string[];
  /** 목록 카드 맨 위에 크게 띄우는 한 문장. 전공자가 아니어도 읽히게 씁니다. */
  hook: string;
  /** 무엇이 문제였는가 */
  problem: string;
  /**
   * 어떻게 풀었는가. name은 컴포넌트 이름이 아니라 한 일을 적습니다.
   * 논문에 붙은 약어는 tag로 따로 답니다.
   */
  approach: Approach[];
  /** 정량 결과. 카드 하단 지표 줄에도 쓰입니다. */
  metrics: { label: string; value: string }[];
  /** 결과 서술 */
  outcome: string;
  figures: Figure[];
  /** 대표 프로젝트면 메인 첫 화면에 크게 노출합니다. */
  featured?: boolean;
};

export type Project = {
  slug: string;
  name: string;
  tagline: string;
  period: string;
  /** 소속/맥락. 예: 개인 프로젝트, 3인 팀 · 팀장 */
  context: string;
  role: string;
  status: "운영 중" | "개발 중" | "재개발 중" | "완료";
  /** 목록 카드 맨 위에 크게 띄우는 한 문장. 전공자가 아니어도 읽히게 씁니다. */
  hook: string;
  problem: string;
  approach: Approach[];
  metrics: { label: string; value: string }[];
  outcome: string;
  stack: string[];
  links: { label: string; href: string }[];
  figures: Figure[];
  featured?: boolean;
};
