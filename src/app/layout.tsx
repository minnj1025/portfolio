import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import { profile } from "@/content/profile";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: `${profile.nameKo} | ${profile.tagline}`,
  description: profile.intro,
};

const navItems = [
  { href: "/", label: "포트폴리오" },
  { href: "/resume", label: "이력서" },
];

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko">
      <body className={`${geistSans.variable} ${geistMono.variable} font-sans`}>
        <header className="sticky top-0 z-50 border-b border-line-soft bg-ink/80 backdrop-blur">
          <nav className="mx-auto flex h-14 max-w-5xl items-center justify-between px-6">
            <Link href="/" className="font-mono text-sm tracking-tight hover:text-accent">
              {profile.nameEn}
            </Link>
            <div className="flex gap-6 text-sm">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-muted transition-colors hover:text-paper"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </nav>
        </header>

        <main>{children}</main>

        <footer className="rule mt-32">
          <div className="mx-auto max-w-5xl px-6 py-12">
            <p className="eyebrow">Contact</p>
            <div className="mt-4">
              <a
                href={`mailto:${profile.contact.email}`}
                className="text-lg hover:text-accent"
              >
                {profile.contact.email}
              </a>
            </div>
            <p className="mt-10 font-mono text-xs text-muted-dim">
              © {new Date().getFullYear()} {profile.nameEn}
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
