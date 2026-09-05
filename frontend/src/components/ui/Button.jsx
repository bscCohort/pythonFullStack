// One button, used everywhere, so the app looks consistent.
const STYLES = {
  primary: "bg-blue-600 text-white hover:bg-blue-700",
  secondary: "bg-white text-gray-700 border hover:bg-gray-50",
  danger: "bg-red-600 text-white hover:bg-red-700",
};

export default function Button({ variant = "primary", children, ...rest }) {
  return (
    <button
      className={
        "inline-flex items-center gap-2 px-4 py-2 rounded-md text-sm disabled:opacity-50 " +
        STYLES[variant]
      }
      {...rest}
    >
      {children}
    </button>
  );
}
