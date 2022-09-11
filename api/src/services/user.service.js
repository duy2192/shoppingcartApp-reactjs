import { newPO } from 'assets/mailTemplate';
import { Product, PurchaseOrder, User } from 'models';
import { sendMail } from 'utils';

export const userService = {
  async findOne(payload) {
    const user = await User.findById(payload.user);
    if (!user) throw 'Invalid User!';
    return user;
  },
  async changePassword(userId, payload) {
    const user = await this.findOne({ user: userId });

    if (!user) throw 'Invalid User!';
    const checkPassword = await user.comparePassword(payload.oldPassword);
    if (!checkPassword) throw 'Mật khẩu cũ không chính xác!';
    user.password = payload.newPassword;
    await user.save();
    return user;
  },
  async updateProfile(userId, payload) {
    const user = await User.findByIdAndUpdate(userId, payload, { new: true });
    await user.save();
    return user;
  },
  async addToCart(userId, payload) {
    const user = await this.findOne({ user: userId });
    user.cart = payload.cart;
    await user.save();
    return user;
  },

  async getAllOrders(userId, payload) {
    const orders = await PurchaseOrder.find({ user: userId }).populate('orderDetail.product');

    return orders;
  },
  async getOrderById(userId, payload) {
    const orders = await PurchaseOrder.findById(payload.orderId).populate('orderDetail.product');
    if (!orders) throw 'Invalid Order!';
    if (orders?.user.toString() !== userId.toString()) throw 'Invalid User!';
    return orders;
  },

  async createPurchaseOrderUser(userId, payload) {
    const user = await this.findOne({ user: userId });
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
      user: userId,
      ...payload,
      orderDetail: orderDetail,
      totalPrice: orderDetail.reduce(
        (total, item) => total + item.quantity * (item.salePrice || item.price),
        0
      ),
    });
    user.purchases.push(purchaseOrder._id);
    user.cart = [];
    const send = newPO(purchaseOrder,orderDetail)
    await sendMail(send, payload.email, '[Đơn hàng mới] ');
    await Promise.all([user.save(), purchaseOrder.save()]);
    return purchaseOrder;
  },

  async cancelOrder(userId, payload) {
    const orders = await this.getOrderById(userId, payload);

    if (orders.status === 0) throw 'Đơn hàng đã hủy!';
    if (orders.status === 2) throw 'Đơn hàng đã giao!';
    await orders.updateOne({ status: 0 }, { new: true });

    return orders;
  },
};
