import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { papers, getPaper } from "@/content/papers";
import { BackLink, CaseBody, TagList } from "@/components/ui";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return papers.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const paper = getPaper(slug);
  if (!paper) return {};
  return { title: `${paper.shortTitle} — ${paper.koreanTitle}`, description: paper.problem };
}

export default async function ResearchDetail({ params }: Props) {
  const { slug } = await params;
  const paper = getPaper(slug);
  if (!paper) notFound();

  return (
    <article className="mx-auto max-w-3xl px-6 pt-16 pb-8">
      <BackLink href="/#research" label="연구 프로젝트" />

      <header className="mt-8">
        <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
          <span className="font-mono text-sm text-accent">{paper.shortTitle}</span>
          <span className="font-mono text-xs text-muted-dim">
            {paper.year} · {paper.role}
          </span>
        </div>

        <h1 className="mt-4 text-2xl font-semibold leading-snug tracking-tight sm:text-3xl">
          {paper.koreanTitle}
        </h1>
        <p className="mt-4 leading-relaxed text-muted">{paper.title}</p>

        <dl className="mt-8 grid gap-3 rule pt-8 text-sm sm:grid-cols-[6rem_1fr]">
          <dt className="font-mono text-xs text-muted-dim">저자</dt>
          <dd className="text-muted">{paper.authors.join(", ")}</dd>

          <dt className="font-mono text-xs text-muted-dim">상태</dt>
          <dd className="text-muted">{paper.venueLabel}</dd>

          {paper.citation && (
            <>
              <dt className="font-mono text-xs text-muted-dim">인용</dt>
              <dd className="text-muted">{paper.citation}</dd>
            </>
          )}

          {paper.doi && (
            <>
              <dt className="font-mono text-xs text-muted-dim">DOI</dt>
              <dd>
                <a
                  href={`https://doi.org/${paper.doi}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-accent hover:underline"
                >
                  {paper.doi}
                </a>
              </dd>
            </>
          )}
        </dl>

        <div className="mt-6">
          <TagList items={paper.keywords} />
        </div>
      </header>

      <div className="rule mt-16 pt-16">
        <CaseBody
          problem={paper.problem}
          approach={paper.approach}
          metrics={paper.metrics}
          outcome={paper.outcome}
          figures={paper.figures}
        />
      </div>
    </article>
  );
}
