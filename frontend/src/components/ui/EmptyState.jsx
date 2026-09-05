// Shown when a list came back with zero rows.
export default function EmptyState({ message = "Nothing here yet." }) {
  return (
    <div className="text-center text-gray-500 py-10 border rounded-md bg-white">
      <i className="fa-regular fa-folder-open text-2xl mb-2 block"></i>
      {message}
    </div>
  );
}
