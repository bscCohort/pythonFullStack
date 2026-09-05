// One course: its details, and who is enrolled in it.
// The mirror image of StudentDetailPage.jsx, using the same useDetail hook.
import { useParams } from "react-router-dom";
import { useDetail } from "../hooks/useDetail.js";
import { courses as coursesApi, studentsForCourse } from "../services/api.js";

import Breadcrumbs from "../components/ui/Breadcrumbs.jsx";
import PageHeading from "../components/ui/PageHeading.jsx";
import Spinner from "../components/ui/Spinner.jsx";
import CourseDetails from "../components/courses/CourseDetails.jsx";
import CourseStudents from "../components/courses/CourseStudents.jsx";

export default function CourseDetailPage() {
  const { id } = useParams();
  const { item: course, related: students, loading, error } =
    useDetail(id, coursesApi.getOne, studentsForCourse);

  if (loading) return <Spinner label="Loading course..." />;
  if (error) return <p className="text-red-700 bg-red-50 border border-red-200 rounded-md p-4">{error}</p>;
  if (!course) return <p className="text-red-700 bg-red-50 border border-red-200 rounded-md p-4">That course was not found.</p>;

  return (
    <div>
      <Breadcrumbs trail={[{ label: "Courses", to: "/courses" }, { label: course.title }]} />

      <PageHeading title={course.title} subtitle={`${course.code} , ${course.teacher_name}`} />

      <CourseDetails course={course} />

      <h2 className="font-semibold text-gray-900 mb-3">Enrolled students ({students.length})</h2>
      <CourseStudents students={students} />
    </div>
  );
}
