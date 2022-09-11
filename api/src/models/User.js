import bcrypt from 'bcryptjs';
import mongooseDelete from 'mongoose-delete';
import mongoose from 'db/mongoDB';
const { Schema } = mongoose;

const cartSchema = new mongoose.Schema({
  product: { type: Schema.Types.ObjectId, ref: 'product' },
  quantity: { type: Number, default: 1 },
});

const userSchema = new mongoose.Schema(
  {
    email: {
      required: true,
      trim: true,
      type: String,
      unique: true,
    },
    cart: [{ type: cartSchema }],
    purchases: [{ type: Schema.Types.ObjectId, ref: 'purchaseOrder' }],
    username: {
      required: true,
      trim: true,
      type: String,
      unique: true,
    },
    name: {
      trim: true,
      type: String,
    },
    phone: {
      trim: true,
      type: String,
    },
    address: {
      trim: true,
      type: String,
    },
    city: {
      trim: true,
      type: Number,
    },
    district: {
      trim: true,
      type: Number,
    },
    ward: {
      trim: true,
      type: Number,
    },
    password: {
      required: true,
      trim: true,
      type: String,
    },
    role: {
      type: String,
      required: true,
      default: 'user',
    },
    status: {
      type: Number,
      required: true,
      default: 1,
    },
    avatar: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

// hash password before save into DB
userSchema.post('validate', function (doc, next) {
  if (this.isModified('password')) {
    doc.password = bcrypt.hashSync(doc.password, 10);
  }

  return next();
});

userSchema.methods.comparePassword = async function (password) {
  const user = this;
  return await bcrypt.compare(password, user.password);
};

userSchema.statics.protectedFields = ['_id', '__v', 'password'];

userSchema.statics.doesNotExist = async (field) => {
  const users = await User.find(field);
  return users.length === 0;
};

if(process.env.NODE_ENV !== 'test') {
  userSchema.plugin(mongooseDelete, { deletedAt: true, overrideMethods: 'all' });

}
export const User = mongoose.model('user', userSchema);
