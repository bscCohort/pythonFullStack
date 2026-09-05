// One student: their details, the courses they take, and export buttons.
// useParams reads the :id out of the URL. /students/5 gives id = "5"
import { useParams } from "react-router-dom";
import { useDetail } from "../hooks/useDetail.js";
import { students as studentsApi, coursesForStudent } from "../services/api.js";

import Breadcrumbs from "../components/ui/Breadcrumbs.jsx";
import PageHeading from "../components/ui/PageHeading.jsx";
import Spinner from "../components/ui/Spinner.jsx";
import StudentDetails from "../components/students/StudentDetails.jsx";
import StudentCourses from "../components/students/StudentCourses.jsx";
import StudentExportButtons from "../components/students/StudentExportButtons.jsx";

export default function StudentDetailPage() {
  const { id } = useParams();
  const { item: student, related: courses, loading, error } =
    useDetail(id, studentsApi.getOne, coursesForStudent);

  if (loading) return <Spinner label="Loading student..." />;
  if (error) return <p className="text-red-700 bg-red-50 border border-red-200 rounded-md p-4">{error}</p>;
  if (!student) return <p className="text-red-700 bg-red-50 border border-red-200 rounded-md p-4">That student was not found.</p>;

  return (
    <div>
      <Breadcrumbs trail={[{ label: "Students", to: "/students" }, { label: student.name }]} />

      <PageHeading title={student.name} subtitle={student.email} />

      <StudentDetails student={student} />
      <StudentExportButtons student={student} enrollments={courses} />

      <h2 className="font-semibold text-gray-900 mb-3">Enrolled courses ({courses.length})</h2>
      <StudentCourses enrollments={courses} />
    </div>
  );
}
