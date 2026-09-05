# Pull requests

**A pull request is not a git feature. It is a GitHub page wrapped around one question: may I
merge this branch?**

Git has no idea pull requests exist. Everything a PR does could be done with `git merge` on
your laptop. What GitHub adds is **a place to disagree before the merge happens.**

<svg viewBox="0 0 660 270" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto">
  <defs>
    <marker id="pr-b" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto"><polygon points="0 0, 8 3, 0 6" fill="#4051b5"/></marker>
    <marker id="pr-g" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto"><polygon points="0 0, 8 3, 0 6" fill="#16a34a"/></marker>
  </defs>
  <rect x="10" y="100" width="118" height="56" rx="6" fill="none" stroke="#4051b5" stroke-width="2"/>
  <text x="69" y="124" text-anchor="middle" font-size="11" font-weight="600" fill="currentColor">branch</text>
  <text x="69" y="141" text-anchor="middle" font-size="9" fill="#94a3b8">your commits</text>
  <rect x="172" y="100" width="118" height="56" rx="6" fill="none" stroke="#4051b5" stroke-width="2"/>
  <text x="231" y="124" text-anchor="middle" font-size="11" font-weight="600" fill="currentColor">push</text>
  <text x="231" y="141" text-anchor="middle" font-size="9" fill="#94a3b8">now on GitHub</text>
  <rect x="334" y="88" width="130" height="80" rx="6" fill="none" stroke="#f59e0b" stroke-width="2"/>
  <text x="399" y="112" text-anchor="middle" font-size="11" font-weight="600" fill="currentColor">pull request</text>
  <text x="399" y="130" text-anchor="middle" font-size="9" fill="#94a3b8">tests run</text>
  <text x="399" y="145" text-anchor="middle" font-size="9" fill="#94a3b8">humans comment</text>
  <text x="399" y="160" text-anchor="middle" font-size="9" fill="#94a3b8">you push fixes</text>
  <rect x="508" y="100" width="140" height="56" rx="6" fill="none" stroke="#16a34a" stroke-width="2"/>
  <text x="578" y="124" text-anchor="middle" font-size="11" font-weight="600" fill="#16a34a">merged to main</text>
  <text x="578" y="141" text-anchor="middle" font-size="9" fill="#94a3b8">branch deleted</text>
  <path d="M128 128 H172" stroke="#4051b5" stroke-width="2" marker-end="url(#pr-b)"/>
  <path d="M290 128 H334" stroke="#4051b5" stroke-width="2" marker-end="url(#pr-b)"/>
  <path d="M464 128 H508" stroke="#16a34a" stroke-width="2" marker-end="url(#pr-g)"/>
  <path d="M399 168 C 399 212, 231 212, 231 156" stroke="#f59e0b" stroke-width="1.5" stroke-dasharray="4 3" fill="none" marker-end="url(#pr-b)"/>
  <text x="315" y="228" text-anchor="middle" font-size="9" fill="#f59e0b">review asks for a change, so you push again to the same branch</text>
  <circle r="6" fill="#e11d48"><animateMotion dur="4.5s" repeatCount="indefinite" path="M69 128 H578"/></circle>
  <text x="330" y="256" text-anchor="middle" font-size="10" fill="#64748b">The loop back is the whole point. A PR is a conversation, not a submission.</text>
</svg>

---

## What actually happens

<ol class="steps">
  <li><strong>Branch, commit, push.</strong> Nothing new.</li>
  <li><strong>Open the PR</strong> on GitHub. Pick which branch merges into which.</li>
  <li><strong>Tests run automatically.</strong> This project has <code>.github/workflows/ci.yml</code>, so every push gets checked.</li>
  <li><strong>Someone reads it</strong> and leaves comments on specific lines.</li>
  <li><strong>You push more commits</strong> to the same branch. The PR updates itself.</li>
  <li><strong>Merge</strong>, then delete the branch.</li>
</ol>

Step 5 is the one people miss. **You do not close a PR and open a new one to fix something.**
Push to the same branch and it appears there.

---

## Writing one somebody will actually read

| | |
|---|---|
| **Title** | one line, what it does. `fix 500 on deleting an enrolled student` |
| **Body** | why, not what. The diff already shows what |
| **Size** | small. A 40-line PR gets a real review, a 2,000-line PR gets "LGTM" |

!!! tip "The unit is one idea"
    A PR that adds sorting **and** fixes a delete bug **and** renames three files cannot be
    reviewed, only approved. Split it.

    This project's real commit `Feature: add sorting, searching, export to PDF and CSV files`
    is four ideas in one. That would have been four PRs in a professional repo.

---

## Reviewing

You will be asked to do this on your first job, probably in the first few days. Look for:

- Does it do what the title says, and nothing else?
- Would you understand this code in six months?
- What happens on the **unhappy path**: empty input, missing row, no network?
- Any secret, password or key in the diff?

**Asking a question is a valid review.** "Why 409 and not 400?" is more useful than silent
approval, and it is how you learn a codebase.

---

## Why this exists at all

Nobody merges straight to `main` on a real team, for two reasons that have nothing to do with
trust: **a second pair of eyes catches things**, and **the PR is a written record of why** a
change was made. Six months later, that discussion is often the only explanation anyone can
find.

---

## Going further

- [Branches](branches.md) &#183; [Remotes](remotes.md) &#183; [When it goes wrong](when-it-goes-wrong.md)
- `.github/workflows/ci.yml`, the checks that would run on your PR
- [GitHub's own PR docs](https://docs.github.com/en/pull-requests)
