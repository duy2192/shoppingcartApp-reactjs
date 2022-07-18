import { productApi } from 'api/productApi';
import Pagination from 'components/Pagination';
import { Product, IProductFilters, PaginationParams } from 'models';
import React, { useEffect } from 'react';
import ProductFilters from '../components/ProductFilters';
import ProductList from '../components/ProductList';

export default function ProductPage() {
  const [productList, setProductList] = React.useState<Product[]>([]);
  const [pagination, setPagination] = React.useState<PaginationParams>({
    _limit: 3,
    _page: 1,
    _total: 0,
  });
  const [loading, setLoading] = React.useState(true);
  const [filters, setFilters] = React.useState<IProductFilters>({
    _limit: 3,
    _page: 1,
  });
  useEffect(() => {
    setLoading(true);
    (async () => {
      const { results, pagination } = await productApi.getAllProduct(filters);
      setProductList(results);
      setPagination(pagination);
      setLoading(false);
      console.log(Math.ceil(10 / 3))
    })();
  }, [filters]);

  const handlePageChange = (page: number) => {
    setFilters({ ...filters, _page: page });
  };
  const handleFiltersChange = (newFilters: IProductFilters) => {
    setFilters({ ...filters, ...newFilters });
  };
  return (
    <div className="bg-slate-50 min-h-screen">
      <div>
        <ProductFilters onChange={handleFiltersChange} />
      </div>
      <div>
        <ProductList productList={productList} loading={loading} />
      </div>
      <div className="flex justify-center mt-10">
        {pagination._total > 0 && (
          <Pagination
            page={filters._page || 1}
            pageSize={Math.ceil(pagination._total / pagination._limit)}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </div>
  );
}
