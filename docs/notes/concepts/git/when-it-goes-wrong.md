# When it goes wrong

**Almost nothing in git is unrecoverable, as long as you committed.**

The exception is uncommitted work. That is the whole reason to commit often.

---

## Start here, always

```bash
git status
```

It names your situation and usually suggests the command. Most git panic is not knowing which
of the three places your work is in.

<svg viewBox="0 0 660 230" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto">
  <defs>
    <marker id="w-b" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto"><polygon points="0 0, 8 3, 0 6" fill="#4051b5"/></marker>
    <marker id="w-g" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto"><polygon points="0 0, 8 3, 0 6" fill="#16a34a"/></marker>
    <marker id="w-r" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto"><polygon points="0 0, 8 3, 0 6" fill="#e11d48"/></marker>
  </defs>
  <rect x="246" y="16" width="170" height="34" rx="6" fill="none" stroke="#4051b5" stroke-width="2"/>
  <text x="331" y="38" text-anchor="middle" font-size="12" font-weight="600" fill="currentColor">something is wrong</text>
  <rect x="228" y="76" width="206" height="34" rx="6" fill="none" stroke="#94a3b8" stroke-width="1.5"/>
  <text x="331" y="98" text-anchor="middle" font-size="11" fill="currentColor">did you commit it?</text>
  <path d="M331 50 V76" stroke="#4051b5" stroke-width="2" fill="none" marker-end="url(#w-b)"/>
  <path d="M434 93 H556 V126" stroke="#16a34a" stroke-width="2" fill="none" marker-end="url(#w-g)"/>
  <text x="495" y="86" text-anchor="middle" font-size="9" fill="#16a34a">yes</text>
  <path d="M228 93 H106 V126" stroke="#e11d48" stroke-width="2" fill="none" marker-end="url(#w-r)"/>
  <text x="167" y="86" text-anchor="middle" font-size="9" fill="#e11d48">no</text>
  <rect x="466" y="126" width="180" height="52" rx="6" fill="none" stroke="#16a34a" stroke-width="2"/>
  <text x="556" y="148" text-anchor="middle" font-size="11" font-weight="700" fill="#16a34a">recoverable</text>
  <text x="556" y="166" text-anchor="middle" font-size="9" fill="#94a3b8">git reflog finds it</text>
  <rect x="16" y="126" width="180" height="52" rx="6" fill="none" stroke="#e11d48" stroke-width="2"/>
  <text x="106" y="148" text-anchor="middle" font-size="11" font-weight="700" fill="#e11d48">gone forever</text>
  <text x="106" y="166" text-anchor="middle" font-size="9" fill="#94a3b8">nothing can help</text>
  <circle r="6" fill="#16a34a"><animateMotion dur="3.4s" repeatCount="indefinite" path="M331 50 V93 H556 V126"/></circle>
  <circle r="6" fill="#e11d48"><animateMotion dur="3.4s" begin="1.7s" repeatCount="indefinite" path="M331 50 V93 H106 V126"/></circle>
  <text x="331" y="212" text-anchor="middle" font-size="10" font-weight="600" fill="currentColor">This single question decides everything that follows.</text>
</svg>

---

## The situations you will actually hit

| What happened | Fix |
|---|---|
| committed on the wrong branch | `git switch right-branch` then `git cherry-pick <hash>` |
| message has a typo, not pushed | `git commit --amend -m "better"` |
| staged a file by mistake | `git restore --staged file` |
| want to undo the last commit, keep the changes | `git reset --soft HEAD~1` |
| pushed but GitHub rejected it | `git pull` then push again |
| `.env` got committed | see below, and treat the secret as leaked |
| lost a commit, no idea where | `git reflog` |
| detached HEAD | `git switch main` |

---

## Merge conflicts

Git stops and marks the file:

```
<<<<<<< HEAD
year = "2026"
=======
year = 2026
>>>>>>> add-sorting
```

Above `=======` is yours, below is theirs. **Delete all three marker lines** and leave the code
you want, which may be a mix of both.

```bash
git add the-file.py
git commit
```

!!! tip "Not an error"
    A conflict means two people edited the same lines and git refused to guess. It is git
    working correctly. Reading both sides and deciding is the job.

---

## A secret got committed

This happened in this project. `backend/.env` was staged, holding a real database URL and
password.

**Removing it from the next commit is not enough.** Once it is in history, anyone who cloned
the repo has it, and on a public repo it may already be indexed.

<ol class="steps">
  <li><strong>Rotate the secret.</strong> Assume it is public. This is the only step that actually protects you.</li>
  <li>Add the file to <code>.gitignore</code>.</li>
  <li><code>git rm --cached backend/.env</code> so git forgets it while your local file survives.</li>
  <li>Commit that.</li>
</ol>

Order matters. Steps 2 to 4 stop it happening again. **Only step 1 fixes what already leaked.**

---

## reflog, the actual safety net

```bash
git reflog
```

Every position `HEAD` has held, including commits on branches you deleted. If you committed it,
it is in there, and:

```bash
git switch -c rescue <hash>
```

brings it back. Worth knowing before you need it.

---

## Two commands to be careful with

| Command | Why |
|---|---|
| `git push --force` | overwrites GitHub, including other people's commits. **No undo** |
| `git reset --hard` | throws away uncommitted work silently. **No undo** |

Everything else in git is either safe or recoverable. These two are neither.

---

## Going further

- [Commits](commits.md) &#183; [Branches](branches.md) &#183; [Remotes](remotes.md)
- [ohshitgit.com](https://ohshitgit.com/), a page of real problems and their exact fixes
- [learngitbranching.js.org](https://learngitbranching.js.org/), where you can break things
  safely
