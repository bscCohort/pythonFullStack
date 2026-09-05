import { Link } from "react-router-dom";
import { useEnrollments } from "../hooks/useEnrollments.js";

import PageHeading from "../components/ui/PageHeading.jsx";
import EnrollmentForm from "../components/enrollments/EnrollmentForm.jsx";
import EnrollmentTable from "../components/enrollments/EnrollmentTable.jsx";

export default function EnrollmentsPage() {
  const { enrollments, students, courses, loading, saving, deletingId, add, remove } =
    useEnrollments();

  return (
    <div>
      <PageHeading
        title="Enrollments"
        subtitle="The join between students and courses: one row per student per course."
      />

      <p className="text-sm text-gray-600 mb-6">
        Each row below stores only two numbers, a student id and a course id.{" "}
        <Link to="/enrollments/report" className="text-blue-600 hover:underline font-medium">
          See the joined report
        </Link>{" "}
        to view the same rows with names and fees filled in by the database.
      </p>

      <EnrollmentForm
        students={students}
        courses={courses}
        saving={saving}
        loading={loading}
        onSubmit={add}
      />

      <EnrollmentTable
        enrollments={enrollments}
        students={students}
        courses={courses}
        loading={loading}
        deletingId={deletingId}
        onDelete={(id) => confirm("Remove this enrollment?") && remove(id)}
      />
    </div>
  );
}
