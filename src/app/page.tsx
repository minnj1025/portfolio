import Link from "next/link";
import Image from "next/image";
import { profile } from "@/content/profile";
import { publishedPapers, underReviewPapers } from "@/content/papers";
import { projects } from "@/content/projects";
import type { Paper, Project } from "@/content/types";
import { MetricGrid, TagList } from "@/components/ui";

export default function Home() {
  return (
    <>
      <Hero />

      <Section
        id="research"
        eyebrow="01 — Research"
        title="연구 포트폴리오"
        lead="운전자와 주행 상황을 함께 인식하는 문제를 정확도 · 효율 · 인과 · 실차 적용성의 네 축으로 나눠 다뤄왔습니다. 각 논문은 그 축 하나씩을 맡고 있습니다."
      >
        <div className="space-y-20">
          {[...publishedPapers, ...underReviewPapers].map((p, i) => (
            <PaperBlock key={p.slug} paper={p} no={i + 1} />
          ))}
        </div>
      </Section>

      <Section
        id="projects"
        eyebrow="02 — Engineering"
        title="개발 포트폴리오"
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

      <div className="mt-16 grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-3">
        {profile.pillars.map((p) => (
          <div key={p.no} className="bg-ink-card p-6">
            <span className="font-mono text-xs text-accent-dim">{p.no}</span>
            <h3 className="mt-3 font-medium">{p.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted">{p.detail}</p>
          </div>
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

/** 긴 설명에서 첫 문장만 꺼내 한눈에 읽히게 합니다. */
function firstSentence(text: string) {
  const [head] = text.split(/(?<=\.)\s/);
  return head ?? text;
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
  approach: { name: string; detail: string }[];
  metrics: { label: string; value: string }[];
  outcome: string;
  achievement?: string;
  tags: readonly string[];
  href: string;
}) {
  return (
    <article className="rule pt-12">
      <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
        <span className="font-mono text-sm text-accent-dim">
          {String(no).padStart(2, "0")}
        </span>
        <span className="eyebrow">{meta}</span>
      </div>

      <h3 className="mt-4 font-mono text-lg text-accent">{name}</h3>
      <p className="mt-2 text-xl font-medium leading-snug tracking-tight sm:text-2xl">
        {headline}
      </p>
      {sub && <p className="mt-2 text-sm leading-relaxed text-muted-dim">{sub}</p>}

      {figure && (
        <div className="mt-8 rounded-lg border border-line bg-white p-3">
          <Image
            src={figure.src}
            alt={figure.alt}
            width={figure.width ?? 1600}
            height={figure.height ?? 900}
            className="h-auto w-full"
            sizes="(min-width: 768px) 768px, 100vw"
          />
        </div>
      )}

      <div className="mt-10 grid gap-8 sm:grid-cols-[5rem_1fr]">
        <p className="eyebrow sm:pt-1">문제</p>
        <p className="leading-loose text-muted">{problem}</p>
      </div>

      <div className="mt-8 grid gap-8 sm:grid-cols-[5rem_1fr]">
        <p className="eyebrow sm:pt-1">접근</p>
        <ol className="space-y-4">
          {approach.map((a, i) => (
            <li key={a.name} className="grid gap-1 sm:grid-cols-[2rem_1fr]">
              <span className="font-mono text-xs text-muted-dim sm:pt-1">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <span className="font-medium">{a.name}</span>
                <span className="text-muted"> — {firstSentence(a.detail)}</span>
              </div>
            </li>
          ))}
        </ol>
      </div>

      <div className="mt-8 grid gap-8 sm:grid-cols-[5rem_1fr]">
        <p className="eyebrow sm:pt-1">결과</p>
        <div>
          <MetricGrid metrics={metrics} />
          <p className="mt-5 leading-loose text-muted">{outcome}</p>
        </div>
      </div>

      {achievement && (
        <div className="mt-8 grid gap-8 sm:grid-cols-[5rem_1fr]">
          <p className="eyebrow sm:pt-1">성과</p>
          <p className="rounded-lg border border-accent-dim bg-ink-card px-4 py-3 text-sm text-accent">
            {achievement}
          </p>
        </div>
      )}

      <div className="mt-8 grid gap-8 sm:grid-cols-[5rem_1fr]">
        <span className="hidden sm:block" />
        <div className="flex flex-wrap items-center justify-between gap-4">
          <TagList items={tags} />
          <Link
            href={href}
            className="shrink-0 font-mono text-sm text-muted transition-colors hover:text-accent"
          >
            자세히 보기 →
          </Link>
        </div>
      </div>
    </article>
  );
}

function PaperBlock({ paper, no }: { paper: Paper; no: number }) {
  const figure = paper.figures.find((f) => f.src);
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
  const figure = project.figures.find((f) => f.src);
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
