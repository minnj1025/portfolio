import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { projects, getProject } from "@/content/projects";
import { BackLink, CaseBody, TagList } from "@/components/ui";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return { title: `${project.name} — ${project.tagline}`, description: project.problem };
}

export default async function ProjectDetail({ params }: Props) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  return (
    <article className="mx-auto max-w-3xl px-6 pt-16 pb-8">
      <BackLink href={`/#${project.slug}`} label="목록으로" />

      <header className="mt-8">
        <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
          <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            {project.name}
          </h1>
          <span className="font-mono text-xs text-muted-dim">{project.period}</span>
        </div>

        <p className="mt-4 leading-relaxed text-muted">{project.tagline}</p>

        <dl className="mt-8 grid gap-3 rule pt-8 text-sm sm:grid-cols-[6rem_1fr]">
          <dt className="font-mono text-xs text-muted-dim">구성</dt>
          <dd className="text-muted">{project.context}</dd>

          <dt className="font-mono text-xs text-muted-dim">역할</dt>
          <dd className="text-muted">{project.role}</dd>

          <dt className="font-mono text-xs text-muted-dim">상태</dt>
          <dd className="text-muted">{project.status}</dd>
        </dl>

        {project.links.length > 0 && (
          <div className="mt-6 flex flex-wrap gap-4">
            {project.links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                target="_blank"
                rel="noreferrer"
                className="font-mono text-xs text-accent hover:underline"
              >
                {l.label} ↗
              </a>
            ))}
          </div>
        )}
      </header>

      <div className="rule mt-16 pt-16">
        <CaseBody
          hook={project.hook}
          problem={project.problem}
          approach={project.approach}
          metrics={project.metrics}
          outcome={project.outcome}
          figures={project.figures}
        />

        {project.stack.length > 0 && (
          <div className="mt-16">
            <p className="eyebrow">기술 스택</p>
            <div className="mt-4">
              <TagList items={project.stack} />
            </div>
          </div>
        )}
      </div>
    </article>
  );
}
