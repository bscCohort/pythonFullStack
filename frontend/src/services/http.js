// Every network call in the app goes through this file.
//
// Why bother? Because "fetch" alone is easy to get wrong:
//   - it does NOT throw when the server answers 404 or 500
//   - you have to remember to call .json() every time
//   - you have to remember the headers when sending data
//
// So we write it once here, correctly, and the rest of the app stays short.

import { API_URL } from "../config/api.js";

// FastAPI reports problems in two different shapes, and we want a readable
// sentence out of either one.
//
//   1. Something we raised on purpose, e.g. HTTPException(409, "already enrolled")
//      { "detail": "That student is already enrolled in that course." }
//
//   2. Something Pydantic rejected, e.g. a missing field
//      { "detail": [ { "loc": ["body","year"], "msg": "Field required" } ] }
//
// The second one is a LIST, one entry per bad field, and it tells you which
// field was wrong. We turn that into "year: Field required".
function readError(body, status) {
  const detail = body?.detail;

  // Shape 1: a plain string
  if (typeof detail === "string") return detail;

  // Shape 2: a list of problems from Pydantic
  if (Array.isArray(detail)) {
    return detail
      .map((problem) => {
        // loc is like ["body", "year"], and the last part is the field name
        const field = problem.loc?.[problem.loc.length - 1];
        return field ? `${field}: ${problem.msg}` : problem.msg;
      })
      .join(", ");
  }

  return `Request failed (${status})`;
}

// Turn a server answer into data, or throw a readable error.
async function handle(response) {
  if (!response.ok) {
    let body = null;
    try {
      body = await response.json();
    } catch {
      // Body was not JSON. Nothing to add.
    }

    throw new Error(readError(body, response.status));
  }

  // 204 means "done, nothing to send back"
  if (response.status === 204) return null;

  return response.json();
}

export function get(path) {
  return fetch(`${API_URL}${path}`).then(handle);
}

export function post(path, data) {
  return fetch(`${API_URL}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then(handle);
}

export function put(path, data) {
  return fetch(`${API_URL}${path}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then(handle);
}

export function remove(path) {
  return fetch(`${API_URL}${path}`, { method: "DELETE" }).then(handle);
}
