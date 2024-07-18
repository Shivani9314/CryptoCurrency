import { ChangeEvent } from "react";

interface SortByProfitProps {
  onSort: (order: string) => void;
}

function Sort({ onSort }: SortByProfitProps) {
  const handleSortChange = (e: ChangeEvent<HTMLSelectElement>) => {
    onSort(e.target.value);
  };
  return (
    <div className="flex gap-5">
      <select
        className={`py-0 lg:py-0 h-14 px-5 focus:outline-none shadow-lg border-none bg-white rounded-md appearance-none hover:cursor-pointer`}
        onChange={handleSortChange}
      >
        <option value="" hidden>
          Sort By Profit
        </option>
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
      </select>
    </div>
  );
}

export default Sort;
