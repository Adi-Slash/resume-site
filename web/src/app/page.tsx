import Link from "next/link";

const impactMetrics = [
  { label: "Years in software delivery", value: "30+" },
  { label: "Years shaping architecture", value: "15+" },
  { label: "High-stakes exam papers processed", value: "Millions" },
  { label: "Board-level strategy and delivery", value: "Proven" }
];

const careerJourney = [
  {
    title: "Lead Architect",
    company: "AQA Architecture and Innovation",
    period: "Apr 2022 - Present",
    highlights: [
      "Leading architecture and innovation initiatives across education products",
      "Driving Azure PaaS modernization and cloud-optimized design patterns",
      "Partnering with senior stakeholders from strategy through delivery"
    ]
  },
  {
    title: "Product Architect",
    company: "DRS Data Services",
    period: "Jan 2015 - May 2022",
    highlights: [
      "Owned product architecture for large-scale, high-reliability platforms",
      "Balanced security, scalability, and extensibility across strategic systems",
      "Worked hands-on when needed to unblock complex technical delivery"
    ]
  },
  {
    title: "Solutions Architect",
    company: "DRS Data Services",
    period: "Mar 2010 - Feb 2015",
    highlights: [
      "Architected next-generation online exam marking products at national scale",
      "Delivered architecture for election systems used in high-profile outcomes",
      "Led performance, security, and stakeholder-aligned proof-of-concept work"
    ]
  },
  {
    title: "Technical Leadership and Senior Development Roles",
    company: "DRS, Webdev Consulting, National Mutual Life",
    period: "1991 - 2010",
    highlights: [
      "Managed and mentored multidisciplinary teams and outsourced groups",
      "Delivered mission-critical systems, automation, and reusable quality tooling",
      "Built a foundation in end-to-end software delivery and enterprise design"
    ]
  }
];

const certifications = [
  "Microsoft Certified: Azure Solutions Architect Expert",
  "Microsoft Certified Solutions Developer (MCSD)",
  "Microsoft Certified Professional (MCP) - Windows Applications"
];

const topSkills = ["Solution Architecture", "Enterprise Architecture", "Microsoft Azure"];

const futurePortfolio = [
  {
    title: "Cloud Modernization Blueprint",
    description:
      "Reference architecture and migration patterns for modernizing legacy estates on Azure PaaS.",
    status: "Planned case study"
  },
  {
    title: "Assessment Platform at Scale",
    description:
      "Deep-dive into resilient exam-marking platforms designed for strict performance and reliability targets.",
    status: "Planned case study"
  },
  {
    title: "Election Systems Delivery",
    description:
      "Architecture story focused on secure, auditable workflows for high-profile election processing.",
    status: "Planned case study"
  }
];

export default function Home() {
  return (
    <main className="site-shell">
      <div className="ambient ambient-a" aria-hidden />
      <div className="ambient ambient-b" aria-hidden />

      <header className="top-nav">
        <p className="brand">Adrian Kolek</p>
        <nav>
          <a href="#about">About</a>
          <a href="#journey">Journey</a>
          <a href="#portfolio">Portfolio</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <section className="hero">
        <p className="eyebrow">Lead Architect | Azure Modernization Specialist</p>
        <h1>Enterprise architecture with edge, precision, and measurable impact.</h1>
        <p className="hero-copy">
          I design and deliver secure, scalable, cloud-optimized solutions that move from strategic
          vision to production reality. My focus: architecture that creates genuine business value.
        </p>
        <div className="cta-row">
          <a className="btn btn-primary" href="#journey">
            Explore Career Journey
          </a>
          <Link className="btn btn-secondary" href="/portfolio">
            Future Portfolio
          </Link>
          <a
            className="btn btn-ghost"
            href="https://www.linkedin.com/in/adrian-kolek-8479296/"
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn
          </a>
        </div>
      </section>

      <section id="about" className="panel">
        <div className="section-header">
          <p className="eyebrow">About Me</p>
          <h2>Architect, strategist, mentor, and hands-on problem solver.</h2>
        </div>
        <div className="two-col">
          <p>
            I am an accomplished architect with extensive software engineering experience across
            global partners and high-stakes domains. I specialize in Azure PaaS modernization and
            migration patterns, with an emphasis on robust architecture and sustainable delivery.
          </p>
          <p>
            I am comfortable operating from board-level strategy through to delivery execution. I
            care deeply about quality, cost, user experience, and helping teams level up through
            mentorship and practical leadership.
          </p>
        </div>
        <div className="metrics-grid">
          {impactMetrics.map((metric) => (
            <article key={metric.label} className="metric-card">
              <p className="metric-value">{metric.value}</p>
              <p className="metric-label">{metric.label}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="journey" className="panel">
        <div className="section-header">
          <p className="eyebrow">Career Journey</p>
          <h2>From software engineering foundations to strategic architecture leadership.</h2>
        </div>

        <div className="timeline">
          {careerJourney.map((role) => (
            <article key={`${role.title}-${role.period}`} className="timeline-card">
              <p className="timeline-period">{role.period}</p>
              <h3>{role.title}</h3>
              <p className="timeline-company">{role.company}</p>
              <ul>
                {role.highlights.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="panel split-panel">
        <article>
          <p className="eyebrow">Top Skills</p>
          <h3>Core capability stack</h3>
          <ul className="pill-list">
            {topSkills.map((skill) => (
              <li key={skill}>{skill}</li>
            ))}
          </ul>
        </article>
        <article>
          <p className="eyebrow">Certifications</p>
          <h3>Credentials</h3>
          <ul className="detail-list">
            {certifications.map((cert) => (
              <li key={cert}>{cert}</li>
            ))}
          </ul>
        </article>
      </section>

      <section id="portfolio" className="panel">
        <div className="section-header">
          <p className="eyebrow">Portfolio (Future)</p>
          <h2>Selected architecture stories and implementation blueprints.</h2>
        </div>
        <div className="portfolio-grid">
          {futurePortfolio.map((item) => (
            <article key={item.title} className="portfolio-card">
              <p className="status-chip">{item.status}</p>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <Link href="/portfolio" className="text-link">
                View roadmap
              </Link>
            </article>
          ))}
        </div>
      </section>

      <footer id="contact" className="site-footer">
        <p>Open to architecture leadership, advisory, and transformation conversations.</p>
        <div>
          <a href="mailto:adrian.kolek@icloud.com">adrian.kolek@icloud.com</a>
          <a href="https://www.linkedin.com/in/adrian-kolek-8479296/" target="_blank" rel="noreferrer">
            LinkedIn Profile
          </a>
        </div>
      </footer>
    </main>
  );
}
