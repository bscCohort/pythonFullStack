// Shows where you are, and lets you climb back up.
//
// This replaces a "Back to profiles" link that was wrong about half the time.
// You could reach a student either from the Students table or from the Profiles
// grid, but the link always said "profiles", so it often sent you somewhere you
// had never been.
//
// A breadcrumb has no such problem, because it describes the HIERARCHY of the
// app rather than guessing your history:
//
//     Students / Aarav Sharma
//
// The browser's own back button already handles "where I came from". This
// answers the different question: "where am I?"

import { Link } from "react-router-dom";

// trail: [{ label: "Students", to: "/students" }, { label: "Aarav Sharma" }]
// The last entry has no "to", because you are already there.
export default function Breadcrumbs({ trail }) {
  return (
    <nav className="text-sm text-gray-500 mb-3">
      {trail.map((step, index) => {
        const isLast = index === trail.length - 1;

        return (
          <span key={step.label}>
            {step.to && !isLast ? (
              <Link to={step.to} className="text-blue-600 hover:underline">
                {step.label}
              </Link>
            ) : (
              <span className="text-gray-700">{step.label}</span>
            )}

            {/* a separator after every step except the last */}
            {!isLast && <span className="mx-2">/</span>}
          </span>
        );
      })}
    </nav>
  );
}
