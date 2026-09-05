# Domains of engineering

**A domain is what kind of software you work on.** It is not your job title, which is a separate
and messier question covered in [roles](roles.md).

The domains differ mainly in **where the code runs**, and that one fact explains most of the
tooling and most of what your day feels like.

<svg viewBox="0 0 660 340" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto">
  <defs>
    <marker id="dm-b" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto"><polygon points="0 0, 8 3, 0 6" fill="#4051b5"/></marker>
    <marker id="dm-g" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto"><polygon points="0 0, 8 3, 0 6" fill="#94a3b8"/></marker>
  </defs>
  <rect x="14" y="130" width="140" height="76" rx="8" fill="none" stroke="#4051b5" stroke-width="2"/>
  <text x="84" y="158" text-anchor="middle" font-size="12" font-weight="700" fill="#4051b5">the same</text>
  <text x="84" y="176" text-anchor="middle" font-size="12" font-weight="700" fill="#4051b5">fundamentals</text>
  <text x="84" y="196" text-anchor="middle" font-size="9" fill="#94a3b8">loops, data, debugging</text>
  <text x="420" y="20" text-anchor="middle" font-size="10" font-weight="700" fill="#64748b">grouped by where it runs</text>
  <rect x="300" y="32" width="346" height="30" rx="5" fill="none" stroke="#4051b5" stroke-width="2"/>
  <text x="314" y="52" font-size="10" font-weight="600" fill="currentColor">Web</text>
  <text x="636" y="51" text-anchor="end" font-size="9" fill="#94a3b8">a browser</text>
  <rect x="300" y="68" width="346" height="30" rx="5" fill="none" stroke="#94a3b8" stroke-width="1.5"/>
  <text x="314" y="88" font-size="10" font-weight="600" fill="currentColor">Mobile</text>
  <text x="636" y="87" text-anchor="end" font-size="9" fill="#94a3b8">a phone</text>
  <rect x="300" y="104" width="346" height="30" rx="5" fill="none" stroke="#94a3b8" stroke-width="1.5"/>
  <text x="314" y="124" font-size="10" font-weight="600" fill="currentColor">Desktop</text>
  <text x="636" y="123" text-anchor="end" font-size="9" fill="#94a3b8">their machine</text>
  <rect x="300" y="140" width="346" height="30" rx="5" fill="none" stroke="#94a3b8" stroke-width="1.5"/>
  <text x="314" y="160" font-size="10" font-weight="600" fill="currentColor">Cloud and infrastructure</text>
  <text x="636" y="159" text-anchor="end" font-size="9" fill="#94a3b8">someone else's servers</text>
  <rect x="300" y="176" width="346" height="30" rx="5" fill="none" stroke="#4051b5" stroke-width="2"/>
  <text x="314" y="196" font-size="10" font-weight="600" fill="currentColor">Data and AI</text>
  <text x="636" y="195" text-anchor="end" font-size="9" fill="#94a3b8">a GPU, then an API</text>
  <rect x="300" y="212" width="346" height="30" rx="5" fill="none" stroke="#94a3b8" stroke-width="1.5"/>
  <text x="314" y="232" font-size="10" font-weight="600" fill="currentColor">Games</text>
  <text x="636" y="231" text-anchor="end" font-size="9" fill="#94a3b8">60 times a second</text>
  <rect x="300" y="248" width="346" height="30" rx="5" fill="none" stroke="#94a3b8" stroke-width="1.5"/>
  <text x="314" y="268" font-size="10" font-weight="600" fill="currentColor">Embedded and hardware</text>
  <text x="636" y="267" text-anchor="end" font-size="9" fill="#94a3b8">a bare chip</text>
  <rect x="300" y="284" width="346" height="30" rx="5" fill="none" stroke="#94a3b8" stroke-width="1.5"/>
  <text x="314" y="304" font-size="10" font-weight="600" fill="currentColor">Systems and security</text>
  <text x="636" y="303" text-anchor="end" font-size="9" fill="#94a3b8">under everything else</text>
  <path d="M154 168 C 240 168, 250 47, 300 47" stroke="#4051b5" stroke-width="2" fill="none" marker-end="url(#dm-b)"/>
  <path d="M154 168 C 240 168, 250 83, 300 83" stroke="#94a3b8" stroke-width="1.5" fill="none" marker-end="url(#dm-g)"/>
  <path d="M154 168 C 240 168, 250 119, 300 119" stroke="#94a3b8" stroke-width="1.5" fill="none" marker-end="url(#dm-g)"/>
  <path d="M154 168 C 240 168, 250 155, 300 155" stroke="#94a3b8" stroke-width="1.5" fill="none" marker-end="url(#dm-g)"/>
  <path d="M154 168 C 240 168, 250 191, 300 191" stroke="#4051b5" stroke-width="2" fill="none" marker-end="url(#dm-b)"/>
  <path d="M154 168 C 240 168, 250 227, 300 227" stroke="#94a3b8" stroke-width="1.5" fill="none" marker-end="url(#dm-g)"/>
  <path d="M154 168 C 240 168, 250 263, 300 263" stroke="#94a3b8" stroke-width="1.5" fill="none" marker-end="url(#dm-g)"/>
  <path d="M154 168 C 240 168, 250 299, 300 299" stroke="#94a3b8" stroke-width="1.5" fill="none" marker-end="url(#dm-g)"/>
  <circle r="6" fill="#e11d48"><animateMotion dur="2.6s" repeatCount="indefinite" path="M84 168 C 240 168, 250 47, 330 47"/></circle>
  <circle r="6" fill="#e11d48"><animateMotion dur="2.6s" begin="0.65s" repeatCount="indefinite" path="M84 168 C 240 168, 250 155, 330 155"/></circle>
  <circle r="6" fill="#e11d48"><animateMotion dur="2.6s" begin="1.3s" repeatCount="indefinite" path="M84 168 C 240 168, 250 191, 330 191"/></circle>
  <circle r="6" fill="#e11d48"><animateMotion dur="2.6s" begin="1.95s" repeatCount="indefinite" path="M84 168 C 240 168, 250 299, 330 299"/></circle>
  <text x="330" y="332" text-anchor="middle" font-size="10" fill="#64748b">One left box. Switching domains does not reset your career.</text>
