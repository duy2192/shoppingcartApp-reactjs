import { newPO } from 'assets/mailTemplate';
import mongoose from 'db/mongoDB';
import { Product, PurchaseOrder } from 'models';
import { sendMail } from 'utils';
import { formatPrice, convertDatetime } from 'utils';

const { Types } = mongoose;

export const purchaseOrderService = {
  async createPurchaseOrderGuest(payload) {
    const product = await Product.find({
      _id: { $in: payload.orderDetail.map((item) => item.product) },
    }).select('_id price salePrice name');
    const orderDetail = product.map((item) => {
      return {
        product: item,
        quantity: payload.orderDetail.find((orderItem) => orderItem.product === item._id.toString())
          ?.quantity,
        price: item.price,
        salePrice: item.salePrice,
      };
    });
    const purchaseOrder = new PurchaseOrder({
      ...payload,
      orderDetail,
      totalPrice: orderDetail.reduce(
        (total, item) => total + item.quantity * (item.salePrice || item.price),
        0
      ),
    });
    const send = newPO(purchaseOrder,orderDetail)

    await sendMail(send, payload.email, '[Đơn hàng mới] ');
    await purchaseOrder.save();
  },
};
