// Same controlled-form idea as StudentForm, just more fields.
import { useState, useEffect } from "react";
import Input from "../ui/Input.jsx";
import Button from "../ui/Button.jsx";

const BLANK = { title: "", code: "", teacher_name: "", fees: "", duration_weeks: "" };

export default function CourseForm({ editing, saving, onSubmit, onCancel }) {
  const [form, setForm] = useState(BLANK);

  useEffect(() => {
    setForm(
      editing
        ? {
            title: editing.title ?? "",
            code: editing.code ?? "",
            teacher_name: editing.teacher_name ?? "",
            fees: editing.fees ?? "",
            duration_weeks: editing.duration_weeks ?? "",
          }
        : BLANK
    );
  }, [editing]);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    // The boxes always give us text. The backend wants numbers for these two.
    const payload = {
      ...form,
      fees: Number(form.fees),
      duration_weeks: Number(form.duration_weeks),
    };

    const saved = await onSubmit(payload);
    if (saved) setForm(BLANK);
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white border rounded-md p-4 mb-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Input label="Title" name="title" value={form.title} onChange={handleChange} required />
        <Input label="Code" name="code" value={form.code} onChange={handleChange} required />
        <Input label="Teacher" name="teacher_name" value={form.teacher_name} onChange={handleChange} required />
        <Input label="Fees" name="fees" type="number" min="0" value={form.fees} onChange={handleChange} required />
        <Input label="Duration (weeks)" name="duration_weeks" type="number" min="1" value={form.duration_weeks} onChange={handleChange} required />
      </div>

      <div className="flex gap-2 mt-4">
        <Button type="submit" disabled={saving}>
          <i className={saving ? "fa-solid fa-spinner fa-spin" : "fa-solid fa-floppy-disk"}></i>
          {saving ? "Saving..." : editing ? "Update course" : "Add course"}
        </Button>
        {editing && (
          <Button type="button" variant="secondary" onClick={onCancel}>
            Cancel
          </Button>
        )}
      </div>
    </form>
  );
}
