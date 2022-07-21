import { DropdownData, FormDropdownData } from 'components/FormControl/Dropdown';
import { IProductFilters } from 'models';
import { useForm } from 'react-hook-form';
import FilterByCategories from './FilterByCategories';
import FilterBySearch from './FilterBySearch';
import FilterBySort from './FilterBySort';

export interface IProductFiltersProps {
  onChange: (value: IProductFilters) => void;
}
export default function ProductFilters({ onChange }: IProductFiltersProps) {
  const form = useForm<FormDropdownData>({
    defaultValues: {
      category: null,
      _search: null,
      _sort: null,
      _order: null,
    },
  });
  const handleChange = () => {
    const filters = form.getValues();
    onChange({ ...filters, category: filters?.category?.value });
  };
  return (
    <div className="flex items-center px-20 border-b-2 py-5">
      <div className="">
        <span className="font-semibold text-2xl select-none block">Sản phẩm</span>
      </div>
      <div className="flex items-center ml-8 ">
        <form className="flex flex-wrap gap-5 ">
          <div className="">
            <FilterBySearch form={form} name="_search" onChange={handleChange} />
          </div>

          <div className="">
            <FilterByCategories form={form} name="category" onChange={handleChange} />
          </div>
          {/* <div className=''>
            <FilterBySort />
          </div> */}
        </form>
      </div>
    </div>
  );
}
