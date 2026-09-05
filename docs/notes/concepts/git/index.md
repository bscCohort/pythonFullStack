# Git and GitHub

**Git is a program on your laptop. GitHub is a website that keeps a copy.**

They are separate things with confusingly similar names. Git was useful for years before
GitHub existed, and you can use git all day with the wifi off.

<svg viewBox="0 0 660 260" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto">
  <defs>
    <marker id="g-b" markerWidth="9" markerHeight="7" refX="8" refY="3.5" orient="auto"><polygon points="0 0, 9 3.5, 0 7" fill="#4051b5"/></marker>
    <marker id="g-g" markerWidth="9" markerHeight="7" refX="8" refY="3.5" orient="auto"><polygon points="0 0, 9 3.5, 0 7" fill="#94a3b8"/></marker>
  </defs>
  <rect x="16" y="30" width="270" height="150" rx="8" fill="none" stroke="#4051b5" stroke-width="2"/>
  <text x="151" y="54" text-anchor="middle" font-size="12" font-weight="700" fill="#4051b5">YOUR LAPTOP</text>
  <text x="151" y="74" text-anchor="middle" font-size="10" fill="#94a3b8">git, a program. works offline</text>
  <circle cx="66"  cy="120" r="13" fill="none" stroke="#4051b5" stroke-width="2"/>
  <circle cx="122" cy="120" r="13" fill="none" stroke="#4051b5" stroke-width="2"/>
  <circle cx="178" cy="120" r="13" fill="none" stroke="#4051b5" stroke-width="2"/>
  <circle cx="234" cy="120" r="13" fill="#4051b5"/>
  <path d="M79 120 H109" stroke="#94a3b8" stroke-width="1.5"/>
  <path d="M135 120 H165" stroke="#94a3b8" stroke-width="1.5"/>
  <path d="M191 120 H221" stroke="#94a3b8" stroke-width="1.5"/>
  <text x="234" y="160" text-anchor="middle" font-size="9" fill="#94a3b8">your whole history</text>
  <rect x="380" y="30" width="266" height="150" rx="8" fill="none" stroke="#94a3b8" stroke-width="1.5"/>
  <text x="513" y="54" text-anchor="middle" font-size="12" font-weight="700" fill="#64748b">GITHUB</text>
  <text x="513" y="74" text-anchor="middle" font-size="10" fill="#94a3b8">a website. needs the internet</text>
  <circle cx="432" cy="120" r="13" fill="none" stroke="#94a3b8" stroke-width="1.5"/>
  <circle cx="488" cy="120" r="13" fill="none" stroke="#94a3b8" stroke-width="1.5"/>
  <circle cx="544" cy="120" r="13" fill="none" stroke="#94a3b8" stroke-width="1.5"/>
  <path d="M445 120 H475" stroke="#cbd5e1" stroke-width="1.5"/>
  <path d="M501 120 H531" stroke="#cbd5e1" stroke-width="1.5"/>
  <text x="513" y="160" text-anchor="middle" font-size="9" fill="#94a3b8">a copy, one commit behind</text>
  <path d="M286 96 H380" stroke="#4051b5" stroke-width="2" fill="none" marker-end="url(#g-b)"/>
  <path d="M380 150 H286" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4 3" fill="none" marker-end="url(#g-g)"/>
  <text x="331" y="88" text-anchor="middle" font-size="10" font-weight="600" fill="#4051b5">push</text>
  <text x="331" y="168" text-anchor="middle" font-size="10" font-weight="600" fill="#64748b">pull</text>
  <circle r="6" fill="#e11d48"><animateMotion dur="3s" repeatCount="indefinite" path="M234 120 V96 H432 V120"/></circle>
  <text x="330" y="220" text-anchor="middle" font-size="10" fill="#64748b">Everything happens on the left. GitHub only receives what you send it.</text>
  <text x="330" y="242" text-anchor="middle" font-size="10" fill="#64748b">Nothing in that box on the right is automatic.</text>
</svg>

---

## Which does what

| Job | Git | GitHub |
|---|---|---|
| save a version | yes | no |
| see history | yes | shows it prettily |
| work offline | yes | no |
| back up your work | no | **yes, this is the point** |
| let others review | no | yes, pull requests |
| run tests on every push | no | yes, Actions |

Git alone means one copy on one laptop. **Lose the laptop, lose the project.** That is the
problem GitHub solves, and everything else it offers is a bonus.

---

## Four commands cover most days

```bash
git status                    # what have I changed?
git add .                     # mark it for the next save
git commit -m "add sorting"   # save it, locally
git push                      # send it to GitHub
```

`status` before every other command. It tells you which of the three places your work is
sitting in, and almost every git confusion is being wrong about that.

---

## The one habit worth building now

Commit when something **works**, not when you finish for the day. A commit you can return to
is worth ten you cannot describe.

This project's real history has two commits called `refactor profiles controller` and
`refactor profile controller`, one letter apart. Neither tells you anything. Do better than
the person who wrote those.

---

## Going further

- [Commits](commits.md) &#183; [Branches](branches.md) &#183; [Remotes](remotes.md)
- [Pull requests](pull-requests.md) &#183; [When it goes wrong](when-it-goes-wrong.md)
- [learngitbranching.js.org](https://learngitbranching.js.org/), the best hour you can spend
  on git
