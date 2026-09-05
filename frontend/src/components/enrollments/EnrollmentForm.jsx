// Two dropdowns instead of text boxes, because a student and a course must
// already exist before you can link them together.
//
// THE BUG THIS FIXES
//
// The database is on the internet, so saving takes a couple of seconds. The
// button used to look exactly the same during that wait: not greyed out, no
// spinner, no text change. So it looked like nothing had happened, people
// clicked it again, and the second click hit the backend rule "that student is
// already enrolled in that course" and showed a red error.
//
// The request was working the whole time. The UI just never said so.
//
// Two changes fix it:
//   1. disabled={saving || loading}   the button cannot be clicked twice
//   2. "Enrolling..."    the button says what is happening

import { useState } from "react";
import Select from "../ui/Select.jsx";
import Button from "../ui/Button.jsx";

const BLANK = { student_id: "", course_id: "" };

export default function EnrollmentForm({ students, courses, saving, loading, onSubmit }) {
  const [form, setForm] = useState(BLANK);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    // Stop the browser reloading the page, which is its default for forms.
    e.preventDefault();

    const saved = await onSubmit({
      student_id: Number(form.student_id),
      course_id: Number(form.course_id),
    });

    // Only clear the dropdowns if it actually worked.
    if (saved) setForm(BLANK);
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white border rounded-md p-4 mb-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <Select
          label="Student"
          name="student_id"
          value={form.student_id}
          onChange={handleChange}
          required
          disabled={saving || loading}
          options={students.map((s) => ({ value: s.id, label: `${s.name} (${s.email})` }))}
        />
        <Select
          label="Course"
          name="course_id"
          value={form.course_id}
          onChange={handleChange}
          required
          disabled={saving || loading}
          options={courses.map((c) => ({ value: c.id, label: `${c.title} (${c.code})` }))}
        />
      </div>

      <div className="mt-4">
        <Button type="submit" disabled={saving || loading}>
          <i className={saving ? "fa-solid fa-spinner fa-spin" : "fa-solid fa-link"}></i>
          {saving ? "Enrolling..." : "Enroll student"}
        </Button>
      </div>
    </form>
  );
}
