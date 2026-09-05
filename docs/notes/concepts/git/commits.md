# Commits

**A commit is a photograph of every file, not a list of changes.**

That surprises people. `git show` displays a diff, so it feels like a commit stores "what
changed". It does not. It stores the **whole state**, and git works the difference out by
comparing two photographs.

---

## Your work lives in three places

This is the model behind almost every confusing git moment.

<svg viewBox="0 0 660 250" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto">
  <defs>
    <marker id="c-b" markerWidth="9" markerHeight="7" refX="8" refY="3.5" orient="auto"><polygon points="0 0, 9 3.5, 0 7" fill="#4051b5"/></marker>
  </defs>
  <rect x="14" y="70" width="180" height="72" rx="6" fill="none" stroke="#e11d48" stroke-width="2"/>
  <text x="104" y="96" text-anchor="middle" font-size="12" font-weight="600" fill="currentColor">working directory</text>
  <text x="104" y="114" text-anchor="middle" font-size="9" fill="#94a3b8">the files you edit</text>
  <text x="104" y="130" text-anchor="middle" font-size="9" font-weight="600" fill="#e11d48">not saved anywhere</text>
  <rect x="240" y="70" width="180" height="72" rx="6" fill="none" stroke="#f59e0b" stroke-width="2"/>
  <text x="330" y="96" text-anchor="middle" font-size="12" font-weight="600" fill="currentColor">staging area</text>
  <text x="330" y="114" text-anchor="middle" font-size="9" fill="#94a3b8">what the next commit will hold</text>
  <text x="330" y="130" text-anchor="middle" font-size="9" fill="#94a3b8">still not saved</text>
  <rect x="466" y="70" width="180" height="72" rx="6" fill="none" stroke="#16a34a" stroke-width="2"/>
  <text x="556" y="96" text-anchor="middle" font-size="12" font-weight="600" fill="currentColor">repository</text>
  <text x="556" y="114" text-anchor="middle" font-size="9" fill="#94a3b8">the photographs</text>
  <text x="556" y="130" text-anchor="middle" font-size="9" font-weight="600" fill="#16a34a">safe. recoverable</text>
  <path d="M194 106 H240" stroke="#4051b5" stroke-width="2" fill="none" marker-end="url(#c-b)"/>
  <path d="M420 106 H466" stroke="#4051b5" stroke-width="2" fill="none" marker-end="url(#c-b)"/>
  <text x="215" y="60" text-anchor="middle" font-size="10" font-weight="600" fill="#4051b5">git add</text>
  <text x="441" y="60" text-anchor="middle" font-size="10" font-weight="600" fill="#4051b5">git commit</text>
  <text x="215" y="170" text-anchor="middle" font-size="9" fill="#94a3b8">git restore</text>
  <text x="441" y="170" text-anchor="middle" font-size="9" fill="#94a3b8">git reset</text>
  <circle r="6" fill="#e11d48"><animateMotion dur="3s" repeatCount="indefinite" path="M104 106 H330 H556"/></circle>
  <text x="330" y="206" text-anchor="middle" font-size="10" font-weight="600" fill="#e11d48">Only the green box survives a mistake.</text>
  <text x="330" y="228" text-anchor="middle" font-size="10" fill="#64748b">git status tells you which box your work is currently in. Run it constantly.</text>
</svg>

---

## The hash, and why it cascades

```
688c149b2a95a5d99d8e975114fe892306666372
```

That is calculated from the file contents, the message, the author, the time, **and the
previous commit's hash**. Change anything in a commit and its hash changes. Because each one
contains the one before it, every later hash changes too.

**That is why history is hard to rewrite quietly.** It is a feature, not an annoyance.

You will normally use the short form, `688c149`. Git accepts any unambiguous prefix.

---

## Messages

<div class="compare">
  <div>
    <strong>Useless</strong>
    <p><code>update</code><br><code>fix</code><br><code>changes</code><br><code>asdf</code><br><code>refactor profile controller</code></p>
  </div>
  <div>
    <strong>Useful</strong>
    <p><code>add sorting to student table</code><br><code>fix 500 on deleting enrolled student</code><br><code>replace SQLite with Postgres</code></p>
  </div>
</div>

The test: **six months from now, can you find this commit without opening it?** You will be
reading your own messages far more often than anyone else will.

Write them in the imperative, as an instruction: `add sorting`, not `added sorting`. Git's own
generated messages do this, so yours will match.

---

## Five commands

```bash
git status              # which box is my work in?
git add .               # stage everything
git commit -m "..."     # photograph it
git log --oneline       # the history, one line each
git show 688c149        # what did that commit change?
```

---

## Why committing often actually matters

`git restore` throws away uncommitted work **with no undo and no warning**. Nothing recovers
it, because it was never saved anywhere.

Once a change is committed it is recoverable, even if you later delete the branch. That is the
real argument for committing small and often: not tidiness, **a safety net**.

---

## Going further

- [Branches](branches.md) &#183; [Remotes](remotes.md) &#183; [When it goes wrong](when-it-goes-wrong.md)
- [The guide to Git I never had](https://www.freecodecamp.org/news/learn-git-basics/)
- [learngitbranching.js.org](https://learngitbranching.js.org/), visual and genuinely fun
