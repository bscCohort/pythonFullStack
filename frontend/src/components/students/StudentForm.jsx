// The add / edit form.
//
// In the old code the form was filled and cleared by hand:
//     fillForm(student)   ->  document.getElementById("name").value = ...
//     resetForm()         ->  document.getElementById("name").value = ""
//
// Here the inputs read their value from state. Change the state and the
// boxes update themselves. This is called a "controlled form".

import { useState, useEffect } from "react";
import Input from "../ui/Input.jsx";
import Button from "../ui/Button.jsx";

// What an empty form looks like. Used for "add" and for "cancel".
const BLANK = { name: "", email: "", year: "" };

export default function StudentForm({ editing, saving, onSubmit, onCancel }) {
  const [form, setForm] = useState(BLANK);

  // When the parent hands us a student to edit, copy it into the boxes.
  // When it hands us null, clear them.
  useEffect(() => {
    setForm(editing ? { name: editing.name, email: editing.email, year: editing.year } : BLANK);
  }, [editing]);

  // One handler for every box. e.target.name matches the name="" below.
  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    // Stop the browser reloading the page, which is its default for forms.
    e.preventDefault();

    const saved = await onSubmit(form);
    // Only clear the boxes if the save actually worked.
    if (saved) setForm(BLANK);
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white border rounded-md p-4 mb-6">
      <div className="grid gap-4 sm:grid-cols-3">
        <Input label="Name" name="name" value={form.name} onChange={handleChange} required />
        <Input label="Email" name="email" type="email" value={form.email} onChange={handleChange} required />
        <Input label="Year" name="year" value={form.year} onChange={handleChange} required />
      </div>

      <div className="flex gap-2 mt-4">
        <Button type="submit" disabled={saving}>
          <i className={saving ? "fa-solid fa-spinner fa-spin" : "fa-solid fa-floppy-disk"}></i>
          {saving ? "Saving..." : editing ? "Update student" : "Add student"}
        </Button>

        {/* The cancel button only makes sense while editing. */}
        {editing && (
          <Button type="button" variant="secondary" onClick={onCancel}>
            Cancel
          </Button>
        )}
      </div>
    </form>
  );
}
