import { categoryApi } from 'api';
import Dropdown, { DropdownData } from 'components/FormControl/Dropdown';
import React, { useEffect } from 'react';
export interface IFilterByCategoriesProps {
  form: any;
  name: string;
  onChange: () => void;
}
export default function FilterByCategories({ form ,name,onChange}: IFilterByCategoriesProps) {
  const [categoryList, setCategoryList] = React.useState<DropdownData[]>([
    {
      text: '----',
      value: null,
    },
  ]);
  useEffect(() => {
    (async () => {
      const { results } = await categoryApi.getAll();
      setCategoryList(
        categoryList.concat(
          results.map((item) => ({
            text: item.name,
            value: item._id,
          }))
        )
      );
    })();
  }, []);
  return (
    <div className="w-60">
      <Dropdown onChange={onChange} className='w-full' label="Danh mục" placeholder="Tìm kiếm ..." name={name} form={form} data={categoryList} />
    </div>
  );
}
