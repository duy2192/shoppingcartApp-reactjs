export interface Product {
  _id: string;
  name: string;
  price: number;
  salePrice?: number | null;
  description?: string | null;
  thumbnails: string[];
}
export interface IProductFilters {
  _limit?: number|null;
  _page?: number|null;
  _search?: string;
  _sort?: string|null;
  _order?: string|null;
  category?: string|null;
}
