# JSON

**JSON is text that looks like a Python dictionary, and it exists because a network can only
carry text.**

A Python `dict` and a JavaScript object are different things in different processes. Neither can
be handed over directly. So it gets flattened to text, sent, and rebuilt on the other side.

<svg viewBox="0 0 660 290" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto">
  <defs>
    <marker id="j-b" markerWidth="9" markerHeight="7" refX="8" refY="3.5" orient="auto"><polygon points="0 0, 9 3.5, 0 7" fill="#4051b5"/></marker>
  </defs>
  <rect x="20" y="18" width="270" height="62" rx="6" fill="none" stroke="#4051b5" stroke-width="2"/>
  <text x="155" y="42" text-anchor="middle" font-size="11" font-weight="600" fill="currentColor">Python dict, on the server</text>
  <text x="155" y="64" text-anchor="middle" font-size="10" fill="#94a3b8" font-family="monospace">{"name": "Aarav", "year": 2026}</text>
  <rect x="370" y="18" width="270" height="62" rx="6" fill="none" stroke="#4051b5" stroke-width="2"/>
  <text x="505" y="42" text-anchor="middle" font-size="11" font-weight="600" fill="currentColor">JS object, in the browser</text>
  <text x="505" y="64" text-anchor="middle" font-size="10" fill="#94a3b8" font-family="monospace">{name: "Aarav", year: 2026}</text>
  <line x1="20" y1="140" x2="640" y2="140" stroke="#e11d48" stroke-width="2" stroke-dasharray="8 5"/>
  <text x="330" y="133" text-anchor="middle" font-size="10" font-weight="700" fill="#e11d48">THE NETWORK &#183; only bytes cross this line</text>
  <rect x="100" y="158" width="460" height="50" rx="6" fill="none" stroke="#e11d48" stroke-width="2"/>
  <text x="330" y="178" text-anchor="middle" font-size="10" font-weight="600" fill="currentColor">a string of characters, nothing more</text>
  <text x="330" y="197" text-anchor="middle" font-size="10" fill="#94a3b8" font-family="monospace">{"name":"Aarav","year":2026}</text>
  <path d="M155 80 V158" stroke="#4051b5" stroke-width="2" fill="none" marker-end="url(#j-b)"/>
  <path d="M505 208 V80" stroke="#4051b5" stroke-width="2" fill="none" marker-end="url(#j-b)"/>
  <text x="163" y="118" font-size="9" fill="#64748b">serialise</text>
  <text x="513" y="118" font-size="9" fill="#64748b">parse</text>
  <circle r="6" fill="#e11d48"><animateMotion dur="3.4s" repeatCount="indefinite" path="M155 80 V183 H505 V80"/></circle>
  <text x="330" y="240" text-anchor="middle" font-size="10" fill="#64748b">FastAPI does both for you. You will never call json.dumps in this project.</text>
  <text x="330" y="262" text-anchor="middle" font-size="10" fill="#64748b">Because the format is just text, a Go service or a phone app joins for free.</text>
</svg>

---

## The entire syntax

Six types. That is the whole language.

```json
{ "id": 7, "name": "Aarav", "cgpa": 8.4, "active": true,
  "graduated_on": null, "courses": ["DBMS"], "address": { "city": "Pune" } }
```

| JSON | Python | JavaScript |
|---|---|---|
| `"text"` | `str` | `string` |
| `7` / `8.4` | `int` / `float` | `number`, one type for both |
| `true` / `null` | `True` / `None` | `true` / `null` |
| `[...]` / `{...}` | `list` / `dict` | `Array` / `Object` |

!!! warning "Stricter than Python"
    **Double quotes only. No trailing comma. No comments.** And `true`, not `True`. Getting this
    backwards while hand-writing a `curl` body is the commonest cause of a
    [422](status-codes.md).

---

## What your API sends

`GET /api/enrollments/report`, the joined view:

```json
[ { "enrollment_id": 4, "student_name": "Aarav Sharma",
    "course_name": "Database Management Systems", "grade": "A" } ]
```

The database stored `student_id: 1` and `course_id: 3`. The JSON carries **names**, because the
[JOIN](../database/joins.md) happened in SQL before serialising. The browser never learns that
ids exist.

Open `http://localhost:8000/api/students` in your browser. That tree is the exact bytes React
receives.

---

## The error everyone hits first

```
SyntaxError: Unexpected token < in JSON at position 0
```

`<` at position 0 means **you were sent HTML and tried to parse it as JSON.** Wrong URL, a
crash, or you forgot the `/api` prefix and the SPA catch-all returned `index.html`.

The fix is never in your parsing code. Open the Network tab and read the raw Response.

!!! danger "Check the status before you parse"
    On a `422`, the body is `{ "detail": [...] }`, not an array, so `data.map(...)` throws. This
    project checks `res.ok` first, in `frontend/src/services/http.js`.

---

## What JSON cannot do

| You want | JSON has | What everyone does |
|---|---|---|
| a date | nothing | a string, `"2026-09-05"` |
| exact money | only floats | a string, so `0.1 + 0.2` cannot bite |
| an image | nothing | a separate URL |

That first row is live in your project: `year` is a **string**, so it returns as `"2026"`.

---

## Going further

- [What is an API](what-is-an-api.md) &#183; [Status codes](status-codes.md) &#183; [Joins](../database/joins.md)
- `frontend/src/services/http.js`, the only file that parses JSON
- [json.org](https://www.json.org/), the whole grammar on one page
