import Link from "next/link";
import Image from "next/image";
import { profile } from "@/content/profile";
import { papers } from "@/content/papers";
import { projects } from "@/content/projects";
import { stillImage, type Figure, type Paper, type Project } from "@/content/types";

/**
 * 논문과 개발 프로젝트를 한 모양으로 맞춘 카드 데이터.
 * 첫 화면은 "무엇이 문제였나"가 먼저 읽히도록 hook을 가장 크게 띄웁니다.
 */
type Item = {
  slug: string;
  href: string;
  kind: "연구" | "서비스";
  name: string;
  title: string;
  hook: string;
  meta: string;
  figure?: Figure;
  metrics: { label: string; value: string }[];
};

/** 목록에서는 정지 이미지만 씁니다. 동영상은 상세 페이지에서 재생됩니다. */
function listFigure(figures: Figure[]) {
  for (const figure of figures) {
    const still = stillImage(figure);
    if (still) return { ...figure, src: still };
  }
  return undefined;
}

function fromPaper(p: Paper): Item {
  return {
    slug: p.slug,
    href: `/research/${p.slug}`,
    kind: "연구",
    name: p.shortTitle,
    title: p.koreanTitle,
    hook: p.hook,
    meta: `${p.venueLabel} · ${p.role} · ${p.year}`,
    figure: listFigure(p.figures),
    metrics: p.metrics,
  };
}

function fromProject(p: Project): Item {
  return {
    slug: p.slug,
    href: `/projects/${p.slug}`,
    kind: "서비스",
    name: p.name,
    title: p.tagline,
    hook: p.hook,
    meta: `${p.context} · ${p.status}`,
    figure: listFigure(p.figures),
    metrics: p.metrics,
  };
}

// 대표 넷은 연구와 서비스가 번갈아 나오게 둡니다.
const FEATURED_ORDER = ["cova-mtl", "ieum", "prism-mtl", "talktalk-design"];

export default function Home() {
  const all = [...papers.map(fromPaper), ...projects.map(fromProject)];
  const featured = FEATURED_ORDER.map((slug) => all.find((i) => i.slug === slug)).filter(
    (i): i is Item => Boolean(i),
  );
  const otherResearch = papers.filter((p) => !p.featured).map(fromPaper);
  const otherProjects = projects.filter((p) => !p.featured).map(fromProject);

  return (
    <>
      <Intro />

      <section id="featured" className="mx-auto max-w-5xl px-6 pt-4">
        <h2 className="section-title">대표 프로젝트</h2>
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {featured.map((item) => (
            <FeaturedCard key={item.slug} item={item} />
          ))}
        </div>
      </section>

      <OtherList id="research" title="그 외 연구" items={otherResearch} />
      <OtherList id="projects" title="그 외 개발 프로젝트" items={otherProjects} />
    </>
  );
}

function Intro() {
  const published = papers.filter((p) => p.status === "published");
  const sci = published.filter((p) => p.venueLabel.includes("SCI")).length;
  const kci = published.length - sci;
  const review = papers.filter((p) => p.status === "under-review").length;

  return (
    <section className="mx-auto max-w-5xl px-6 pt-16 pb-12 sm:pt-20">
      <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
        {profile.nameKo}
        <span className="ml-3 text-xl font-medium text-muted sm:text-2xl">{profile.role}</span>
      </h1>
      <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted">{profile.tagline}</p>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <Link href="/resume" className="btn btn-primary">
          이력서 보기
          <span className="arrow" aria-hidden>
            →
          </span>
        </Link>
        <a href={`mailto:${profile.contact.email}`} className="btn">
          {profile.contact.email}
        </a>
      </div>

      <p className="mt-6 text-sm text-muted-dim">
        SCI(E) 논문 {sci}편 게재 · {review}편 심사 중
        {kci > 0 && ` · KCI ${kci}편 게재`}
      </p>
    </section>
  );
}

function FeaturedCard({ item }: { item: Item }) {
  return (
    <Link id={item.slug} href={item.href} className="card-link group flex flex-col">
      <div className="flex flex-wrap items-center gap-2 text-xs">
        <span className={item.kind === "연구" ? "kind kind-research" : "kind kind-service"}>
          {item.kind}
        </span>
        <span className="text-muted-dim">{item.meta}</span>
      </div>

      {/* 채용 담당자가 가장 먼저 읽는 자리. 무엇이 안 됐는지를 가장 크게 씁니다. */}
      <p className="mt-4 text-[1.2rem] font-semibold leading-snug tracking-tight sm:text-[1.3rem]">
        {item.hook}
      </p>

      <p className="mt-3 text-sm leading-relaxed text-muted">
        <span className="font-mono font-medium text-accent">{item.name}</span>
        <span className="mx-1.5 text-muted-dim">—</span>
        {item.title}
      </p>

      {item.figure && (
        <div className="relative mt-5 aspect-[16/9] overflow-hidden rounded-lg border border-line-soft bg-white">
          <Image
            src={item.figure.src}
            alt={item.figure.alt}
            fill
            className="object-contain p-2"
            sizes="(min-width: 768px) 460px, 100vw"
          />
        </div>
      )}

      <dl className="mt-5 grid grid-cols-3 gap-2">
        {item.metrics.slice(0, 3).map((m) => (
          <div key={m.label} className="rounded-md bg-ink-soft px-3 py-2.5">
            <dt className="text-[0.7rem] leading-tight text-muted-dim">{m.label}</dt>
            <dd className="mt-1 text-sm font-semibold leading-snug text-paper">{m.value}</dd>
          </div>
        ))}
      </dl>

      <span className="mt-auto flex items-center gap-2 pt-5 text-sm font-medium text-accent">
        자세히 보기
        <span className="arrow" aria-hidden>
          →
        </span>
      </span>
    </Link>
  );
}

function OtherList({ id, title, items }: { id: string; title: string; items: Item[] }) {
  if (items.length === 0) return null;
  return (
    <section id={id} className="mx-auto max-w-5xl px-6 pt-16">
      <h2 className="section-title">{title}</h2>
      <ul className="mt-5 overflow-hidden rounded-xl border border-line bg-ink-card">
        {items.map((item) => (
          <li key={item.slug} id={item.slug} className="border-b border-line-soft last:border-b-0">
            <Link
              href={item.href}
              className="group grid gap-1 px-5 py-4 transition-colors hover:bg-ink-soft sm:grid-cols-[9.5rem_1fr_auto] sm:items-center sm:gap-6"
            >
              <span className="font-mono text-sm font-medium text-accent">{item.name}</span>
              <span>
                <span className="block font-medium leading-snug">{item.hook}</span>
                <span className="mt-1 block text-xs text-muted-dim">{item.meta}</span>
              </span>
              <span
                className="arrow hidden text-muted-dim group-hover:text-accent sm:block"
                aria-hidden
              >
                →
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
