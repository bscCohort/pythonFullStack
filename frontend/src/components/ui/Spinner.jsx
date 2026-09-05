// Shown while we are waiting for the backend to answer.
export default function Spinner({ label = "Loading..." }) {
  return (
    <div className="flex items-center gap-3 text-gray-500 py-6">
      <i className="fa-solid fa-spinner fa-spin"></i>
      <span>{label}</span>
    </div>
  );
}
