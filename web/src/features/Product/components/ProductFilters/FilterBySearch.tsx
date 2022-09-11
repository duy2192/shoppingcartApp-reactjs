import React from 'react';
import { Controller } from 'react-hook-form';
export interface IFilterBySearchProps {
    form: any;
    name: string;
    onChange: () => void;
}
export default function FilterBySearch({form,name,onChange}: IFilterBySearchProps) {
    const handleChange=()=>{
        onChange()
    }
  return (
    <Controller
    name={name}
    control={form.control}
    render={({ field: { onChange, onBlur, value, name }, fieldState: { error } }) => (
    <div className="flex items-center relative select-none shadow-md rounded-md overflow-hidden">
      <input type="text" placeholder='Tìm kiếm' className="w-60 p-2 font-medium outline-none" onChange={(e)=>{onChange(e.target.value);handleChange()}}/>
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
    </div>)}/>
  );
}
