// The bottom half of a profile page: what the student is enrolled in.
import { Link } from "react-router-dom";
import EmptyState from "../ui/EmptyState.jsx";

export default function StudentCourses({ enrollments }) {
  if (enrollments.length === 0) {
    return <EmptyState message="This student is not enrolled in any course yet." />;
  }

  // reduce() adds the fees up into one running total.
  const total = enrollments.reduce((sum, row) => sum + Number(row.fees), 0);

  return (
    <div className="bg-white border rounded-md overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-3 text-left text-xs uppercase text-gray-500">Course</th>
            <th className="px-4 py-3 text-left text-xs uppercase text-gray-500">Code</th>
            <th className="px-4 py-3 text-left text-xs uppercase text-gray-500">Teacher</th>
            <th className="px-4 py-3 text-left text-xs uppercase text-gray-500">Fees</th>
          </tr>
        </thead>
        <tbody>
          {enrollments.map((row) => (
            <tr key={row.enrollment_id} className="border-t">
              <td className="px-4 py-3 text-sm font-medium">
                {/* Click through to the course. This is the other half of the
                    relationship: a student has courses, a course has students. */}
                <Link to={`/courses/${row.course_id}`} className="text-blue-600 hover:underline">
                  {row.course_title}
                </Link>
              </td>
              <td className="px-4 py-3 text-sm">{row.course_code}</td>
              <td className="px-4 py-3 text-sm">{row.teacher_name}</td>
              <td className="px-4 py-3 text-sm">&#8377;{Number(row.fees).toLocaleString("en-IN")}</td>
            </tr>
          ))}
        </tbody>
        <tfoot className="bg-gray-50">
          <tr className="border-t">
            <td colSpan="3" className="px-4 py-3 text-sm font-semibold text-right">Total</td>
            <td className="px-4 py-3 text-sm font-semibold">&#8377;{total.toLocaleString("en-IN")}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