</svg>

---

## All of them, side by side

The **feedback loop** column predicts your day more accurately than the language does.

| Domain | What you build | Languages | Ships as | Feedback loop |
|---|---|---|---|---|
| **Web** | sites, dashboards, SaaS | JS, Python, Java, Go | a URL | seconds |
| **Mobile** | phone apps | Kotlin, Swift, Dart | an app store review | days |
| **Desktop** | installed software | C#, C++, JS | an installer | a release cycle |
| **Cloud and infra** | the platform others deploy to | Go, Python, YAML, Terraform | a running system | minutes |
| **Data** | pipelines, warehouses, reports | Python, SQL, Scala | a table others query | hours |
| **AI and ML** | models, and things that call them | Python | a model plus an API | hours per experiment |
| **Games** | games, simulation, VR | C#, C++ | a build | seconds, then months of polish |
| **Embedded** | firmware for physical devices | C, C++, Rust | a physical device | minutes, plus a cable |
| **Systems** | databases, compilers, kernels | C, C++, Rust, Go | a library or binary | minutes |
| **Security** | breaking and defending the above | Python, Go, C | a report, or a fix | varies wildly |
| **Quality** | proving it works | Python, JS, Java | a test suite and a verdict | minutes |

---

## The four biggest, in a bit more detail

### Web

Where most jobs are, and what you have built. Splits three ways in practice: **frontend** (what
people see), **backend** (rules and data), **full stack** (both). The hard part is not the code,
it is the number of moving pieces in a single feature.

**Start here if unsure.** Not because it pays best, but because the feedback loop is shortest and
the free material is best, so the transferable skills arrive fastest.

### Cloud and infrastructure

You build the thing other engineers deploy onto. Kubernetes, CI pipelines, Terraform, monitoring,
and being the person who finds out why production is slow.

Growing fast, pays well, and **hard to enter straight from college** because it rewards having
already operated something. Your Render and Vercel deploys are the first inch of it.

### Data and AI

Two related domains people conflate.

**Data engineering** moves data reliably from where it is created to where it is analysed. Mostly
SQL and Python, and mostly unglamorous plumbing that everything else depends on.

**AI and ML** trains models and, more commonly now, **builds products on top of models somebody
else trained.** That second half is much closer to backend web work than to research, and it is
where most of the hiring is.

### Security

Two halves. **Offensive** work breaks things on purpose: penetration testing, bug bounties.
**Defensive** work is application security, reviewing code and designing systems that fail safely.

You cannot secure a system you do not understand, so almost nobody starts here. Two or three
years of building first is the normal path.

---

## Honest advice on choosing

You mostly do not have to. **Every one of these hires people who arrived from web development**,
and the reverse is much rarer.

Two things transfer everywhere, and neither is a language:

- **Debugging**, which is the actual job
- **Reading code you did not write**, which is most of your first year

!!! tip "The trap to avoid"
    Picking a domain because it pays most today. Cloud paid unusually well five years ago, AI does
    now, and something else will next. **Chasing the peak means always arriving late.** Pick
    something you will still open on a Sunday, then get genuinely good, because seniority pays more
    than fashion.

---

## Going further

- [Roles and job titles](roles.md), for what you would actually be called
- [Levels and the ladder](levels.md) &#183; [Kinds of company](company-types.md)
- [roadmap.sh](https://roadmap.sh/) has a real curriculum for nearly every row of that table
