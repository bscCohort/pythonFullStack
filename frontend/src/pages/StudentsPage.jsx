import { useState } from "react";
import { useResource } from "../hooks/useResource.js";
import { students as studentsApi } from "../services/api.js";

import PageHeading from "../components/ui/PageHeading.jsx";
import StudentForm from "../components/students/StudentForm.jsx";
import StudentTable from "../components/students/StudentTable.jsx";

export default function StudentsPage() {
  const { items, loading, saving, deletingId, add, edit, remove } =
    useResource(studentsApi, { one: "Student" });

  const [editing, setEditing] = useState(null);

  async function handleSubmit(form) {
    const saved = editing ? await edit(editing.id, form) : await add(form);
    if (saved) setEditing(null);
    return saved;
  }

  return (
    <div>
      <PageHeading
        title="Students"
        subtitle="Add, edit and remove students. Click a name to open their page."
      />

      <StudentForm
        editing={editing}
        saving={saving}
        onSubmit={handleSubmit}
        onCancel={() => setEditing(null)}
      />

      <StudentTable
        students={items}
        loading={loading}
        deletingId={deletingId}
        onEdit={setEditing}
        onDelete={(id) => confirm("Delete this student?") && remove(id)}
      />
    </div>
  );
}
