import { categoryApi } from 'api';
import Dropdown, { DropdownData } from 'components/FormControl/Dropdown';
import React, { useEffect } from 'react';
export interface IFilterBySortProps {
}
export default function FilterBySort() {
  const [sort, setSort] = React.useState<DropdownData[]>([
    {
      text: '----',
      value: null,
    },
  ]);
  return (
    <div className="flex items-center relative select-none shadow-md rounded-md overflow-hidden">
      <input type="text" className="w-60 p-2  outline-none" />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-8 w-8 text-slate-400 absolute right-0"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
          clipRule="evenodd"
        />
      </svg>
    </div>
  );
}
