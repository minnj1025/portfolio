import type { Metadata } from "next";
import Image from "next/image";
import { profile } from "@/content/profile";
import { papers } from "@/content/papers";
import {
  education,
  researchExperience,
  internships,
  awards,
  patents,
  domesticPapers,
  skills,
  activities,
  type ResumeEntry,
} from "@/content/resume";
import { TagList } from "@/components/ui";

export const metadata: Metadata = {
  title: `이력서 — ${profile.nameKo}`,
  description: profile.tagline,
};

export default function Resume() {
  return (
    <div className="mx-auto max-w-3xl px-6 pt-20 pb-8">
      <header className="flex flex-col-reverse gap-8 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            {profile.nameKo}
            <span className="ml-3 font-mono text-base text-muted-dim">
              {profile.nameEn}
            </span>
          </h1>
          <p className="mt-3 text-muted">{profile.role}</p>
          <p className="mt-1 text-sm text-muted-dim">
            {profile.lab} · {profile.advisor}
          </p>
          <p className="mt-4 font-mono text-sm">
            <a
              href={`mailto:${profile.contact.email}`}
              className="text-accent hover:underline"
            >
              {profile.contact.email}
            </a>
          </p>
        </div>

        <Image
          src="/profile.jpg"
          alt={`${profile.nameKo} 프로필 사진`}
          width={472}
          height={630}
          priority
          className="h-40 w-30 shrink-0 rounded-lg border border-line object-cover sm:h-48 sm:w-36"
        />
      </header>

      <Block title="학력">
        <EntryList entries={education} />
      </Block>

      <Block title="연구 경력">
        <EntryList entries={researchExperience} />
      </Block>

      <Block title="논문">
        <ol className="space-y-5">
          {papers.map((p, i) => (
            <li key={p.slug} className="grid gap-2 sm:grid-cols-[2rem_1fr]">
              <span className="font-mono text-sm text-muted-dim">
                {papers.length - i}
              </span>
              <div>
                <p className="leading-snug">{p.title}</p>
                <p className="mt-1.5 text-sm text-muted">
                  {p.authors.join(", ")}
                </p>
                <p className="mt-1 font-mono text-xs text-muted-dim">
                  {p.venueLabel}
                  {p.citation ? ` · ${p.citation}` : ""} · {p.role}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </Block>

      <Block title="국내 학술대회">
        <ul className="space-y-4">
          {domesticPapers.map((d) => (
            <li key={d.title}>
              <p className="leading-snug">{d.title}</p>
              <p className="mt-1 font-mono text-xs text-muted-dim">
                {d.authors} · {d.venue}, {d.year}
              </p>
            </li>
          ))}
        </ul>
      </Block>

      <Block title="특허">
        <ul className="space-y-3">
          {patents.map((p) => (
            <li key={p.number}>
              <p className="leading-snug">{p.title}</p>
              <p className="mt-1 font-mono text-xs text-muted-dim">
                {p.number} · {p.status} · {p.role} · {p.year}
              </p>
            </li>
          ))}
        </ul>
      </Block>

      <Block title="수상">
        <ul className="space-y-4">
          {awards.map((a) => (
            <li key={a.name + a.date} className="grid gap-1 sm:grid-cols-[5rem_1fr]">
              <span className="font-mono text-xs text-muted-dim">{a.date}</span>
              <div>
                <p className="leading-snug">{a.name}</p>
                <p className="mt-1 text-sm text-muted">
                  {a.org}
                  {a.note ? ` · ${a.note}` : ""}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </Block>

      <Block title="인턴십">
        <EntryList entries={internships} />
      </Block>

      <Block title="기술">
        <div className="space-y-6">
          {skills.map((s) => (
            <div key={s.category}>
              <p className="eyebrow">{s.category}</p>
              <div className="mt-3">
                <TagList items={s.items} />
              </div>
            </div>
          ))}
        </div>
      </Block>

      <Block title="활동">
        <EntryList entries={activities} />
      </Block>
    </div>
  );
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-20">
      <h2 className="flex items-center gap-4 text-xl font-semibold tracking-tight sm:text-2xl">
        <span className="h-5 w-1 rounded-full bg-accent" aria-hidden />
        {title}
      </h2>
      <div className="rule mt-6 pt-8">{children}</div>
    </section>
  );
}

function EntryList({ entries }: { entries: ResumeEntry[] }) {
  return (
    <ol className="space-y-8">
      {entries.map((e) => (
        <li key={e.title + e.period} className="grid gap-2 sm:grid-cols-[9rem_1fr]">
          <span className="font-mono text-xs text-muted-dim">{e.period}</span>
          <div>
            <h3 className="font-medium">{e.title}</h3>
            <p className="mt-1 text-sm text-muted">{e.org}</p>
            {e.detail && (
              <p className="mt-1 text-sm text-muted-dim">{e.detail}</p>
            )}
            {e.points && (
              <ul className="mt-3 space-y-2">
                {e.points.map((pt) => (
                  <li
                    key={pt}
                    className="relative pl-4 text-sm leading-relaxed text-muted before:absolute before:left-0 before:text-muted-dim before:content-['—']"
                  >
                    {pt}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </li>
      ))}
    </ol>
  );
}
