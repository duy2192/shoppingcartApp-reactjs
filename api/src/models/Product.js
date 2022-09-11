import mongoose from 'db/mongoDB';
import mongooseDelete from 'mongoose-delete';

const { Schema } = mongoose;

const productSchema = new mongoose.Schema(
  {
    categories: [{ type: Schema.Types.ObjectId, ref: 'category' }],
    name: {
      required: true,
      trim: true,
      type: String,
    },
    description: {
      trim: true,
      type: String,
    },
    price: {
      type: Number,
      required: true,
    },
    salePrice: {
      type: Number,
      default: null,
    },
    thumbnails: [
      {
        type: String,
        trim: true,
      },
    ],
  },
  { timestamps: true }
);

productSchema.plugin(mongooseDelete, { deletedAt: true, overrideMethods: 'all' });

export const Product = mongoose.model('product', productSchema);
