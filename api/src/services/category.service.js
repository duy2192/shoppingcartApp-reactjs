import { Category } from 'models';
import { log } from 'utils';

export const categoryService = {
  async getAllCategory() {
    const category = await Category.find();

    return category;
  },
  async addCategory(payload) {
    const category = new Category({
      ...payload,
    });

    await category.save();
    return category;
  },
  async removeCategory(payload) {
    const category = await Category.findById(payload.id);
    if (!category) throw 'Invalid';

    await category.deleteOne();
    return category;
  },
};
