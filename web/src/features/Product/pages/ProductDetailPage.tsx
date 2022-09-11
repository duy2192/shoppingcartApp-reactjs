import { productApi } from 'api';
import { useAppDispatch } from 'app/hooks';
import classNames from 'classnames';
import { BreadCrumb } from 'components/Common';
import { SpinnerLoading } from 'components/Loading';
import { cartActions } from 'features/Cart/services/cartSlice';
import { Product } from 'models';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { formatPrice, getPrice } from 'utils';

export default function ProductDetailPage() {
  const { productId } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const { results } = await productApi.getProductById(productId || '');
        setProduct(results);
        console.log(results);
      } catch (error) {
        navigate('/product');
      } finally {
        setLoading(false);
      }
    })();
  }, [productId]);

  const handleAddToCart = async () => {
    dispatch(cartActions.addToCart({ product: product, quantity: 1 }));
    dispatch(cartActions.showCartNotification(product?.thumbnails[0]));

    await new Promise((resolve) => setTimeout(resolve, 3000));

    dispatch(cartActions.showCartNotification(''));
  };
  if (!product)
    return (
      <div className="h-screen flex justify-center items-center">
        <SpinnerLoading />
      </div>
    );

  return (
    <div className=" min-h-screen sm:mx-20 pt-10">
      <BreadCrumb
        ancestors={[
          { name: product.categories[0].name, path: '/' },
          { name: product.name, path: '/' },
        ]}
      />
      <div className="flex sm:flex-row flex-col items-center  p-1 sm:p-3 border rounded-md shadow-sm mt-4">
        <div>
          <img className="w-40" src={product?.thumbnails[0]} alt="" />
        </div>
        <div className="sm:ml-10 ml-4">
          <h2 className="text-2xl font-bold uppercase text-slate-800">{product?.name}</h2>
          <div className="flex sm:flex-row flex-col sm:gap-2 sm:items-center items-start">
            <span className={classNames('text-red-500 font-bold text-2xl', {})}>{getPrice(product, 1)}</span>
            {product?.salePrice && (
              <span className="text-slate-500 text-lg  line-through">{formatPrice(product?.price)}</span>
            )}
          </div>
          <div className="flex flex-wrap gap-3 mb-6 text-sm font-medium mt-4">
            <button
              className="h-10 px-6 font-semibold rounded-md border border-slate-200 text-slate-900 text-md hover:shadow-md hover:text-slate-500"
              type="button"
              onClick={handleAddToCart}
            >
              Thêm vào giỏ
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
