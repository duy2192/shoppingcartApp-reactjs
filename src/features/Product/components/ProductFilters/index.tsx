import { IProductFilters } from 'models';
import { useForm } from 'react-hook-form';
import FilterByCategories from './FilterByCategories';
import FilterBySearch from './FilterBySearch';

export interface IProductFiltersProps {
  onChange: (value: IProductFilters) => void;
}
export default function ProductFilters({ onChange }: IProductFiltersProps) {
  const form = useForm({
    defaultValues: {
      category: null,
      _search: null,
      _sort: null,
      _order: null,
    },
  });
  const handleChange = () => {
    const filters = form.getValues();
    onChange(filters);
  };
  return (
    <div className="flex items-center px-10 border-b-2 py-5 flex-wrap gap-8">
      <div className="">
        <span className="font-semibold text-2xl select-none block">Sản phẩm</span>
      </div>
      <div className="">
        <form className="flex flex-wrap gap-5 items-center">
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
