import Link from "next/link";

const roadmapItems = [
  {
    title: "Azure PaaS Modernization Playbook",
    timeline: "Q2 2026",
    detail:
      "A practical transformation guide for re-platforming enterprise workloads with clear architecture decision records."
  },
  {
    title: "Digital Assessment Architecture Story",
    timeline: "Q3 2026",
    detail:
      "How to design for reliability and throughput in high-volume educational assessment systems."
  },
  {
    title: "Election Workflow Engineering Deep Dive",
    timeline: "Q4 2026",
    detail:
      "Security-focused architecture patterns for trusted, transparent processing at civic scale."
  }
];

export default function PortfolioPage() {
  return (
    <main className="site-shell site-shell-inner">
      <div className="ambient ambient-a" aria-hidden />
      <header className="top-nav">
        <p className="brand">Adrian Kolek</p>
        <nav>
          <Link href="/">Home</Link>
          <a href="mailto:adrian.kolek@icloud.com">Contact</a>
        </nav>
      </header>

      <section className="hero hero-inner">
        <p className="eyebrow">Future Portfolio</p>
        <h1>Architecture case studies are being curated.</h1>
        <p className="hero-copy">
          This area will evolve into a detailed portfolio featuring architecture decisions, outcomes,
          and implementation playbooks.
        </p>
      </section>

      <section className="panel">
        <div className="section-header">
          <p className="eyebrow">Roadmap</p>
          <h2>Planned publications</h2>
        </div>
        <div className="portfolio-grid">
          {roadmapItems.map((item) => (
            <article key={item.title} className="portfolio-card">
              <p className="status-chip">{item.timeline}</p>
              <h3>{item.title}</h3>
              <p>{item.detail}</p>
            </article>
          ))}
        </div>
        <div className="cta-row">
          <Link href="/" className="btn btn-primary">
            Back to homepage
          </Link>
          <a className="btn btn-ghost" href="https://www.linkedin.com/in/adrian-kolek-8479296/" target="_blank" rel="noreferrer">
            Connect on LinkedIn
          </a>
        </div>
      </section>
    </main>
  );
}
