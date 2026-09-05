// A label and a text box together, so forms stay short and readable.
export default function Input({ label, name, value, onChange, ...rest }) {
  return (
    <label className="block">
      <span className="block text-sm text-gray-700 mb-1">{label}</span>
      <input
        name={name}
        value={value}
        onChange={onChange}
        className="w-full border rounded-md px-3 py-2 text-sm"
        {...rest}
      />
    </label>
  );
}
