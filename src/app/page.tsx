import Link from "next/link";
import { profile } from "@/content/profile";
import { publishedPapers, underReviewPapers } from "@/content/papers";
import { projects } from "@/content/projects";
import type { Paper, Project } from "@/content/types";
import { Section, TagList } from "@/components/ui";

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
        <div className="space-y-12">
          <PaperGroup label="게재" papers={publishedPapers} />
          <PaperGroup label="심사 중" papers={underReviewPapers} />
        </div>
      </Section>

      <Section
        id="projects"
        eyebrow="02 — Engineering"
        title="개발 포트폴리오"
        lead="연구 밖에서 만든 것들입니다. 모델을 붙이는 일보다, 사람이 실제로 쓰는 흐름까지 이어붙이는 데 시간을 썼습니다."
      >
        <div className="grid gap-4 sm:grid-cols-2">
          {projects.map((p) => (
            <ProjectCard key={p.slug} project={p} />
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

function PaperGroup({ label, papers }: { label: string; papers: Paper[] }) {
  if (papers.length === 0) return null;
  return (
    <div>
      <div className="mb-4 flex items-baseline gap-3">
        <h3 className="font-mono text-sm text-paper">{label}</h3>
        <span className="font-mono text-xs text-muted-dim">{papers.length}편</span>
      </div>
      <ul className="grid gap-4 sm:grid-cols-2">
        {papers.map((p) => (
          <PaperCard key={p.slug} paper={p} />
        ))}
      </ul>
    </div>
  );
}

function PaperCard({ paper }: { paper: Paper }) {
  const headline = paper.metrics[0];
  return (
    <li>
      <Link
        href={`/research/${paper.slug}`}
        className="group flex h-full flex-col rounded-lg border border-line bg-ink-card p-6 transition-colors hover:border-accent-dim"
      >
        <div className="flex items-baseline justify-between gap-3">
          <span className="font-mono text-sm text-accent">{paper.shortTitle}</span>
          <span className="font-mono text-[0.625rem] text-muted-dim">
            {paper.year} · {paper.role}
          </span>
        </div>

        <h4 className="mt-3 leading-snug font-medium">{paper.koreanTitle}</h4>
        <p className="mt-2 text-xs leading-relaxed text-muted-dim">{paper.title}</p>

        <p className="mt-4 text-sm text-muted">{paper.venueLabel}</p>

        <div className="mt-auto pt-6">
          {headline && (
            <p className="font-mono text-xs text-muted">
              {headline.label}{" "}
              <span className="text-accent">{headline.value}</span>
            </p>
          )}
          <span className="mt-3 inline-block font-mono text-xs text-muted-dim group-hover:text-accent">
            자세히 →
          </span>
        </div>
      </Link>
    </li>
  );
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group flex h-full flex-col rounded-lg border border-line bg-ink-card p-6 transition-colors hover:border-accent-dim"
    >
      <div className="flex items-baseline justify-between gap-3">
        <span className="font-medium">{project.name}</span>
        <span className="font-mono text-[0.625rem] text-muted-dim">
          {project.period}
        </span>
      </div>

      <p className="mt-3 leading-relaxed text-sm text-muted">{project.tagline}</p>

      <div className="mt-4">
        <TagList items={project.stack.slice(0, 4)} />
      </div>

      <div className="mt-auto flex items-baseline justify-between pt-6">
        <span className="font-mono text-[0.625rem] text-muted-dim">
          {project.context} · {project.status}
        </span>
        <span className="font-mono text-xs text-muted-dim group-hover:text-accent">
          자세히 →
        </span>
      </div>
    </Link>
  );
}
