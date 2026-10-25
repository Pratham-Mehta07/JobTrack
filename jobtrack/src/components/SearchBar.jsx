// Controlled search box: the parent keeps the text and decides what to filter
function SearchBar({ value, onChange }) {
  return (
    <input
      type="search"
      value={value}
      onChange={(event) => onChange(event.target.value)}
      placeholder="Search by company name..."
      aria-label="Search by company name"
      className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
    />
  )
}

export default SearchBar
