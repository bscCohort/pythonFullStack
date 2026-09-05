# Branches

**A branch is a sticky note pointing at one commit. It is not a copy of your files.**

Creating a branch writes about 40 bytes. That is why it is instant even on a huge project, and
why nobody thinks twice about making one.

<svg viewBox="0 0 660 280" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto">
  <defs>
    <marker id="br-b" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto"><polygon points="0 0, 8 3, 0 6" fill="#4051b5"/></marker>
  </defs>
  <path d="M60 180 H76" stroke="#cbd5e1" stroke-width="2"/>
  <path d="M104 180 H176" stroke="#cbd5e1" stroke-width="2"/>
  <path d="M204 180 H276" stroke="#cbd5e1" stroke-width="2"/>
  <path d="M304 180 H486" stroke="#cbd5e1" stroke-width="2"/>
  <path d="M514 180 H600" stroke="#cbd5e1" stroke-width="2"/>
  <circle cx="90"  cy="180" r="14" fill="none" stroke="#94a3b8" stroke-width="2"/>
  <circle cx="190" cy="180" r="14" fill="none" stroke="#94a3b8" stroke-width="2"/>
  <circle cx="290" cy="180" r="14" fill="#94a3b8"/>
  <circle cx="500" cy="180" r="14" fill="none" stroke="#94a3b8" stroke-width="2"/>
  <text x="290" y="215" text-anchor="middle" font-size="9" fill="#94a3b8">the split point</text>
  <rect x="440" y="222" width="120" height="26" rx="5" fill="none" stroke="#94a3b8" stroke-width="1.5"/>
  <text x="500" y="240" text-anchor="middle" font-size="11" font-weight="600" fill="#64748b">main</text>
  <path d="M500 222 V194" stroke="#94a3b8" stroke-width="1.5" marker-end="url(#br-b)"/>
  <path d="M290 166 C 345 166, 350 100, 386 100" stroke="#4051b5" stroke-width="2" fill="none"/>
  <path d="M414 100 H486" stroke="#4051b5" stroke-width="2"/>
  <path d="M514 100 H586" stroke="#4051b5" stroke-width="2"/>
  <circle cx="400" cy="100" r="14" fill="none" stroke="#4051b5" stroke-width="2"/>
  <circle cx="500" cy="100" r="14" fill="none" stroke="#4051b5" stroke-width="2"/>
  <circle cx="600" cy="100" r="14" fill="#4051b5"/>
  <rect x="540" y="40" width="120" height="26" rx="5" fill="none" stroke="#4051b5" stroke-width="2"/>
  <text x="600" y="58" text-anchor="middle" font-size="11" font-weight="600" fill="#4051b5">add-sorting</text>
  <path d="M600 66 V86" stroke="#4051b5" stroke-width="2" marker-end="url(#br-b)"/>
  <text x="330" y="24" text-anchor="middle" font-size="11" font-weight="700" fill="currentColor">Two sticky notes on one history</text>
  <circle r="6" fill="#e11d48"><animateMotion dur="4s" repeatCount="indefinite" path="M90 180 H290 C 345 175, 350 100, 386 100 H600"/></circle>
  <text x="330" y="270" text-anchor="middle" font-size="10" fill="#64748b">The commits are shared up to the split. Only the notes differ.</text>
</svg>

---

## What the commands actually do

```bash
git switch -c add-sorting     # make a note here, and stand on it
git switch main               # stand on the other note
git branch                    # which notes exist, and where am I?
```

Switching branches **changes the files in your folder** to match that commit. That is the part
that feels magical and is worth saying out loud: your editor's contents are a consequence of
which note you are standing on.

`HEAD` is just "the note I am standing on".

---

## Why bother

| Working straight on main | Working on a branch |
|---|---|
| half-finished work is the only version | main always works |
| cannot try two ideas at once | one branch each, switch freely |
| an experiment that fails must be undone | delete the branch, done |
| no review step | a [pull request](pull-requests.md) is possible |

This project's real history is **entirely linear**, every commit straight on `main`. Look at
`git log --oneline` and you can see the cost: `add 3 more CRUD pages` sits between two
unrelated refactors, and there is no point where you could have reviewed just one idea.

---

## Merging

```bash
git switch main
git merge add-sorting
```

Git takes the two photographs, works out what each side changed since the split, and combines
them. If both sides changed the **same lines**, it cannot decide, stops, and asks you. That is
a conflict, and it is normal.

!!! tip "Conflicts are not errors"
    A conflict means two humans edited the same lines. Git is refusing to guess which one is
    right, which is exactly what you want it to do. See
    [when it goes wrong](when-it-goes-wrong.md).

---

## One naming habit

```
add-student-sorting        fix-delete-500        try-postgres
```

Lowercase, hyphens, and **name the goal, not the file you touched**. `fix-delete-500` still
means something a month from now. `asu-branch-2` does not.

---

## Going further

- [Commits](commits.md) &#183; [Remotes](remotes.md) &#183; [Pull requests](pull-requests.md)
- [learngitbranching.js.org](https://learngitbranching.js.org/), which exists specifically to
  make this picture click
