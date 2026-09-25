export type PaperStatus = "published" | "under-review";

export type Figure = {
  /** /public 기준 경로. 비어 있으면 자리만 잡는 플레이스홀더가 나옵니다. */
  src: string;
  alt: string;
  caption: string;
  /** 레이아웃 흔들림을 막기 위한 실제 픽셀 크기 */
  width?: number;
  height?: number;
};

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
  /** 무엇이 문제였는가 */
  problem: string;
  /** 어떻게 풀었는가 */
  approach: { name: string; detail: string }[];
  /** 정량 결과. 카드 하단 지표 줄에도 쓰입니다. */
  metrics: { label: string; value: string }[];
  /** 결과 서술 */
  outcome: string;
  figures: Figure[];
  /** 대표 논문이면 메인 상단에 크게 노출 */
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
  status: "운영 중" | "개발 중" | "완료";
  problem: string;
  approach: { name: string; detail: string }[];
  metrics: { label: string; value: string }[];
  outcome: string;
  stack: string[];
  links: { label: string; href: string }[];
  figures: Figure[];
  featured?: boolean;
};
