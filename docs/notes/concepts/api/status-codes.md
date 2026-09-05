# Status codes

**Every response starts with a number, and the first digit tells you whose problem it is.**

| | |
|---|---|
| `2xx` | it worked |
| `3xx` | it moved, go there instead |
| `4xx` | **the caller was wrong.** Fix the request |
| `5xx` | **the server was wrong.** Nothing the caller does will help |

4xx versus 5xx is the distinction that matters. A 4xx is the system working. **A 5xx is a bug.**

---

## Which one to return

Watch the three packets take three different branches.

<svg viewBox="0 0 680 320" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto">
  <defs>
    <marker id="s-b" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto"><polygon points="0 0, 8 3, 0 6" fill="#4051b5"/></marker>
    <marker id="s-r" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto"><polygon points="0 0, 8 3, 0 6" fill="#e11d48"/></marker>
    <marker id="s-g" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto"><polygon points="0 0, 8 3, 0 6" fill="#16a34a"/></marker>
  </defs>
  <rect x="256" y="10" width="168" height="34" rx="6" fill="none" stroke="#4051b5" stroke-width="2"/>
  <text x="340" y="32" text-anchor="middle" font-size="12" font-weight="600" fill="currentColor">a request arrives</text>
  <rect x="240" y="70" width="200" height="32" rx="6" fill="none" stroke="#94a3b8" stroke-width="1.5"/>
  <text x="340" y="91" text-anchor="middle" font-size="11" fill="currentColor">fields valid?</text>
  <rect x="240" y="130" width="200" height="32" rx="6" fill="none" stroke="#94a3b8" stroke-width="1.5"/>
  <text x="340" y="151" text-anchor="middle" font-size="11" fill="currentColor">row exists?</text>
  <rect x="240" y="190" width="200" height="32" rx="6" fill="none" stroke="#94a3b8" stroke-width="1.5"/>
  <text x="340" y="211" text-anchor="middle" font-size="11" fill="currentColor">allowed right now?</text>
  <path d="M340 44 V70" stroke="#4051b5" stroke-width="2" marker-end="url(#s-b)"/>
  <path d="M340 102 V130" stroke="#4051b5" stroke-width="2" marker-end="url(#s-b)"/>
  <path d="M340 162 V190" stroke="#4051b5" stroke-width="2" marker-end="url(#s-b)"/>
  <path d="M240 86 H130 V118" stroke="#e11d48" stroke-width="2" fill="none" marker-end="url(#s-r)"/>
  <path d="M440 146 H556 V178" stroke="#e11d48" stroke-width="2" fill="none" marker-end="url(#s-r)"/>
  <path d="M240 206 H130 V238" stroke="#e11d48" stroke-width="2" fill="none" marker-end="url(#s-r)"/>
  <path d="M340 222 V252" stroke="#16a34a" stroke-width="2" marker-end="url(#s-g)"/>
  <rect x="46" y="118" width="168" height="38" rx="6" fill="none" stroke="#e11d48" stroke-width="2"/>
  <text x="130" y="135" text-anchor="middle" font-size="12" font-weight="700" fill="#e11d48">422</text>
  <text x="130" y="150" text-anchor="middle" font-size="9" fill="#94a3b8">year: Field required</text>
  <rect x="472" y="178" width="168" height="38" rx="6" fill="none" stroke="#e11d48" stroke-width="2"/>
  <text x="556" y="195" text-anchor="middle" font-size="12" font-weight="700" fill="#e11d48">404</text>
  <text x="556" y="210" text-anchor="middle" font-size="9" fill="#94a3b8">no student 99</text>
  <rect x="46" y="238" width="168" height="38" rx="6" fill="none" stroke="#e11d48" stroke-width="2"/>
  <text x="130" y="255" text-anchor="middle" font-size="12" font-weight="700" fill="#e11d48">409</text>
  <text x="130" y="270" text-anchor="middle" font-size="9" fill="#94a3b8">still enrolled</text>
  <rect x="252" y="252" width="176" height="38" rx="6" fill="none" stroke="#16a34a" stroke-width="2"/>
  <text x="340" y="269" text-anchor="middle" font-size="12" font-weight="700" fill="#16a34a">200 / 201</text>
  <text x="340" y="284" text-anchor="middle" font-size="9" fill="#94a3b8">201 if you created it</text>
  <circle r="6" fill="#e11d48"><animateMotion dur="4.5s" repeatCount="indefinite" path="M340 44 V86 H130 V118"/></circle>
  <circle r="6" fill="#e11d48"><animateMotion dur="4.5s" begin="1.5s" repeatCount="indefinite" path="M340 44 V146 H556 V178"/></circle>
  <circle r="6" fill="#16a34a"><animateMotion dur="4.5s" begin="3s" repeatCount="indefinite" path="M340 44 V252"/></circle>
  <text x="340" y="312" text-anchor="middle" font-size="10" font-weight="600" fill="#e11d48">Every branch is a check you wrote. A 500 is what happens when nobody wrote one.</text>
</svg>

---

## Two real bugs from this codebase

**A missing field killed the request.** `POST /api/students` with no `year` raised `KeyError`
mid-response, so the caller got *no status code at all*: `curl: (52) Empty reply from server`.
A Pydantic class now answers `422` and names the field.

**A database constraint escaped as a 500.** Deleting an enrolled student hit a foreign key,
`psycopg` raised, and it surfaced as `500`. That is a lie: the caller did nothing wrong and the
server did not break. The request was refused for a good reason and failed to say so.

```python
enrolled = count_enrollments_for_student(student_id)
if enrolled > 0:
    raise HTTPException(status_code=409, detail="Cannot delete " + student["name"]
        + ": still enrolled in " + str(enrolled) + " course(s).")
```

!!! success "Why the api/ folder exists"
    That check cannot live in `database/students.py`, which only knows one table. It cannot live
    in React, because `curl` bypasses it. It belongs beside the endpoint. **The folder layout is
    a consequence of this rule.**

---

## The two you will keep mixing up

**401: I do not know who you are.** **403: I know exactly who you are, and no.**

---

## Try it

```bash
curl -i http://localhost:8000/api/students/99999                     # 404
curl -i -X POST http://localhost:8000/api/students \
  -H "Content-Type: application/json" -d '{"name":"X"}'              # 422
curl -i -X DELETE http://localhost:8000/api/students/1               # 409
```

`-i` shows the status line. Without it you see only the body, which is how people debug a 404
for twenty minutes.

---

## Going further

- [What is an API](what-is-an-api.md) &#183; [JSON](json.md)
- `backend/api/students.py` &#183; `frontend/src/services/http.js`
- [MDN status reference](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status)
