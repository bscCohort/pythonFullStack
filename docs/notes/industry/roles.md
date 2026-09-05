# Roles and job titles

**A domain is what you work on. A role is what you are called and which slice you own.**

The titles are inconsistent across companies, sometimes deliberately. What follows is what they
usually mean.

<svg viewBox="0 0 660 340" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto">
  <defs>
    <marker id="ro-b" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto"><polygon points="0 0, 8 3, 0 6" fill="#4051b5"/></marker>
    <marker id="ro-o" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto"><polygon points="0 0, 8 3, 0 6" fill="#f59e0b"/></marker>
  </defs>
  <text x="330" y="20" text-anchor="middle" font-size="11" font-weight="700" fill="currentColor">One system. Every role owns a slice of it.</text>
  <rect x="150" y="36" width="270" height="40" rx="5" fill="none" stroke="#4051b5" stroke-width="2"/>
  <text x="285" y="55" text-anchor="middle" font-size="11" font-weight="600" fill="currentColor">the screen</text>
  <text x="285" y="69" text-anchor="middle" font-size="9" fill="#94a3b8">React, CSS, accessibility</text>
  <text x="440" y="52" font-size="10" font-weight="700" fill="#4051b5">UI / Frontend Engineer</text>
  <text x="440" y="68" font-size="9" fill="#94a3b8">also Design Engineer</text>
  <rect x="150" y="88" width="270" height="40" rx="5" fill="none" stroke="#4051b5" stroke-width="2"/>
  <text x="285" y="107" text-anchor="middle" font-size="11" font-weight="600" fill="currentColor">the rules and the API</text>
  <text x="285" y="121" text-anchor="middle" font-size="9" fill="#94a3b8">FastAPI, validation, auth</text>
  <text x="440" y="104" font-size="10" font-weight="700" fill="#4051b5">Backend Engineer / SDE</text>
  <text x="440" y="120" font-size="9" fill="#94a3b8">both slices = Full Stack</text>
  <rect x="150" y="140" width="270" height="40" rx="5" fill="none" stroke="#94a3b8" stroke-width="1.5"/>
  <text x="285" y="159" text-anchor="middle" font-size="11" font-weight="600" fill="currentColor">the data</text>
  <text x="285" y="173" text-anchor="middle" font-size="9" fill="#94a3b8">Postgres, pipelines, models</text>
  <text x="440" y="156" font-size="10" font-weight="700" fill="currentColor">Data / ML Engineer</text>
  <text x="440" y="172" font-size="9" fill="#94a3b8">Data Scientist analyses it</text>
  <rect x="150" y="192" width="270" height="40" rx="5" fill="none" stroke="#f59e0b" stroke-width="2"/>
  <text x="285" y="211" text-anchor="middle" font-size="11" font-weight="600" fill="currentColor">what it all runs on</text>
  <text x="285" y="225" text-anchor="middle" font-size="9" fill="#94a3b8">Kubernetes, CI, monitoring</text>
  <text x="440" y="208" font-size="10" font-weight="700" fill="#f59e0b">SRE / DevOps / Platform</text>
  <text x="440" y="224" font-size="9" fill="#94a3b8">keeps it up at 3am</text>
  <rect x="24" y="36" width="104" height="196" rx="5" fill="none" stroke="#e11d48" stroke-width="2" stroke-dasharray="5 4"/>
  <text x="76" y="120" text-anchor="middle" font-size="10" font-weight="700" fill="#e11d48">QA</text>
  <text x="76" y="140" text-anchor="middle" font-size="10" font-weight="700" fill="#e11d48">Security</text>
  <text x="76" y="164" text-anchor="middle" font-size="9" fill="#94a3b8">cut across</text>
  <text x="76" y="178" text-anchor="middle" font-size="9" fill="#94a3b8">every layer</text>
  <path d="M285 76 V88" stroke="#4051b5" stroke-width="2" marker-end="url(#ro-b)"/>
  <path d="M285 128 V140" stroke="#4051b5" stroke-width="2" marker-end="url(#ro-b)"/>
  <path d="M285 180 V192" stroke="#f59e0b" stroke-width="2" marker-end="url(#ro-o)"/>
  <circle r="6" fill="#e11d48"><animateMotion dur="3.2s" repeatCount="indefinite" path="M285 36 V232"/></circle>
  <text x="330" y="266" text-anchor="middle" font-size="10" font-weight="600" fill="currentColor">One request crosses every slice. That is why roles argue about boundaries.</text>
  <text x="330" y="292" text-anchor="middle" font-size="10" fill="#64748b">In a startup, one person owns all four boxes and the title is just "Engineer".</text>
  <text x="330" y="312" text-anchor="middle" font-size="10" fill="#64748b">In a large company, each box is a separate team with its own manager.</text>
</svg>

---

## Building roles

