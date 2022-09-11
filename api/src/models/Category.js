import mongoose from 'db/mongoDB';
import mongooseDelete from 'mongoose-delete';

const { Schema } = mongoose;
const categorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    products: [{ type: Schema.Types.ObjectId, ref: 'product' }],
    status: {
      type: Number,
      default: 1,
    },
  },
  { timestamps: true }
);
categorySchema.plugin(mongooseDelete, { deletedAt: true, overrideMethods: 'all' });

export const Category = mongoose.model('category', categorySchema);
