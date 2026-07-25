"use client";

import Link from "next/link";
import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-background">
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,theme(colors.primary/.15),transparent_55%)]" />

      {/* Decorative blur */}
      <div className="absolute -left-40 top-20 h-96 w-96 rounded-full bg-primary/15 blur-3xl" />
      <div className="absolute -right-40 bottom-20 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />

      <div className="relative z-10 grid min-h-screen lg:grid-cols-2">
        {/* Left Side */}
        <div className="hidden flex-col justify-center px-20 lg:flex">
          <Link
            href="/"
            className="mb-10 text-4xl font-black tracking-tight text-foreground"
          >
            YARS
          </Link>

          <h1 className="max-w-lg text-5xl font-black leading-tight text-foreground">
            Welcome back.
          </h1>

          <p className="mt-6 max-w-md text-lg leading-8 text-muted-foreground">
            Continue Building your knowledgebase and keep learning new things
            efficiently
          </p>

          <div className="mt-12 h-px w-40 bg-gradient-to-r from-primary to-transparent" />
        </div>

        {/* Right Side */}
        <div className="flex items-center justify-center px-6 py-12">
          <SignIn
            appearance={{
              elements: {
                rootBox: "w-full flex justify-center",

                card: "rounded-2xl border border-border bg-background shadow-2xl",

                headerTitle: "text-3xl font-bold tracking-tight",

                headerSubtitle: "text-muted-foreground",

                formButtonPrimary: "rounded-xl bg-primary hover:bg-primary/90",

                socialButtonsBlockButton: "rounded-xl",

                formFieldInput: "rounded-xl",

                footerActionLink: "text-primary hover:text-primary/80",
              },
            }}
          />
        </div>
      </div>
    </main>
  );
}
