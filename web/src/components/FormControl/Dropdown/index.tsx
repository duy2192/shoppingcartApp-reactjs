import { useEffect, useRef, useState } from 'react';
import { Controller } from 'react-hook-form';

export interface DropdownData<T = number> {
  text: string;
  value: T | null;
}

export interface DropdownProps {
  haveSearch?: boolean;
  haveIcon?: boolean;
  label?: string;
  placeholder?: string;
  type?:string;
  data?: DropdownData<any>[];
  className?: string;
  disabled?: boolean;
  form: any;
  name: string;
  onChange?: (value:  any) => void;
}
const Dropdown = (props: DropdownProps) => {
  const {
    name,
    form,
    haveSearch = true,
    haveIcon = true,
    label,
    placeholder,
    className,
    data = [],
    onChange = () => {},
  } = props;
  const [showDropdown, setShowDropdown] = useState(false);
  const [dataDropdown, setDropdownData] = useState<DropdownData[]>(data);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleToggleDropdown = () => {
    setShowDropdown(!showDropdown);
    setDropdownData(data);
  };

  const handleClickItem = (value: any) => {
    setShowDropdown(false);
    onChange(value);
  };

  const handleSearch = (e: any) => {
    const { value } = e.target;
    const dataSearch = data.filter((item) => item.text.toLowerCase().includes(value.toLowerCase()));
    setDropdownData(dataSearch);
  };
  useEffect(() => {
    function handleClickOutside(e: any) {
      if (dropdownRef.current && dropdownRef.current.contains(e.target)) {
        return;
      }
      setShowDropdown(false);
    }
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);
  return (
    <Controller
      name={name}
      control={form.control}
      render={({ field: { onChange, onBlur, value, name }, fieldState: { error } }) => (
        <div className={className}>
          <div className={`bg-white w-full  relative shadow-md rounded-lg `} ref={dropdownRef}>
            <div
              className="flex items-center justify-between p-2 border rounded-lg cursor-pointer border-slate-100 z-0"
              onClick={handleToggleDropdown}
            >
              <span className="font-semibold z-0 select-none">
                {data?.find((item) => item.value == value)?.text || label}
              </span>
              {haveIcon && (
                <span>
                  {showDropdown ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7" />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  )}
                </span>
              )}
            </div>
            {showDropdown && (
              <div
                className="z-30 absolute left-0 right-0 bg-white border rounded-lg 
              dropdown-list top-full border-slate-100 select-none"
              >
                <div className="max-h-60 overflow-y-auto">
                  {dataDropdown?.map((item, index) => (
                    <span
                      onClick={() => {
                        onChange(item.value);
                        handleClickItem(item.value);
                      }}
                      key={index}
                      className="block p-2  cursor-pointer hover:bg-slate-100"
                    >
                      {item.text}
                    </span>
                  ))}
                </div>
                {haveSearch && (
                  <div className="block p-1 bg-white dropdown-search border-t-2">
                    <input
                      type="text"
                      name="search"
                      placeholder={placeholder}
                      className="w-full p-2 outline-none"
                      onChange={handleSearch}
                    />
                  </div>
                )}
              </div>
            )}
          </div>
          {error && <span className="text-red-500 font-semibold text-xs block mt-2">{error?.message}</span>}
        </div>
      )}
    />
  );
};

export default Dropdown;
