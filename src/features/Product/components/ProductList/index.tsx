import { Product } from 'models';
import React from 'react';
import ProductCard from '../ProductCard';
export interface IProductListProps {
  productList: Product[];
  loading: boolean;
}

export default function ProductList({ productList, loading }: IProductListProps) {
  return (
    <div className=" flex  mt-8 flex-wrap   w-full">
      {productList.map((item, index) => (
        <div key={index} className="lg:w-1/3 md:w-1/2 w-full px-3 py-2">
          <ProductCard product={item} loading={loading} />
        </div>
      ))}
    </div>
  );
}
