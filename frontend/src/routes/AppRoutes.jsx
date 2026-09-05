// Every URL in the app, in one place.
//
// The pattern is "list, then detail", which is how most of the web works:
//
//   /students        the list
//   /students/5      one student
//   /courses         the list
//   /courses/3       one course
//   /enrollments     the join between them
//   /enrollments/report   the same join, with names filled in
//
// The report lives UNDER enrollments because that is what it is: a view of the
// same rows. It used to be a separate top-level page, which hid the connection.

import { Routes, Route } from "react-router-dom";

import HomePage from "../pages/HomePage.jsx";
import StudentsPage from "../pages/StudentsPage.jsx";
import StudentDetailPage from "../pages/StudentDetailPage.jsx";
import CoursesPage from "../pages/CoursesPage.jsx";
import CourseDetailPage from "../pages/CourseDetailPage.jsx";
import EnrollmentsPage from "../pages/EnrollmentsPage.jsx";
import ReportPage from "../pages/ReportPage.jsx";
import NotFoundPage from "../pages/NotFoundPage.jsx";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />

      <Route path="/students" element={<StudentsPage />} />
      {/* :id is a placeholder. /students/5 gives id = "5" */}
      <Route path="/students/:id" element={<StudentDetailPage />} />

      <Route path="/courses" element={<CoursesPage />} />
      <Route path="/courses/:id" element={<CourseDetailPage />} />

      <Route path="/enrollments" element={<EnrollmentsPage />} />
      <Route path="/enrollments/report" element={<ReportPage />} />

      {/* Anything that matched nothing above */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
