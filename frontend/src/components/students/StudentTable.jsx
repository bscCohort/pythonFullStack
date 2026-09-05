// The students table.
//
// It fetches nothing and decides nothing: it is handed a list and some
// functions, and it draws them. A component like this is called
// "presentational", and it is the easiest kind to reason about.

import { Link } from "react-router-dom";
import Button from "../ui/Button.jsx";
import EmptyState from "../ui/EmptyState.jsx";
import Spinner from "../ui/Spinner.jsx";

// One row. Kept in this file rather than its own, so the whole table is
// readable in one place.
function StudentRow({ student, onEdit, onDelete, deleting }) {
  return (
    <tr className="border-t">
      <td className="px-4 py-3 text-sm text-gray-500">{student.id}</td>
      <td className="px-4 py-3 text-sm font-medium">
        <Link to={`/students/${student.id}`} className="text-blue-600 hover:underline">
          {student.name}
        </Link>
      </td>
      <td className="px-4 py-3 text-sm">{student.email}</td>
      <td className="px-4 py-3 text-sm">{student.year}</td>
      <td className="px-4 py-3 text-right whitespace-nowrap">
        <Button variant="secondary" onClick={() => onEdit(student)} disabled={deleting}>
          <i className="fa-solid fa-pen"></i> Edit
        </Button>{" "}
        {/* The spinner belongs to THIS row, so you can see which one is going. */}
        <Button variant="danger" onClick={() => onDelete(student.id)} disabled={deleting}>
          <i className={deleting ? "fa-solid fa-spinner fa-spin" : "fa-solid fa-trash"}></i>
          {deleting ? "Deleting..." : "Delete"}
        </Button>
      </td>
    </tr>
  );
}

export default function StudentTable({ students, loading, deletingId, onEdit, onDelete }) {
  // Only shown on the FIRST load. Later refreshes leave the table on screen.
  if (loading) return <Spinner label="Loading students..." />;

  if (students.length === 0) {
    return <EmptyState message="No students yet. Add the first one above." />;
  }

  return (
    <div className="bg-white border rounded-md overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-3 text-left text-xs uppercase text-gray-500">ID</th>
            <th className="px-4 py-3 text-left text-xs uppercase text-gray-500">Name</th>
            <th className="px-4 py-3 text-left text-xs uppercase text-gray-500">Email</th>
            <th className="px-4 py-3 text-left text-xs uppercase text-gray-500">Year</th>
            <th className="px-4 py-3"></th>
          </tr>
        </thead>
        <tbody>
          {/* map() turns each student object into one row.
              key helps React tell the rows apart. */}
          {students.map((student) => (
            <StudentRow
              key={student.id}
              student={student}
              onEdit={onEdit}
              onDelete={onDelete}
              deleting={deletingId === student.id}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
