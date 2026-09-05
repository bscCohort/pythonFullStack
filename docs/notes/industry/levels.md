# Levels and the ladder

**As you go up, the instructions get vaguer.** That is the whole ladder in one sentence.

A junior is handed a ticket that already contains the answer. A principal is handed a direction.
A VP is handed a business problem.

<svg viewBox="0 0 660 360" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto">
  <defs>
    <marker id="lv-b" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto"><polygon points="0 0, 8 3, 0 6" fill="#4051b5"/></marker>
    <marker id="lv-o" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto"><polygon points="0 0, 8 3, 0 6" fill="#f59e0b"/></marker>
  </defs>
  <rect x="216" y="308" width="228" height="34" rx="5" fill="none" stroke="#94a3b8" stroke-width="1.5"/>
  <text x="330" y="330" text-anchor="middle" font-size="11" font-weight="600" fill="currentColor">SDE 1 &#183; SRE 1 &#183; Junior</text>
  <rect x="216" y="256" width="228" height="34" rx="5" fill="none" stroke="#94a3b8" stroke-width="1.5"/>
  <text x="330" y="278" text-anchor="middle" font-size="11" font-weight="600" fill="currentColor">SDE 2 &#183; SRE 2</text>
  <rect x="216" y="204" width="228" height="34" rx="5" fill="none" stroke="#4051b5" stroke-width="2"/>
  <text x="330" y="226" text-anchor="middle" font-size="11" font-weight="700" fill="#4051b5">SDE 3 &#183; SRE 3 &#183; Senior</text>
  <text x="330" y="184" text-anchor="middle" font-size="10" font-weight="700" fill="#e11d48">the fork &#183; you choose here</text>
  <rect x="24" y="126" width="270" height="34" rx="5" fill="none" stroke="#4051b5" stroke-width="2"/>
  <text x="159" y="148" text-anchor="middle" font-size="11" font-weight="600" fill="currentColor">Staff Engineer</text>
  <rect x="24" y="80" width="270" height="34" rx="5" fill="none" stroke="#4051b5" stroke-width="2"/>
  <text x="159" y="102" text-anchor="middle" font-size="11" font-weight="600" fill="currentColor">Principal Engineer</text>
  <rect x="24" y="34" width="270" height="34" rx="5" fill="none" stroke="#94a3b8" stroke-width="1.5"/>
  <text x="159" y="56" text-anchor="middle" font-size="11" font-weight="600" fill="currentColor">Distinguished / Fellow</text>
  <text x="159" y="172" text-anchor="middle" font-size="9" font-weight="700" fill="#4051b5">INDIVIDUAL CONTRIBUTOR</text>
  <rect x="366" y="126" width="270" height="34" rx="5" fill="none" stroke="#f59e0b" stroke-width="2"/>
  <text x="501" y="148" text-anchor="middle" font-size="11" font-weight="600" fill="currentColor">Engineering Manager</text>
  <rect x="366" y="80" width="270" height="34" rx="5" fill="none" stroke="#f59e0b" stroke-width="2"/>
  <text x="501" y="102" text-anchor="middle" font-size="11" font-weight="600" fill="currentColor">Director / Head of X</text>
  <rect x="366" y="34" width="270" height="34" rx="5" fill="none" stroke="#94a3b8" stroke-width="1.5"/>
  <text x="501" y="56" text-anchor="middle" font-size="11" font-weight="600" fill="currentColor">VP Engineering / CTO</text>
  <text x="501" y="172" text-anchor="middle" font-size="9" font-weight="700" fill="#f59e0b">MANAGEMENT</text>
  <path d="M330 308 V290" stroke="#4051b5" stroke-width="2" marker-end="url(#lv-b)"/>
  <path d="M330 256 V238" stroke="#4051b5" stroke-width="2" marker-end="url(#lv-b)"/>
  <path d="M294 204 C 210 204, 200 160, 159 160" stroke="#4051b5" stroke-width="2" fill="none" marker-end="url(#lv-b)"/>
  <path d="M366 204 C 450 204, 460 160, 501 160" stroke="#f59e0b" stroke-width="2" fill="none" marker-end="url(#lv-o)"/>
  <path d="M159 126 V114" stroke="#4051b5" stroke-width="2" marker-end="url(#lv-b)"/>
  <path d="M159 80 V68" stroke="#4051b5" stroke-width="2" marker-end="url(#lv-b)"/>
  <path d="M501 126 V114" stroke="#f59e0b" stroke-width="2" marker-end="url(#lv-o)"/>
  <path d="M501 80 V68" stroke="#f59e0b" stroke-width="2" marker-end="url(#lv-o)"/>
  <circle r="6" fill="#4051b5"><animateMotion dur="4.4s" repeatCount="indefinite" path="M330 342 V204 C 210 204, 200 160, 159 160 V34"/></circle>
  <circle r="6" fill="#f59e0b"><animateMotion dur="4.4s" begin="1.5s" repeatCount="indefinite" path="M330 342 V204 C 450 204, 460 160, 501 160 V34"/></circle>
  <text x="330" y="356" text-anchor="middle" font-size="10" font-weight="600" fill="currentColor">Both branches are paid the same at equivalent height. Management is sideways, not up.</text>
