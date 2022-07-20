import { productApi } from 'api/productApi';
import Pagination from 'components/Pagination';
import { Product, IProductFilters, PaginationParams } from 'models';
import React, { useEffect, useMemo } from 'react';
import ProductFilters from '../components/ProductFilters';
import ProductList from '../components/ProductList';
// import queryString from 'query-string';
import { useLocation, useNavigate } from 'react-router-dom';
export default function ProductPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [productList, setProductList] = React.useState<Product[]>([]);
  const [pagination, setPagination] = React.useState<PaginationParams>({
    _limit: 6,
    _page: 1,
    _total: 0,
  });
  const [loading, setLoading] = React.useState(true);
  const [filters, setFilters] = React.useState<IProductFilters>({
    _limit: 6,
    _page: 1,
  });

  // const queryParams = useMemo<IProductFilters>(() => {
  //   const params: IProductFilters = queryString.parse(location.search);
  //   return {
  //     ...params,
  //     _page: params._page || 1,
  //     _limit: params._limit || 3,
  //     _sort: params._sort,
  //     _order: params._order,
  //   };
  // }, [location.search]);

  useEffect(() => {
    setLoading(true);
    (async () => {
      try {
        const { results, pagination } = await productApi.getAllProduct(filters);
        setProductList(results);
        setPagination(pagination);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    })();
  }, [filters]);

  const handlePageChange = (page: number) => {
    // const filters = {
    //   ...queryParams,
    //   _page: page,
    // };
    // navigate(`?${queryString.stringify(filters)}`);
    setFilters({ ...filters, _page: page });
  };
  const handleFiltersChange = (newFilters: IProductFilters) => {
    // const filters = {
    //   ...queryParams,
    //   ...newFilters,
    // };
    // navigate(`?${queryString.stringify(filters)}`);
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
