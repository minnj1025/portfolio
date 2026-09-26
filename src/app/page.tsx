import Link from "next/link";
import Image from "next/image";
import { profile } from "@/content/profile";
import { papers } from "@/content/papers";
import { projects } from "@/content/projects";
import { stillImage, type Paper, type Project } from "@/content/types";
import { MetricGrid, TagList } from "@/components/ui";

export default function Home() {
  return (
    <>
      <Hero />
      <Disciplines />
      <Highlights />

      <Section
        id="research"
        eyebrow="01 — Research"
        title="연구 프로젝트"
        lead="운전자와 주행 상황을 함께 인식하는 문제를 정확도 · 효율 · 인과 · 실차 적용성의 네 축으로 나눠 다뤄왔습니다. 각 논문은 그 축 하나씩을 맡고 있습니다."
      >
        <div className="space-y-20">
          {papers.map((p, i) => (
            <PaperBlock key={p.slug} paper={p} no={i + 1} />
          ))}
        </div>
      </Section>

      <Section
        id="projects"
        eyebrow="02 — Engineering"
        title="개발 프로젝트"
        lead="연구 밖에서 만든 것들입니다. 모델을 붙이는 일보다, 사람이 실제로 쓰는 흐름까지 이어붙이는 데 시간을 썼습니다."
      >
        <div className="space-y-20">
          {projects.map((p, i) => (
            <ProjectBlock key={p.slug} project={p} no={i + 1} />
          ))}
        </div>
      </Section>
    </>
  );
}

function Hero() {
  return (
    <section className="mx-auto max-w-5xl px-6 pt-24 pb-20 sm:pt-32">
      <p className="eyebrow">
        {profile.nameEn} — {profile.role}
      </p>
      <h1 className="mt-6 max-w-3xl text-3xl font-semibold leading-[1.35] tracking-tight sm:text-5xl sm:leading-[1.3]">
        {profile.tagline}
      </h1>
      <p className="mt-8 max-w-2xl leading-loose text-muted">{profile.intro}</p>
    </section>
  );
}

