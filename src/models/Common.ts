import { DropdownData } from 'components/FormControl/Dropdown';

export interface PaginationParams {
  _limit: number;
  _page: number;
  _total: number;
}

export interface ApiResponse<T = any> {
  message: string;
  results: T;
  pagination: PaginationParams;
}

export interface Province {
  city: DropdownData[];
  district: DropdownData[];
  ward: DropdownData[];
}
export interface ProvinceParams {
  city?: number;
  district?: number;
  ward?: number;
}
