const SearchBar = ({ onSearch, placeholder }) => {
  return (
    <div className="relative">
      {/* The input is intentionally generous so search feels approachable on desktop and mobile. */}
      <input
        type="text"
        onChange={(e) => onSearch(e.target.value)}
        placeholder={placeholder || "Search..."}
        className="w-full rounded-2xl border-2 border-gray-700 bg-gray-800 p-4 pl-12 text-base text-white outline-none transition-all shadow-inner focus:border-yellow-600 md:py-4"
      />
      <span className="absolute left-4 top-1/2 -translate-y-1/2 opacity-50">🔍</span>
    </div>
  );
};

export default SearchBar;
