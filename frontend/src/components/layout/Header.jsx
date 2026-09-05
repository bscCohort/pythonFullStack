// The navbar.
//
// THREE items, one per database table. That is deliberate.
//
// It used to have five: Students, Courses, Enrollments, Report and Profiles.
// But "Profiles" showed the same rows as "Students", and "Report" showed the
// same rows as "Enrollments", so two of the five were duplicates with no hint
// that they were. Now the navbar matches the data model exactly, and the extra
// views are reached from the page they belong to.

import { NavLink } from "react-router-dom";

function NavItem({ to, icon, label }) {
  return (
    <NavLink
      to={to}
      // NavLink knows whether it is the current page, so we can highlight it.
      // "end" stops /students staying highlighted while you are on /students/5.
      className={({ isActive }) =>
        "flex items-center gap-2 " +
        (isActive
          ? "text-blue-700 font-semibold border-b-2 border-blue-600 pb-1"
          : "text-gray-600 hover:text-blue-600")
      }
    >
      <i className={icon}></i>
      {label}
    </NavLink>
  );
}

export default function Header() {
  return (
    <header className="bg-white border-b">
      <div className="max-w-6xl mx-auto px-4 py-4 flex flex-wrap items-center gap-8">
        <NavLink to="/" className="font-bold text-gray-900">
          Student Management System
        </NavLink>

        <nav className="flex flex-wrap items-center gap-6 text-sm">
          <NavItem to="/students" icon="fa-solid fa-user-graduate" label="Students" />
          <NavItem to="/courses" icon="fa-solid fa-book" label="Courses" />
          <NavItem to="/enrollments" icon="fa-solid fa-link" label="Enrollments" />
        </nav>
      </div>
    </header>
  );
}
