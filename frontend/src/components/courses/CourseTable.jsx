// The courses table. Same shape as StudentTable.jsx.
import { Link } from "react-router-dom";
import Button from "../ui/Button.jsx";
import EmptyState from "../ui/EmptyState.jsx";
import Spinner from "../ui/Spinner.jsx";

const HEADERS = ["ID", "Title", "Code", "Teacher", "Fees", "Duration", ""];

function CourseRow({ course, onEdit, onDelete, deleting }) {
  return (
    <tr className="border-t">
      <td className="px-4 py-3 text-sm text-gray-500">{course.id}</td>
      <td className="px-4 py-3 text-sm font-medium">
        <Link to={`/courses/${course.id}`} className="text-blue-600 hover:underline">
          {course.title}
        </Link>
      </td>
      <td className="px-4 py-3 text-sm">{course.code}</td>
      <td className="px-4 py-3 text-sm">{course.teacher_name}</td>
      {/* toLocaleString puts the commas in: 7999 -> 7,999 */}
      <td className="px-4 py-3 text-sm">&#8377;{Number(course.fees).toLocaleString("en-IN")}</td>
      <td className="px-4 py-3 text-sm">{course.duration_weeks} weeks</td>
      <td className="px-4 py-3 text-right whitespace-nowrap">
        <Button variant="secondary" onClick={() => onEdit(course)} disabled={deleting}>
          <i className="fa-solid fa-pen"></i> Edit
        </Button>{" "}
        <Button variant="danger" onClick={() => onDelete(course.id)} disabled={deleting}>
          <i className={deleting ? "fa-solid fa-spinner fa-spin" : "fa-solid fa-trash"}></i>
          {deleting ? "Deleting..." : "Delete"}
        </Button>
      </td>
    </tr>
  );
}

export default function CourseTable({ courses, loading, deletingId, onEdit, onDelete }) {
  if (loading) return <Spinner label="Loading courses..." />;

  if (courses.length === 0) {
    return <EmptyState message="No courses yet. Add the first one above." />;
  }

  return (
    <div className="bg-white border rounded-md overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            {HEADERS.map((h, i) => (
              <th key={i} className="px-4 py-3 text-left text-xs uppercase text-gray-500">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {courses.map((course) => (
            <CourseRow
              key={course.id}
              course={course}
              onEdit={onEdit}
              onDelete={onDelete}
              deleting={deletingId === course.id}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
