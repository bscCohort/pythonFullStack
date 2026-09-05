// The landing page.
//
// It used to be five cards that repeated the navbar exactly, which added a
// click and taught nothing. It now shows the ORDER of the work, because that
// order is a real dependency and it is the first thing that confuses people:
// "Enrollments" looks broken until students and courses exist.

import { Link } from "react-router-dom";
import PageHeading from "../components/ui/PageHeading.jsx";

function Step({ number, title, text, to, linkText }) {
  return (
    <div className="bg-white border rounded-md p-5 flex gap-4">
      <div className="w-8 h-8 shrink-0 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-semibold">
        {number}
      </div>
      <div>
        <h2 className="font-semibold text-gray-900">{title}</h2>
        <p className="text-sm text-gray-600 mt-1">{text}</p>
        <Link to={to} className="text-sm text-blue-600 hover:underline mt-2 inline-block">
          {linkText} &rarr;
        </Link>
      </div>
    </div>
  );
}

export default function HomePage() {
  return (
    <div>
      <PageHeading
        title="Student Management System"
        subtitle="React in the browser, Python for the API, PostgreSQL for the data."
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <Step
          number="1"
          title="Add students"
          text="Each student is one row in the students table."
          to="/students"
          linkText="Go to Students"
        />
        <Step
          number="2"
          title="Add courses"
          text="Each course is one row in the courses table."
          to="/courses"
          linkText="Go to Courses"
        />
        <Step
          number="3"
          title="Enroll students in courses"
          text="This needs steps 1 and 2 first, because an enrollment points at a student and a course that already exist."
          to="/enrollments"
          linkText="Go to Enrollments"
        />
        <Step
          number="4"
          title="See it joined together"
          text="One SQL query stitches all three tables into a single readable table."
          to="/enrollments/report"
          linkText="Go to the Report"
        />
      </div>

      <p className="text-sm text-gray-500 mt-6">
        The database starts empty. Add a student, then a course, then enroll one
        in the other, and watch each page fill up.
      </p>
    </div>
  );
}
