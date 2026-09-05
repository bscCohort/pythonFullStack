// The top half of a profile page: who the student is.
export default function StudentDetails({ student }) {
  const rows = [
    ["Name", student.name],
    ["Email", student.email],
    ["Year", student.year],
    ["Student ID", student.id],
    ["Added on", String(student.created_at).slice(0, 10)],
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