function Disciplines() {
  // 이음매가 보이지 않도록 같은 목록을 두 번 깝니다.
  const loop = [...profile.disciplines, ...profile.disciplines];
  return (
    <section className="rule border-b border-line-soft py-6">
      <p className="eyebrow mx-auto max-w-5xl px-6">다루는 것</p>
      <div className="marquee mt-4">
        <div className="marquee-track">
          {loop.map((item, i) => (
            <span
              key={`${item}-${i}`}
              aria-hidden={i >= profile.disciplines.length}
              className="flex shrink-0 items-center gap-8 pr-8 font-mono text-sm tracking-[0.18em] text-muted-dim"
            >
              {item}
              <span className="sep text-accent-dim">/</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function Highlights() {
  return (
    <section className="mx-auto max-w-5xl px-6 pt-16">
      <p className="eyebrow">대표 프로젝트</p>
      <div className="mt-4 grid gap-4 sm:grid-cols-3">
        {profile.highlights.map((h) => (
          <Link key={h.name} href={h.href} className="card-link flex flex-col">
            <p className="eyebrow leading-relaxed">{h.focus}</p>
            <h3 className="mt-3 font-mono text-lg text-accent">{h.name}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">{h.detail}</p>
            <p className="mt-auto pt-5 font-mono text-xs text-paper">
              {h.metric}
            </p>
            <span className="mt-4 flex items-center gap-2 border-t border-line-soft pt-4 text-xs text-muted-dim">
              자세히 보기
              <span className="arrow" aria-hidden>
                →
              </span>
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}

function Section({
  id,
  eyebrow,
  title,
  lead,
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  lead: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="rule mx-auto max-w-5xl px-6 pt-20 pb-4">
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
        {title}
      </h2>
      <p className="mt-4 max-w-2xl leading-relaxed text-muted">{lead}</p>
      <div className="mt-14">{children}</div>
    </section>
  );
}

/** 목록에서는 앞 몇 문장만 보여주고 나머지는 상세 페이지에 맡깁니다. */
function clamp(text: string, sentences: number) {
  return text.split(/(?<=\.)\s/).slice(0, sentences).join(" ");
}

function BlockShell({
  no,
  meta,
  name,
  headline,
  sub,
  figure,
  problem,
  approach,
  metrics,
  outcome,
  achievement,
  tags,
  href,
}: {
  no: number;
  meta: string;
  name: string;
  headline: string;
  sub?: string;
  figure?: { src: string; alt: string; width?: number; height?: number };
  problem: string;
  approach: { name: string; tag?: string; detail: string }[];
  metrics: { label: string; value: string }[];
  outcome: string;
  achievement?: string;
  tags: readonly string[];
  href: string;
}) {
  return (
    <article className="rule grid gap-8 pt-12 lg:grid-cols-[19rem_1fr] lg:gap-12">
      {/* 왼쪽: 무엇을 맡은 일인가 */}
      <div className="lg:sticky lg:top-24 lg:self-start">
        <div className="flex items-baseline gap-3">
          <span className="font-mono text-sm text-accent-dim">
            {String(no).padStart(2, "0")}
          </span>
          <span className="eyebrow">{meta}</span>
        </div>

        <h3 className="mt-3 font-mono text-lg text-accent">{name}</h3>
        <p className="mt-2 text-lg font-medium leading-snug tracking-tight">
          {headline}
        </p>
        {sub && (
          <p className="mt-2 text-xs leading-relaxed text-muted-dim">{sub}</p>
        )}

        {achievement && (
          <p className="mt-4 rounded border border-accent-dim px-3 py-2 text-xs leading-relaxed text-accent">
            {achievement}
          </p>
        )}

        <div className="mt-4">
          <TagList items={tags.slice(0, 5)} />
        </div>

        <Link href={href} className="btn mt-5">
          자세히 보기
          <span className="arrow" aria-hidden>
            →
          </span>
        </Link>
      </div>

      {/* 오른쪽: 문제 · 접근 · 결과 */}
      <div>
        {figure && (
          <div className="rounded-lg border border-line bg-white p-2">
            <Image
              src={figure.src}
              alt={figure.alt}
              width={figure.width ?? 1600}
              height={figure.height ?? 900}
              className="mx-auto h-auto max-h-64 w-auto max-w-full"
              sizes="(min-width: 1024px) 640px, 100vw"
            />
          </div>
        )}

        <div className={figure ? "mt-6" : ""}>
          <p className="eyebrow">문제</p>
          <p className="mt-2 leading-relaxed text-muted">
            {clamp(problem, 2)}
          </p>
        </div>

        <div className="mt-6">
          <p className="eyebrow">접근</p>
          <ol className="mt-3 space-y-4">
            {approach.map((a, i) => (
              <li key={a.name} className="grid gap-1 sm:grid-cols-[2rem_1fr]">
                <span className="font-mono text-xs text-muted-dim sm:pt-1">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <p className="font-medium">{a.name}</p>
                  <p className="mt-1 text-sm leading-relaxed text-muted">
                    {clamp(a.detail, 2)}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-6">
          <p className="eyebrow">결과</p>
          <div className="mt-2">
            <MetricGrid metrics={metrics} />
          </div>
          <p className="mt-3 leading-relaxed text-muted">{clamp(outcome, 1)}</p>
        </div>
      </div>
    </article>
  );
}

/** 목록에서는 정지 이미지만 쓴다. 동영상은 상세 페이지에서 재생된다. */
function listFigure(figures: Paper["figures"]) {
  for (const figure of figures) {
    const still = stillImage(figure);
    if (still) return { ...figure, src: still };
  }
  return undefined;
}

function PaperBlock({ paper, no }: { paper: Paper; no: number }) {
  const figure = listFigure(paper.figures);
  const achievement = [paper.venueLabel, paper.citation].filter(Boolean).join(" · ");
  return (
    <BlockShell
      no={no}
      meta={`${paper.axis} · ${paper.year} · ${paper.role}`}
      name={paper.shortTitle}
      headline={paper.koreanTitle}
      sub={paper.title}
      figure={figure}
      problem={paper.problem}
      approach={paper.approach}
      metrics={paper.metrics}
      outcome={paper.outcome}
      achievement={achievement}
      tags={paper.keywords}
      href={`/research/${paper.slug}`}
    />
  );
}

function ProjectBlock({ project, no }: { project: Project; no: number }) {
  const figure = listFigure(project.figures);
  return (
    <BlockShell
      no={no}
      meta={`${project.context} · ${project.period} · ${project.status}`}
      name={project.name}
      headline={project.tagline}
      figure={figure}
      problem={project.problem}
      approach={project.approach}
      metrics={project.metrics}
      outcome={project.outcome}
      tags={project.stack}
      href={`/projects/${project.slug}`}
    />
  );
}
