import mongoose from 'db/mongoDB';
import mongooseDelete from 'mongoose-delete';

const { Schema } = mongoose;

const orderDetailSchema = new mongoose.Schema({
  product: { type: Schema.Types.ObjectId, ref: 'product' },
  quantity: { type: Number, required: true },
});

const purchaseOrderSchema = new mongoose.Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'user', required: false },
    email: { type: String, required: true },
    name: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: Number, required: true },
    district: { type: Number, required: true },
    ward: { type: Number, required: true },
    orderDetail: [{ type: orderDetailSchema }],
    totalPrice: {
      type: Number,
      required: true,
    },
    status: {
      type: Number,
      default: 1,
    },
  },
  { timestamps: true }
);

purchaseOrderSchema.plugin(mongooseDelete, { deletedAt: true, overrideMethods: 'all' });

export const PurchaseOrder = mongoose.model('purchaseOrder', purchaseOrderSchema);
