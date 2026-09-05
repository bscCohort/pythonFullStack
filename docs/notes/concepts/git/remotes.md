# Remotes

**`origin` is a nickname for a URL. Nothing more.**

```bash
git remote -v
origin  git@github-bsccohort:bscCohort/pythonFullStack.git (fetch)
origin  git@github-bsccohort:bscCohort/pythonFullStack.git (push)
```

That is this project's real remote. `origin` is a habit, not a keyword. You could call it
`github` or `backup` and everything would work.

---

## Three commands, and only one of them touches your files

<svg viewBox="0 0 660 290" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto">
  <defs>
    <marker id="r-b" markerWidth="9" markerHeight="7" refX="8" refY="3.5" orient="auto"><polygon points="0 0, 9 3.5, 0 7" fill="#4051b5"/></marker>
    <marker id="r-o" markerWidth="9" markerHeight="7" refX="8" refY="3.5" orient="auto"><polygon points="0 0, 9 3.5, 0 7" fill="#f59e0b"/></marker>
    <marker id="r-g" markerWidth="9" markerHeight="7" refX="8" refY="3.5" orient="auto"><polygon points="0 0, 9 3.5, 0 7" fill="#16a34a"/></marker>
  </defs>
  <rect x="16" y="96" width="150" height="70" rx="6" fill="none" stroke="#4051b5" stroke-width="2"/>
  <text x="91" y="122" text-anchor="middle" font-size="12" font-weight="600" fill="currentColor">your files</text>
  <text x="91" y="140" text-anchor="middle" font-size="9" fill="#94a3b8">what you see</text>
  <rect x="248" y="96" width="164" height="70" rx="6" fill="none" stroke="#f59e0b" stroke-width="2"/>
  <text x="330" y="118" text-anchor="middle" font-size="12" font-weight="600" fill="currentColor">origin/main</text>
  <text x="330" y="136" text-anchor="middle" font-size="9" fill="#94a3b8">a local note saying</text>
  <text x="330" y="150" text-anchor="middle" font-size="9" fill="#94a3b8">"GitHub was here last I looked"</text>
  <rect x="494" y="96" width="150" height="70" rx="6" fill="none" stroke="#94a3b8" stroke-width="1.5"/>
  <text x="569" y="122" text-anchor="middle" font-size="12" font-weight="600" fill="currentColor">GitHub</text>
  <text x="569" y="140" text-anchor="middle" font-size="9" fill="#94a3b8">the actual server</text>
  <path d="M91 96 V62 H569 V96" stroke="#4051b5" stroke-width="2" fill="none" marker-end="url(#r-b)"/>
  <text x="330" y="54" text-anchor="middle" font-size="10" font-weight="600" fill="#4051b5">push &#183; send my commits up</text>
  <path d="M494 131 H412" stroke="#f59e0b" stroke-width="2" fill="none" marker-end="url(#r-o)"/>
  <text x="453" y="186" text-anchor="middle" font-size="10" font-weight="600" fill="#f59e0b">fetch</text>
  <text x="453" y="200" text-anchor="middle" font-size="9" fill="#94a3b8">updates the note only</text>
  <path d="M248 131 H166" stroke="#16a34a" stroke-width="2" fill="none" marker-end="url(#r-g)"/>
  <text x="207" y="186" text-anchor="middle" font-size="10" font-weight="600" fill="#16a34a">merge</text>
  <text x="207" y="200" text-anchor="middle" font-size="9" fill="#94a3b8">changes your files</text>
  <circle r="6" fill="#e11d48"><animateMotion dur="3.6s" repeatCount="indefinite" path="M91 96 V62 H569 V96"/></circle>
  <circle r="6" fill="#16a34a"><animateMotion dur="3.6s" begin="1.8s" repeatCount="indefinite" path="M569 131 H91"/></circle>
  <text x="330" y="266" text-anchor="middle" font-size="10" font-weight="600" fill="currentColor">git pull = fetch + merge, in one step.</text>
  <text x="330" y="284" text-anchor="middle" font-size="10" fill="#64748b">That is the whole difference, and it is why pull can produce a conflict but fetch never can.</text>
</svg>

---

## When to use which

| Command | Does | Safe? |
|---|---|---|
| `git fetch` | updates the orange note. Touches nothing you can see | **always safe** |
| `git pull` | fetch, then merge into your files | can conflict |
| `git push` | sends your commits to GitHub | rejected if GitHub moved ahead |

If you are unsure what happened on GitHub, `git fetch` then `git log origin/main --oneline`.
You are now informed and nothing has changed.

---

## The rejection you will hit

```
! [rejected]  main -> main (fetch first)
```

Somebody pushed while you were working, so your history and GitHub's have diverged. **Pull
first, then push.**

!!! danger "Never reach for --force"
    `git push --force` overwrites what is on GitHub, including commits other people made. On a
    shared branch it destroys their work with no undo.

    If push is rejected, `git pull` is almost always the answer.

---

## The remote is your backup, and that is the point

Your laptop can be stolen, dropped or wiped. **A commit that has never been pushed exists in
exactly one place.**

Push at the end of every session, even if the work is unfinished. That is what branches are
for: unfinished work on a branch harms nobody.

---

## Going further

- [Commits](commits.md) &#183; [Branches](branches.md) &#183; [Pull requests](pull-requests.md)
- `git remote -v`, then compare it with the URL in your browser's address bar
