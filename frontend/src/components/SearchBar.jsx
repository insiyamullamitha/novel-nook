import { useState } from "react";
import SearchIcon from "../icons/SearchIcon";

export default function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState("");
  return (
    <div className="flex flex-row mt-8 h-9 items-center justify-center">
      <input
        type="text"
        className="w-1/2 border-2 bg-white text-black border-black rounded-lg p-2"
        placeholder="Search for a book"
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button
        onClick={() => onSearch(searchTerm)}
        className="bg-accent3 text-white rounded-lg p-2 ml-2 hover:bg-accent2 transition-all"
      >
        <SearchIcon />
      </button>
    </div>
  );
}
