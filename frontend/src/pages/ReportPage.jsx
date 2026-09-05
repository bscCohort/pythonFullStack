// The joined report. Read-only.
import { useResource } from "../hooks/useResource.js";
import { report } from "../services/api.js";

import Breadcrumbs from "../components/ui/Breadcrumbs.jsx";
import PageHeading from "../components/ui/PageHeading.jsx";
import ReportTable from "../components/reports/ReportTable.jsx";

export default function ReportPage() {
  // The report is read-only, so add/edit/delete are simply unused here.
  const { items: rows, loading } = useResource(report, { one: "Report" });

  return (
    <div>
      <Breadcrumbs
        trail={[{ label: "Enrollments", to: "/enrollments" }, { label: "Report" }]}
      />

      <PageHeading
        title="Enrollment report"
        subtitle="The same rows as the Enrollments page, but with the student and course details filled in."
      />

      <div className="bg-blue-50 border border-blue-200 rounded-md p-4 mb-6 text-sm text-blue-900">
        <strong>What changed?</strong> The Enrollments page shows
        <code className="mx-1 px-1 bg-white rounded">student_id</code> and
        <code className="mx-1 px-1 bg-white rounded">course_id</code>, which are just numbers.
        Here the database has JOINed all three tables, so you get names, codes and fees
        instead. Same data, one SQL query, far more readable.
      </div>


      <ReportTable rows={rows} loading={loading} />
    </div>
  );
}
