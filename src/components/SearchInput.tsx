import { useState } from "react";
import { ChangeEvent } from "react";
import { FaSearchDollar } from "react-icons/fa";

interface SearchInputProps {
  onSearch: (coinName: string) => void;
}

function SearchInput({ onSearch }: SearchInputProps) {
  let [inputSearch, setInputSearch] = useState<string>("");

  const handleSearchCountry = (e: ChangeEvent<HTMLInputElement>) => {
    setInputSearch(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <div className="lg:w-3/5 w-full">
      <div
        className={`flex items-center shadow-lg w-full lg:w-4/5 mb-16 px-5 rounded-md`}
      >
        <FaSearchDollar style={{ fontSize: "30px" }} />
        <input
          className={`p-5 border-none focus:outline-none`}
          type="text"
          placeholder="Search for a coin name"
          onChange={handleSearchCountry}
          value={inputSearch}
        />
      </div>
    </div>
  );
}

export default SearchInput;
