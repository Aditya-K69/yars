"use client";

import Link from "next/link";
import AsciiPlasmaWave from "@/components/ui/plasmawave";

export default function HomePage() {
  return (
    <main className="relative h-screen w-full overflow-hidden bg-background">
      {/* Plasma Background */}
      <div className="absolute inset-0">
        <AsciiPlasmaWave
          colors={["var(--primary)", "var(--foreground)"]}
          cellSize={16}
          cellFill={0.9}
          bend1={1.8}
          bend2={1.4}
          speed1={0.035}
          speed2={0.028}
        />
      </div>

      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/35 to-background/80" />

      {/* Content */}
      <section className="relative z-10 flex h-full items-center justify-center px-6">
        <div className="mx-auto max-w-4xl text-center">
          {/* Title */}
          <h1 className="text-6xl font-black tracking-tight text-foreground drop-shadow-2xl md:text-8xl">
            YARS
          </h1>

          {/* Subtitle */}
          <p className="mt-6 text-2xl font-semibold tracking-tight text-foreground drop-shadow-lg md:text-3xl">
            Yet Another RAG System
          </p>

          {/* Description */}
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-foreground/90 drop-shadow-md">
            Organize documents, build knowledge graphs, perform semantic search,
            and create AI-powered workflows—all from a unified platform.
          </p>

          {/* Auth Links */}
          <div className="mt-14 flex flex-col items-center justify-center gap-5 sm:flex-row sm:gap-8">
            <Link
              href="/signup"
              className="group flex items-center gap-2 rounded-full border border-white/30 bg-white/20 px-7 py-3 text-base backdrop-blur-xl shadow-[0_8px_30px_rgba(255,255,255,0.08)] transition-all duration-300 hover:scale-105 hover:border-white/50 hover:bg-white/30 hover:shadow-[0_10px_40px_rgba(255,255,255,0.15)]"
            >
              <span className="text-foreground/80">Not a user yet?</span>

              <span className="font-semibold text-foreground transition-transform group-hover:translate-x-1">
                Sign Up Here →
              </span>
            </Link>

            <Link
              href="/signin"
              className="group flex items-center gap-2 rounded-full border border-white/30 bg-white/20 px-7 py-3 text-base backdrop-blur-xl shadow-[0_8px_30px_rgba(255,255,255,0.08)] transition-all duration-300 hover:scale-105 hover:border-white/50 hover:bg-white/30 hover:shadow-[0_10px_40px_rgba(255,255,255,0.15)]"
            >
              <span className="text-foreground/80">Already a user?</span>

              <span className="font-semibold text-foreground transition-transform group-hover:translate-x-1">
                Login Here →
              </span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
