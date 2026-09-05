// The list of students taking one course.
//
// This is StudentCourses.jsx turned around. Same joined rows from the same
// endpoint, but grouped by course instead of by student. Reading the two files
// next to each other is the clearest way to see what a JOIN gives you: one
// query, and you can look at it from either end.

import { Link } from "react-router-dom";
import EmptyState from "../ui/EmptyState.jsx";

export default function CourseStudents({ students }) {
  if (students.length === 0) {
    return <EmptyState message="Nobody is enrolled in this course yet." />;
  }

  return (
    <div className="bg-white border rounded-md overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-3 text-left text-xs uppercase text-gray-500">Student</th>
            <th className="px-4 py-3 text-left text-xs uppercase text-gray-500">Email</th>
            <th className="px-4 py-3 text-left text-xs uppercase text-gray-500">Year</th>
            <th className="px-4 py-3 text-left text-xs uppercase text-gray-500">Enrolled on</th>
          </tr>
        </thead>
        <tbody>
          {students.map((row) => (
            <tr key={row.enrollment_id} className="border-t">
              <td className="px-4 py-3 text-sm font-medium">
                <Link to={`/students/${row.student_id}`} className="text-blue-600 hover:underline">
                  {row.student_name}
                </Link>
              </td>
              <td className="px-4 py-3 text-sm">{row.student_email}</td>
              <td className="px-4 py-3 text-sm">{row.student_year}</td>
              <td className="px-4 py-3 text-sm">{String(row.enrolled_on).slice(0, 10)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
