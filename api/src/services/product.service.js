import { Category, Product } from 'models';
import { log } from 'utils';
import { Types } from 'mongoose';

export const productService = {
  async getAllProduct(payload) {
    const [product, total] = await Promise.all([
      Product.find({
        $or: [{ name: new RegExp(payload._search, 'i') }, { description: new RegExp(payload._search, 'i') }],
        ...(payload.category && { categories: Types.ObjectId(payload.category) }),
      })
        .populate('categories')
        .sort({ [`${payload._sort}`]: payload._order })
        .skip((payload._page - 1) * payload._limit)
        .limit(payload._limit),

      Product.find({
        $or: [{ name: new RegExp(payload._search, 'i') }, { description: new RegExp(payload._search, 'i') }],
        ...(payload.category && { categories: Types.ObjectId(payload.category) }),
      }),
    ]);

    return {
      data: product,
      pagination: {
        _total: total.length,
        _page: payload._page,
        _limit: payload._limit,
      },
    };
  },
  async getProductById(payload) {
    const product = await Product.findById(payload.productId).populate('categories');
    if (!product) throw 'Invalid';
    return product;
  },

  async addProduct(payload) {
    const categories = await Category.find({ _id: { $in: [...payload.categories] } });
    if (categories.length !== payload.categories.length) {
      throw 'Invalid category';
    }
    const product = new Product({
      ...payload,
    });

    await Promise.all(
      categories.map((category) => {
        category.products.push(product._id);
        return category.save();
      })
    );
    await product.save();
    return product;
  },
  async removeProduct(payload) {
    const product = await Product.findById(payload.id);
    if (!product) throw 'Invalid';

    await product.deleteOne();
    return product;
  },
};
