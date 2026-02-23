import { CheckCircle, ExternalLink, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { proposalData } from "@/data/proposal";

export default function ProposalPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-8 space-y-12">

      {/* ── Section 1: Hero ── */}
      <section
        className="relative rounded-lg overflow-hidden"
        style={{ background: "oklch(0.10 0.02 var(--primary-h, 270))" }}
      >
        {/* Radial highlight */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(ellipse at 20% 30%, oklch(0.55 0.12 var(--primary-h, 270) / 0.12), transparent 65%)",
          }}
        />

        <div className="relative z-10 p-8 md:p-12">
          {/* Muted prefix label */}
          <p className="font-mono text-xs tracking-widest uppercase text-white/50 mb-4">
            Full-Stack Developer · Marketplace Specialist
          </p>

          {/* Weight contrast headline */}
          <h1 className="text-5xl md:text-6xl tracking-tight leading-none mb-4">
            <span className="font-light text-white/80">Hi, I&apos;m</span>{" "}
            <span className="font-black text-white">{proposalData.hero.name}</span>
          </h1>

          {/* Tailored value prop */}
          <p className="text-lg md:text-xl text-white/70 max-w-2xl leading-relaxed mb-6">
            {proposalData.hero.valueProp}
          </p>

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/20 bg-white/10 text-white/80 text-sm">
            <CheckCircle className="w-3.5 h-3.5" />
            {proposalData.hero.badge}
          </div>
        </div>

        {/* Stats shelf */}
        <div className="relative z-10 border-t border-white/10 bg-white/5 px-8 py-4">
          <div className="grid grid-cols-3 gap-4">
            {proposalData.hero.stats.map((stat) => (
              <div key={stat.label}>
                <div className="text-2xl font-bold bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="text-xs text-white/60">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 2: Proof of Work ── */}
      <section className="space-y-4">
        <p className="font-mono text-xs tracking-widest uppercase text-muted-foreground">
          Proof of Work
        </p>
        <h2 className="text-2xl font-bold tracking-tight">Relevant Projects</h2>

        <div className="grid gap-4 md:grid-cols-2">
          {proposalData.portfolioProjects.map((project) => (
            <div key={project.name} className="linear-card p-5 space-y-3">
              <div className="flex items-start justify-between gap-2">
                <h3 className="text-lg font-semibold leading-snug">{project.name}</h3>
                {project.url && (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors duration-100 shrink-0"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>

              <p className="text-sm text-muted-foreground leading-relaxed">
                {project.description}
              </p>

              {/* Outcome badge */}
              <div className="flex items-start gap-2 text-sm" style={{ color: "var(--success)" }}>
                <TrendingUp className="w-3.5 h-3.5 mt-0.5 shrink-0" />
                <span>{project.outcome}</span>
              </div>

              {/* Relevance note */}
              <p className="text-xs text-primary/80 font-medium leading-relaxed border-t border-border/60 pt-2">
                {project.relevance}
              </p>

              {/* Tech tags */}
              <div className="flex flex-wrap gap-1.5">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="px-2 py-0.5 rounded-md bg-muted text-xs font-mono text-muted-foreground"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Section 3: How I Work ── */}
      <section className="space-y-4">
        <p className="font-mono text-xs tracking-widest uppercase text-muted-foreground">
          Process
        </p>
        <h2 className="text-2xl font-bold tracking-tight">How I Work</h2>

        <div className="grid gap-4 sm:grid-cols-2">
          {proposalData.approach.map((step) => (
            <div key={step.step} className="linear-card p-5 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs tracking-widest uppercase text-muted-foreground">
                  Step {step.step}
                </span>
                <span className="font-mono text-xs text-muted-foreground/60">
                  {step.timeline}
                </span>
              </div>
              <h3 className="text-base font-semibold">{step.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Section 4: Skills Grid ── */}
      <section className="space-y-4">
        <p className="font-mono text-xs tracking-widest uppercase text-muted-foreground">
          Tech Stack
        </p>
        <h2 className="text-2xl font-bold tracking-tight">What I Build With</h2>

        <div className="space-y-3">
          {proposalData.skills.map((category) => (
            <div key={category.category} className="linear-card p-4 space-y-2">
              <p className="text-xs font-medium text-muted-foreground">
                {category.category}
              </p>
              <div className="flex flex-wrap gap-2">
                {category.items.map((skill) => (
                  <span
                    key={skill}
                    className="px-2.5 py-1 rounded-md border border-border/60 text-sm font-mono text-foreground/80 bg-muted/30"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Section 5: CTA ── */}
      <section className="rounded-lg bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20 p-8 md:p-12 text-center space-y-4">
        {/* Pulsing availability indicator */}
        <div className="flex items-center justify-center gap-2">
          <span className="relative flex h-2 w-2">
            <span
              className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
              style={{ backgroundColor: "var(--success)" }}
            />
            <span
              className="relative inline-flex rounded-full h-2 w-2"
              style={{ backgroundColor: "var(--success)" }}
            />
          </span>
          <span className="font-mono text-xs tracking-widest uppercase text-muted-foreground">
            Available Now
          </span>
        </div>

        <h2 className="text-2xl font-bold">{proposalData.cta.headline}</h2>
        <p className="text-sm text-muted-foreground max-w-md mx-auto leading-relaxed">
          {proposalData.cta.subtext}
        </p>
        <p className="font-mono text-xs text-muted-foreground/70">
          {proposalData.cta.availability}
        </p>

        <div className="pt-2">
          <a
            href="https://www.upwork.com/freelancers/humam"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button size="lg">Start the Conversation</Button>
          </a>
        </div>

        {/* Signature */}
        <p className="pt-4 text-sm text-muted-foreground border-t border-border/60 mt-4">
          — Humam
        </p>
      </section>

    </div>
  );
}