</svg>

---

## The numbered part

Every domain numbers its early rungs the same way. **SDE 1, 2, 3** and **SRE 1, 2, 3** are the
same ladder with a different prefix, and the same is true for Data Engineer and ML Engineer.

| Rung | Years | What you are expected to do alone |
|---|---|---|
| **SDE / SRE 1** | 0 to 2 | finish a well-defined ticket |
| **SDE / SRE 2** | 2 to 5 | ship a whole feature without supervision |
| **SDE / SRE 3, Senior** | 5 to 8 | make design decisions, unblock others, own a service |

At many companies **SDE 3 and Senior are the same rung**, just named differently. This is also
where most careers settle, and that is a perfectly good outcome.

---

## Above senior, individual contributor track

You keep going technically without managing anybody.

| Rung | Years | The shift |
|---|---|---|
| **Staff** | 8 to 12 | work across teams on problems nobody assigned you |
| **Senior Staff** | 10 to 15 | not present at every company |
| **Principal** | 12+ | set technical direction for a large area |
| **Distinguished / Fellow** | 15+ | rare. A handful per company |

The jump from Senior to Staff is the hardest on the ladder, because it is the first where doing
excellent work is not enough. **You have to find the work yourself.**

---

## Above senior, management track

| Rung | Owns | Still codes? |
|---|---|---|
| **Team Lead / Tech Lead** | a small team, often still an IC role | yes |
| **Engineering Manager** | 5 to 10 people, their growth and delivery | rarely |
| **Senior EM / Group Manager** | several teams, or managers | no |
| **Director** | a department. Budget and headcount | no |
| **Senior Director / Head of Engineering** | a large area | no |
| **VP Engineering** | all of engineering, or a major division | no |
| **CTO** | technical strategy for the company | no |

!!! note "What 'Head of X' actually means"
    A **startup title**, and it maps to anywhere from Senior to VP depending on company size.
    "Head of Platform" at a 30-person company is often a Staff Engineer with hiring
    responsibility. At a 3,000-person company it is a Director.

    Ask how many people report to them. That single number tells you more than the title.

---

## The same rung, five different names

Why comparing titles across companies is close to useless.

| Google | Amazon | Microsoft | Meta | Typical India |
|---|---|---|---|---|
| L3 | SDE 1 | SDE | E3 | SDE 1 / Junior |
| L4 | SDE 2 | SDE 2 | E4 | SDE 2 |
| L5 | SDE 3 | Senior | E5 | Senior / SDE 3 |
| L6 | Principal | Principal | E6 | Staff |
| L7 | Senior Principal | Partner | E7 | Principal |

Ignore the word. **Ask what the person is expected to decide without asking anyone.** That is the
only portable measure.

---

## Three things that are true and rarely said

**The company gap beats the rung gap.** A Senior at a services company can earn less than an SDE 2
at a global captive. Where you work matters more than how senior you are.

**Switching beats waiting.** Annual increments run around 8 to 12 percent. Changing company
commonly means 30 to 60 percent. Not a loyalty argument, just the market.

**Nobody feels senior when they get there.** The title arrives before the confidence, every time.

---

## What to say in an interview

Three sentences from your own project, and each one is senior behaviour rather than junior,
because each is **a decision with a reason**:

- *"We replaced SQLite with Postgres and only two files changed, because the database layer was
  isolated."*
- *"Deleting an enrolled student returned a 500. It was a valid request being refused, so I made it
  a 409 with a message telling the caller what to do."*
- *"The API is a contract. We rewrote the entire HTTP layer and React did not change."*

---

## Going further

- [Roles and job titles](roles.md) &#183; [Kinds of company](company-types.md) &#183; [Money](compensation.md)
- [levels.fyi](https://www.levels.fyi/), title mapping and real numbers
- [staffeng.com](https://staffeng.com/), how people actually reached Staff
