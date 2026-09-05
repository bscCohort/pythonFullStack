// Compare with StudentsPage.jsx: the same file with different nouns, because
// both use the same useResource hook.
import { useState } from "react";
import { useResource } from "../hooks/useResource.js";
import { courses as coursesApi } from "../services/api.js";

import PageHeading from "../components/ui/PageHeading.jsx";
import CourseForm from "../components/courses/CourseForm.jsx";
import CourseTable from "../components/courses/CourseTable.jsx";

export default function CoursesPage() {
  const { items, loading, saving, deletingId, add, edit, remove } =
    useResource(coursesApi, { one: "Course" });

  const [editing, setEditing] = useState(null);

  async function handleSubmit(form) {
    const saved = editing ? await edit(editing.id, form) : await add(form);
    if (saved) setEditing(null);
    return saved;
  }

  return (
    <div>
      <PageHeading title="Courses" subtitle="The courses students can enroll in." />

      <CourseForm
        editing={editing}
        saving={saving}
        onSubmit={handleSubmit}
        onCancel={() => setEditing(null)}
      />

      <CourseTable
        courses={items}
        loading={loading}
        deletingId={deletingId}
        onEdit={setEditing}
        onDelete={(id) => confirm("Delete this course?") && remove(id)}
      />
    </div>
  );
}
