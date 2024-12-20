function SearchBar({ searchQuery, setSearchQuery }: { searchQuery: string; setSearchQuery: React.Dispatch<React.SetStateAction<string>> }) {
  return (
    <input
      type="text"
      className="w-full p-2 mb-4 bg-gray-700 text-gray-100 rounded-lg focus:outline-none border border-gray-500"
      placeholder="Search notes..."
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
    />
  );
}

export default SearchBar;