// The enrollments table. There is no Edit: an enrollment either exists or it
// does not, so you create it or you remove it.
import { Link } from "react-router-dom";
import Button from "../ui/Button.jsx";
import EmptyState from "../ui/EmptyState.jsx";
import Spinner from "../ui/Spinner.jsx";

const HEADERS = ["ID", "Student", "Course", "Enrolled on", ""];

// The enrollments endpoint returns only ids, so we look the names up.
// "?." means: if it was not found, do not crash, just give undefined.
function EnrollmentRow({ enrollment, students, courses, onDelete, deleting }) {
  const student = students.find((s) => s.id === enrollment.student_id);
  const course = courses.find((c) => c.id === enrollment.course_id);

  return (
    <tr className="border-t">
      <td className="px-4 py-3 text-sm text-gray-500">{enrollment.id}</td>
      <td className="px-4 py-3 text-sm font-medium">
        {student ? (
          <Link to={`/students/${student.id}`} className="text-blue-600 hover:underline">
            {student.name}
          </Link>
        ) : ("(deleted student)")}
      </td>
      <td className="px-4 py-3 text-sm">
        {course ? (
          <Link to={`/courses/${course.id}`} className="text-blue-600 hover:underline">
            {course.title}
          </Link>
        ) : ("(deleted course)")}
      </td>
      <td className="px-4 py-3 text-sm">{String(enrollment.enrolled_on).slice(0, 10)}</td>
      <td className="px-4 py-3 text-right">
        <Button variant="danger" onClick={() => onDelete(enrollment.id)} disabled={deleting}>
          <i className={deleting ? "fa-solid fa-spinner fa-spin" : "fa-solid fa-trash"}></i>
          {deleting ? "Removing..." : "Remove"}
        </Button>
      </td>
    </tr>
  );
}

export default function EnrollmentTable({ enrollments, students, courses, loading, deletingId, onDelete }) {
  if (loading) return <Spinner label="Loading enrollments..." />;

  if (enrollments.length === 0) return <EmptyState message="No enrollments yet." />;

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
          {enrollments.map((e) => (
            <EnrollmentRow
              key={e.id}
              enrollment={e}
              students={students}
              courses={courses}
              onDelete={onDelete}
              deleting={deletingId === e.id}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
