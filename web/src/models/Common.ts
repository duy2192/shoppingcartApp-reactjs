
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

export interface ProvinceParams {
  city?: number;
  district?: number;
  ward?: number;
}

export interface ProvinceInfo  {
  text: string;
  value: number;
  city?: number;
  district?: number;
}
export interface IProvince {
  city: ProvinceInfo[];
  district: ProvinceInfo[] ;
  ward: ProvinceInfo[]
}