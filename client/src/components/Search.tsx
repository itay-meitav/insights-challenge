function Search() {
  return (
    <div className="relative ml-3 rounded-md shadow-sm">
      <input
        type="text"
        name="search"
        id="search"
        className="block w-full rounded-md border-gray-300 pl-3 pr-12 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        placeholder="Search Here..."
      />
    </div>
  );
}

export default Search;
