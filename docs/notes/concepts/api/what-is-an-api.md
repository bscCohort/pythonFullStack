# What is an API

**An API is a set of URLs that return data instead of a web page.**

Same protocol, same server. The only difference is who the answer is for: a page is for your
eyes, an API response is for another program.

<svg viewBox="0 0 660 250" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto">
  <defs>
    <marker id="a1" markerWidth="9" markerHeight="7" refX="8" refY="3.5" orient="auto"><polygon points="0 0, 9 3.5, 0 7" fill="#4051b5"/></marker>
    <marker id="a2" markerWidth="9" markerHeight="7" refX="8" refY="3.5" orient="auto"><polygon points="0 0, 9 3.5, 0 7" fill="#94a3b8"/></marker>
  </defs>
  <rect x="14" y="96" width="118" height="58" rx="6" fill="none" stroke="#4051b5" stroke-width="2"/>
  <text x="73" y="122" text-anchor="middle" font-size="13" font-weight="600" fill="currentColor">Browser</text>
  <text x="73" y="139" text-anchor="middle" font-size="9" fill="#94a3b8">one request</text>
  <rect x="256" y="96" width="130" height="58" rx="6" fill="none" stroke="#4051b5" stroke-width="2"/>
  <text x="321" y="122" text-anchor="middle" font-size="13" font-weight="600" fill="currentColor">FastAPI</text>
  <text x="321" y="139" text-anchor="middle" font-size="9" fill="#94a3b8">port 8000</text>
  <rect x="504" y="26" width="142" height="56" rx="6" fill="none" stroke="#94a3b8" stroke-width="1.5"/>
  <text x="575" y="50" text-anchor="middle" font-size="12" font-weight="600" fill="currentColor">index.html</text>
  <text x="575" y="68" text-anchor="middle" font-size="9" fill="#94a3b8">a screen, for you</text>
  <rect x="504" y="168" width="142" height="56" rx="6" fill="none" stroke="#4051b5" stroke-width="2"/>
  <text x="575" y="192" text-anchor="middle" font-size="12" font-weight="600" fill="currentColor">JSON</text>
  <text x="575" y="210" text-anchor="middle" font-size="9" fill="#94a3b8">data, for a program</text>
  <path id="p-in" d="M132 125 H256" stroke="#4051b5" stroke-width="2" fill="none" marker-end="url(#a1)"/>
  <path id="p-html" d="M386 125 C 442 125, 452 54, 504 54" stroke="#94a3b8" stroke-width="1.5" fill="none" marker-end="url(#a2)"/>
  <path id="p-json" d="M386 125 C 442 125, 452 196, 504 196" stroke="#4051b5" stroke-width="2" fill="none" marker-end="url(#a1)"/>
  <text x="192" y="117" text-anchor="middle" font-size="9" fill="#64748b">GET</text>
  <text x="448" y="88" text-anchor="middle" font-size="9" fill="#64748b">/students</text>
  <text x="448" y="168" text-anchor="middle" font-size="9" fill="#64748b">/api/students</text>
  <circle r="6" fill="#94a3b8"><animateMotion dur="2.6s" repeatCount="indefinite" path="M132 125 H386 C 442 125, 452 54, 504 54"/></circle>
  <circle r="6" fill="#e11d48"><animateMotion dur="2.6s" begin="1.3s" repeatCount="indefinite" path="M132 125 H386 C 442 125, 452 196, 504 196"/></circle>
  <text x="330" y="244" text-anchor="middle" font-size="10" fill="#64748b">The path decides which answer you get. Both come from one server.</text>
</svg>

---

## The rule that carries REST

> **The URL says what. The method says what to do with it.**

| Method | URL | Meaning |
|---|---|---|
| `GET` | `/api/students` | all of them |
| `GET` | `/api/students/5` | just this one |
| `POST` | `/api/students` | create one |
| `PUT` | `/api/students/5` | replace it |
| `DELETE` | `/api/students/5` | remove it |

Never `/api/getStudents` or `/api/deleteStudent?id=5`. The URL names a **thing**, the method
carries the action. That is why you can **guess** that `POST /api/courses` creates a course.

Open `backend/api/students.py`: those five functions, in that order, and nothing else.

---

## An API is a contract

Publish `GET /api/students` returning `id`, `name`, `email`, `year` and that shape is a
promise. Rename `name` to `full_name` and every caller breaks, even though your Python still
runs fine.

| Safe to change | Breaks your callers |
|---|---|
| SQL, file names, SQLite to Postgres, adding a new field | renaming a field, removing one, changing a type |

We replaced the database **and** the whole HTTP layer in this project, and React did not change
one line. That is the contract holding, and it is the reason to have one.

---

## Try it

```bash
curl -X POST http://localhost:8000/api/students \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"t@example.com","year":"2026"}'
```

No browser, no React. **React is only one possible caller.** A phone app or a Python script
would use the same endpoint.

Your live contract, generated from the code: **`http://localhost:8000/docs`**

---

## Going further

- [Status codes](status-codes.md) &#183; [JSON](json.md) &#183; [CORS](../web/cors.md)
- `backend/api/students.py`
- [REST cheatsheet](https://devhints.io/rest-api)
