import { Category } from './Category';

export interface Product {
  _id: string;
  name: string;
  price: number;
  salePrice: number | null;
  description: string | null;
  thumbnails: string[];
  categories: Category[];
}
export interface IProductFilters {
  _limit?: number;
  _page?: number;
  _search: string | null;
  _sort: string | null;
  _order: string | null;
  category: string | null;
}
