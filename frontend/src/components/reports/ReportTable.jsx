import Spinner from "../ui/Spinner.jsx";
import { Link } from "react-router-dom";
// Read-only table. No edit, no delete, no form.
import EmptyState from "../ui/EmptyState.jsx";

const HEADERS = ["Student", "Email", "Course", "Code", "Teacher", "Fees", "Enrolled on"];

function ReportRow({ row }) {
  return (
    <tr className="border-t">
      <td className="px-4 py-3 text-sm">
        <Link to={`/students/${row.student_id}`} className="text-blue-600 hover:underline">
          {row.student_name}
        </Link>
      </td>
      <td className="px-4 py-3 text-sm text-gray-600">{row.student_email}</td>
      <td className="px-4 py-3 text-sm">
        <Link to={`/courses/${row.course_id}`} className="text-blue-600 hover:underline">
          {row.course_title}
        </Link>
      </td>
      <td className="px-4 py-3 text-sm">{row.course_code}</td>
      <td className="px-4 py-3 text-sm">{row.teacher_name}</td>
      <td className="px-4 py-3 text-sm">&#8377;{Number(row.fees).toLocaleString("en-IN")}</td>
      <td className="px-4 py-3 text-sm">{String(row.enrolled_on).slice(0, 10)}</td>
    </tr>
  );
}

export default function ReportTable({ rows, loading }) {
  if (loading) return <Spinner label="Building report..." />;

  if (rows.length === 0) return <EmptyState message="Nothing to report yet." />;

  return (
    <div className="bg-white border rounded-md overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            {HEADERS.map((h) => (
              <th key={h} className="px-4 py-3 text-left text-xs uppercase text-gray-500">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <ReportRow key={row.enrollment_id} row={row} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
