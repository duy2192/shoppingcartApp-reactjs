import { DropdownData } from 'components/FormControl/Dropdown';

export interface Product {
  _id: string;
  name: string;
  price: number;
  salePrice: number | null;
  description: string | null;
  thumbnails: string[];
}
export interface IProductFilters {
  _limit?: number;
  _page?: number;
  _search?: string;
  _sort?: string;
  _order?: string;
  category?: string;
}
