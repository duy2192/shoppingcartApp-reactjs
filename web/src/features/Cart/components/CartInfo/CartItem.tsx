import { yupResolver } from '@hookform/resolvers/yup';
import { useAppDispatch } from 'app/hooks';
import QuantityField from 'components/FormControl/QuantityField';
import { cartActions, ICartItem } from 'features/Cart/services/cartSlice';
import { useForm } from 'react-hook-form';
import { getPrice } from 'utils';
import * as yup from 'yup';

export interface CartItemProps {
  item: ICartItem;
}
export default function CartItem({ item }: CartItemProps) {
  const dispatch = useAppDispatch();
  const schema = yup.object().shape({
    quantity: yup
      .number()
      .required('Chọn số lượng!')
      .min(1, 'Số lượng phải lớn hơn 0')
      .typeError('Số lượng phải lớn hơn 0')
      .integer('Số lượng không hợp lệ'),
  });
  const form = useForm({
    defaultValues: {
      quantity: item.quantity,
    },
    resolver: yupResolver(schema),
    reValidateMode: 'onChange',
    mode: 'onChange',
  });

  const handleRemove = () => {
    dispatch(cartActions.removeFromCart(item.product._id));
  };

  const handleChangeQuantity = (value: number) => {
    dispatch(cartActions.setQuantity({ productId: item.product._id, quantity: value }));
  };

  const handleSubmit = (value: any) => {
    dispatch(cartActions.setQuantity({ productId: item.product._id, quantity: value.quantity }));
  };
  return (
    <div className="flex shadow-sm relative max-h-40 rounded-xl">
      <div className="rounded-xl overflow-hidden">
        <img className=" w-40 h-auto" src={item.product.thumbnails[0]} alt="cart item" />
      </div>
      <div className="p-3 flex flex-col justify-between w-full">
        <div>
          <p className="font-semibold line-clamp-2">{item.product.name}</p>
        </div>
        <div className="flex justify-between w-full items-center">
          <div>
            <form onSubmit={form.handleSubmit(handleSubmit)}>
              <QuantityField min={1} max={99} form={form} name="quantity" onChange={handleChangeQuantity} />
            </form>
          </div>

          <div>
            <span className="text-black font-semibold">{getPrice(item.product, item.quantity)}</span>
          </div>
        </div>
      </div>

      <div className="absolute right-0 hover:bg-slate-300 rounded-md cursor-pointer" onClick={handleRemove}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </div>
    </div>
  );
}
