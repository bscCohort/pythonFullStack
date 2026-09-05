// A dropdown. options is a list of { value, label }.
export default function Select({ label, name, value, onChange, options, ...rest }) {
  return (
    <label className="block">
      <span className="block text-sm text-gray-700 mb-1">{label}</span>
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="w-full border rounded-md px-3 py-2 text-sm bg-white"
        {...rest}
      >
        <option value="">-- choose --</option>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </label>
  );
}
