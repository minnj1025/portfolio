import Link from "next/link";

export function Section({
  id,
  eyebrow,
  title,
  lead,
  children,
}: {
  id?: string;
  eyebrow: string;
  title: string;
  lead?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="rule mx-auto max-w-5xl px-6 pt-20 pb-4">
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
        {title}
      </h2>
      {lead && <p className="mt-4 max-w-2xl leading-relaxed text-muted">{lead}</p>}
      <div className="mt-10">{children}</div>
    </section>
  );
}

export function MetricGrid({
  metrics,
}: {
  metrics: { label: string; value: string }[];
}) {
  if (metrics.length === 0) return null;
  return (
    <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-4">
      {metrics.map((m) => (
        <div key={m.label} className="bg-ink-card px-4 py-4">
          <dt className="font-mono text-[0.625rem] uppercase tracking-wider text-muted-dim">
            {m.label}
          </dt>
          <dd className="mt-1.5 text-sm font-medium text-accent">{m.value}</dd>
        </div>
      ))}
    </dl>
  );
}

export function TagList({ items }: { items: readonly string[] }) {
  if (items.length === 0) return null;
  return (
    <ul className="flex flex-wrap gap-2">
      {items.map((t) => (
        <li
          key={t}
          className="rounded border border-line px-2.5 py-1 font-mono text-xs text-muted"
        >
          {t}
        </li>
      ))}
    </ul>
  );
}

/** 논문/프로젝트 상세에서 "문제 → 방법 → 결과"를 찍어내는 공통 본문 */
export function CaseBody({
  problem,
  approach,
  metrics,
  outcome,
  figures,
}: {
  problem: string;
  approach: { name: string; detail: string }[];
  metrics: { label: string; value: string }[];
  outcome: string;
  figures: { src: string; alt: string; caption: string }[];
}) {
  return (
    <div className="space-y-16">
      <Block label="문제">
        <p className="leading-loose text-muted">{problem}</p>
      </Block>

      <Block label="접근">
        <ol className="space-y-8">
          {approach.map((a, i) => (
            <li key={a.name} className="grid gap-2 sm:grid-cols-[3rem_1fr]">
              <span className="font-mono text-sm text-muted-dim">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h4 className="font-medium">{a.name}</h4>
                <p className="mt-2 leading-loose text-muted">{a.detail}</p>
              </div>
            </li>
          ))}
        </ol>
      </Block>

      <FigureStrip figures={figures} />

      <Block label="결과">
        <MetricGrid metrics={metrics} />
        <p className="mt-6 leading-loose text-muted">{outcome}</p>
      </Block>
    </div>
  );
}

function Block({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="eyebrow">{label}</p>
      <div className="mt-4">{children}</div>
    </div>
  );
}

/** 그림이 아직 없으면 자리만 잡아둔 플레이스홀더를 보여줍니다. */
export function FigureStrip({
  figures,
}: {
  figures: { src: string; alt: string; caption: string }[];
}) {
  if (figures.length === 0) return null;
  return (
    <div>
      <p className="eyebrow">그림</p>
      <div className="mt-4 grid gap-6 sm:grid-cols-2">
        {figures.map((f) => (
          <figure key={f.caption}>
            {f.src ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={f.src}
                alt={f.alt}
                className="w-full rounded-lg border border-line bg-white"
              />
            ) : (
              <div className="flex aspect-[4/3] items-center justify-center rounded-lg border border-dashed border-line bg-ink-soft">
                <span className="px-4 text-center font-mono text-xs text-muted-dim">
                  figure 자리 — {f.alt}
                </span>
              </div>
            )}
            <figcaption className="mt-2 font-mono text-xs text-muted-dim">
              {f.caption}
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}

export function BackLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="font-mono text-xs text-muted-dim transition-colors hover:text-accent"
    >
      ← {label}
    </Link>
  );
}