| Title | What they own | Also called |
|---|---|---|
| **SDE / Software Engineer** | the generic title. Could mean anything | SWE, Developer, Programmer |
| **Frontend Engineer** | the screen, browser behaviour, state | Client Engineer |
| **UI Engineer** | frontend, but closer to design. Component libraries, design systems, pixel accuracy, accessibility | Design Engineer, UX Engineer |
| **Backend Engineer** | APIs, business rules, databases | Server Engineer |
| **Full Stack Engineer** | both. Common in startups, rarer at scale | |
| **Mobile Engineer** | the phone app | Android / iOS Engineer |
| **Embedded Engineer** | firmware on a device | Firmware Engineer |
| **Game Developer** | gameplay, engine, graphics | Gameplay / Engine Programmer |

!!! note "UI Engineer versus Frontend Engineer"
    Overlapping, and the difference is real where both exist. A **Frontend Engineer** is judged on
    application architecture, state management and performance. A **UI Engineer** is judged on how
    the interface looks and feels: the design system, animation, accessibility, and whether it
    matches the designer's intent exactly.

    If you enjoyed the Tailwind and component part of your project more than the endpoints, this is
    your row.

---

## Running roles

The domain where the titles are most confused, because three of them overlap heavily.

| Title | What they own | The distinction |
|---|---|---|
| **SRE** | reliability as an engineering problem. Error budgets, SLOs, on call, incident response | Writes software to avoid operating things by hand |
| **DevOps Engineer** | CI/CD pipelines, deployment, automation | Often means "the person who owns the pipeline" |
| **Platform Engineer** | internal tooling other engineers build on | Their users are colleagues, not customers |
| **Cloud Engineer** | AWS or GCP infrastructure, networking, cost | Closer to infrastructure than to code |
| **Infrastructure Engineer** | servers, networks, the layer under everything | Older name, still common |

!!! tip "The honest version"
    At most companies these four are the same job with different words, and the title depends on
    who wrote the advert. The genuine distinction is **SRE originated at Google as a software
    engineering role applied to operations**, which is why SRE interviews often include the same
    coding rounds as SDE ones.

    Read the responsibilities, never the title.

---

## Data and AI roles

| Title | What they own | Maths needed |
|---|---|---|
| **Data Engineer** | pipelines, warehouses, making data trustworthy | low. Mostly SQL and engineering |
| **Analytics Engineer** | turning raw tables into ones the business can use | low |
| **Data Analyst** | answering questions with data, dashboards | some statistics |
| **Data Scientist** | experiments, statistics, models that inform decisions | high |
| **ML Engineer** | putting models into production and keeping them there | medium |
| **AI Engineer** | building products on top of existing models, APIs, prompts, retrieval | low to medium |
| **MLOps Engineer** | the pipeline that trains, deploys and monitors models | medium |
| **Research Scientist** | inventing new methods. Usually requires a PhD | very high |

**AI Engineer is the newest title here and the most accessible.** It mostly means backend
engineering against a model API, which is much closer to what you have already built than to
research.

---

## Quality and security roles

| Title | What they own |
|---|---|
| **QA Engineer** | testing, manual and automated |
| **SDET** | writing the automation. A developer whose product is the test suite |
| **Performance Engineer** | load testing, latency, capacity |
| **Security Engineer** | defending systems, reviewing designs |
| **Application Security** | finding and fixing vulnerabilities in code |
| **Penetration Tester** | breaking things with permission |

---

## Adjacent roles you will work with daily

Not writing production code, and often paid comparably.

| Title | What they do |
|---|---|
| **Engineering Manager** | the people, not the code. See [levels](levels.md) |
| **Product Manager** | decides what gets built and why |
| **Designer** | how it looks and how it should behave |
| **Solutions / Cloud Architect** | designs systems, often pre-sales |
| **Technical Writer** | documentation. This site is that job |
| **Developer Advocate** | talks and demos, half engineer half marketing |
| **Support Engineer** | debugs customer problems. **A genuinely common route in** |

---

## How to read a job advert

The title is nearly meaningless. Three things are not:

<ol class="steps">
  <li><strong>The responsibilities list.</strong> This is the actual job.</li>
  <li><strong>The tech stack.</strong> Tells you what you would touch daily.</li>
  <li><strong>Who you report to.</strong> An "SRE" reporting to IT is an operations job. Reporting to Engineering is a software job.</li>
</ol>

!!! warning "Two titles worth extra scrutiny"
    **"Full Stack Engineer"** at a company of eight can mean frontend, backend, deploys, database
    and support. Sometimes excellent for learning, sometimes just understaffing.

    **"DevOps Engineer"** sometimes means genuine platform engineering, and sometimes means being
    the only person allowed to press deploy. Ask what they built last quarter.

---

## Going further

- [Domains of engineering](domains.md), for what you would work on
- [Levels and the ladder](levels.md) &#183; [Money](compensation.md) &#183; [How to get in](getting-hired.md)
