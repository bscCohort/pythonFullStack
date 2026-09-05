// Download one student's courses as CSV or PDF.
//
// Both buttons are now one line of real work each, because papaparse and jsPDF
// do the hard part. Compare with the old version: 160 lines of hand-written
// CSV quoting and print-window HTML.
import Button from "../ui/Button.jsx";
import { downloadCsv, downloadPdf } from "../../utils/export.js";

// Which fields go into the file, in order, and their headings.
const COLUMNS = [
  { key: "course_title", label: "Course" },
  { key: "course_code", label: "Code" },
  { key: "teacher_name", label: "Teacher" },
  { key: "fees", label: "Fees" },
  { key: "duration_weeks", label: "Weeks" },
];

export default function StudentExportButtons({ student, enrollments }) {
  // "Aarav Sharma" -> "aarav_sharma", so the filename has no spaces.
  const base = String(student.name).replace(/\s+/g, "_").toLowerCase();

  if (enrollments.length === 0) return null;

  return (
    <div className="flex gap-2 mb-6">
      <Button
        variant="secondary"
        onClick={() => downloadCsv(`${base}.csv`, enrollments, COLUMNS)}
      >
        <i className="fa-solid fa-file-csv"></i> Download CSV
      </Button>

      <Button
        variant="secondary"
        onClick={() =>
          downloadPdf(
            `${base}.pdf`,
            student.name,
            `${student.email} , ${enrollments.length} courses`,
            enrollments,
            COLUMNS
          )
        }
      >
        <i className="fa-solid fa-file-pdf"></i> Download PDF
      </Button>
    </div>
  );
}
