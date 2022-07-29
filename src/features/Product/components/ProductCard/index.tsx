import { useAppDispatch } from 'app/hooks';
import { cartActions } from 'features/Cart/services/cartSlice';
import { Product } from 'models';
import { formatPrice, getPrice, getSalePercent } from 'utils';
export interface IProductCardProps {
  product: Product;
  loading?: boolean;
}
export default function ProductCart({ product, loading }: IProductCardProps) {
  const dispatch = useAppDispatch();

  const { name, price, thumbnails, salePrice } = product;

  const handleAddToCart = async () => {
    dispatch(cartActions.addToCart({ product: product, quantity: 1 }));
    dispatch(cartActions.showCartNotification(thumbnails[0]));

    await new Promise((resolve) => setTimeout(resolve, 3000));

    dispatch(cartActions.showCartNotification(''));
  };
  return (
    <div className="flex font-sans rounded-md overflow-hidden h-60 shadow-md w-full bg-white relative">
      {salePrice && (
        <div className="absolute top-0 right-0 bg-red-400 px-1">
          <span className="font-medium text-sm text-slate-50">
            Giảm giá {getSalePercent(salePrice, price)}%
          </span>
        </div>
      )}

      <div className="flex-none w-1/2 relative cursor-pointer">
        {!loading ? (
          <img
            src={thumbnails[0]}
            alt=""
            className="absolute inset-0 w-60 h-auto p-4 select-none"
            loading="lazy"
          />
        ) : (
          <div
            role="status"
            className="space-y-8 animate-pulse md:space-y-0 md:space-x-8 md:flex md:items-center"
          >
            <div className="flex justify-center items-center h-60 bg-gray-300 rounded sm:w-96 dark:bg-gray-700">
              <svg
                className="w-12 h-full object-cover text-gray-200"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 640 512"
              >
                <path d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z" />
              </svg>
            </div>
          </div>
        )}
      </div>
      {loading ? (
        <div role="status" className="w-full animate-pulse">
          <div className="h-5 mt-4 ml-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-4"></div>
          <div className="h-3 ml-2 bg-gray-200 rounded-md dark:bg-gray-700 max-w-[360px] mb-2.5"></div>
        </div>
      ) : (
        <form className="flex-auto p-6">
          <div className="flex flex-wrap">
            <h1 className="flex-auto text-lg font-semibold text-slate-900 line-clamp-2 h-14">{name}</h1>
            <div className="text-lg font-semibold text-slate-700 flex flex-col h-14">
              {salePrice && (
                <span className=" line-through text-md text-slate-500">{formatPrice(price)}</span>
              )}
              <span>{getPrice(product)}</span>
            </div>
            <div className="w-full flex-none text-sm font-medium text-slate-700 mt-2">Còn hàng</div>
          </div>

          <div className="flex flex-wrap gap-3 mb-6 text-sm font-medium">
            <button
              className="h-10 px-6 font-semibold rounded-md border border-slate-200 text-slate-900 text-md hover:shadow-md hover:text-slate-500"
              type="button"
              onClick={handleAddToCart}
            >
              Thêm vào giỏ
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
