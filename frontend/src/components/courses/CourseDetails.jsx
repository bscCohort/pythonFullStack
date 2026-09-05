// The facts about one course. Same shape as StudentDetails.jsx.
export default function CourseDetails({ course }) {
  const rows = [
    ["Title", course.title],
    ["Code", course.code],
    ["Teacher", course.teacher_name],
    ["Fees", `\u20B9${Number(course.fees).toLocaleString("en-IN")}`],
    ["Duration", `${course.duration_weeks} weeks`],
    ["Course ID", course.id],
  ];

  return (
    <div className="bg-white border rounded-md p-5 mb-6">
      <dl className="grid gap-3 sm:grid-cols-2">
        {rows.map(([label, value]) => (
          <div key={label}>
            <dt className="text-xs uppercase text-gray-500">{label}</dt>
            <dd className="text-sm text-gray-900">{value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
