// The title at the top of each page.
export default function PageHeading({ title, subtitle }) {
  return (
    <div className="mb-6">
      <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
      {subtitle && <p className="text-gray-600 text-sm mt-1">{subtitle}</p>}
    </div>
  );
}
