import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit';
import { purchaseOrderApi, userApi } from 'api';
import { Product } from 'models';
import { PurchaseOrder } from 'models/PurchaseOrder';
import { mergeCart } from 'utils';

export interface ICartItem {
  product: Product;
  quantity: number | 0;
}

export interface CartState {
  cartItems: ICartItem[];
  cartNotification: string;
}

const initialState: CartState = {
  cartItems: [],
  cartNotification: '',
};

export const submitPurchaseOrderGuest = createAsyncThunk(
  'cart/submitGuest',
  async (payload: PurchaseOrder) => {
    const { results } = await purchaseOrderApi.createPurchaseOrder(payload);

    return results;
  }
);
export const submitPurchaseOrderUser = createAsyncThunk('cart/submitUser', async (payload: PurchaseOrder) => {
  const { results } = await userApi.createPurchaseOrder(payload);

  return results;
});

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    showCartNotification(state, action) {
      state.cartNotification = action.payload;
    },
    mergeCart(state, action) {
      const currentCart = [...state.cartItems];
      state.cartItems = mergeCart(currentCart, action.payload);
    },
    setCart(state, action) {
      state.cartItems = action.payload;
    },
    addToCart(state, action) {
      const { product, quantity = 1 } = action.payload;
      const index = state.cartItems.findIndex((item) => item.product._id === product._id);
      if (index >= 0) {
        state.cartItems[index].quantity += quantity;
      } else {
        state.cartItems.push({
          product: product,
          quantity: quantity,
        });
      }
    },
    removeFromCart(state, action) {
      const productId = action.payload;
      const index = state.cartItems.findIndex((item) => item.product._id === productId);
      if (index >= 0) {
        state.cartItems.splice(index, 1);
      }
    },
    setQuantity(state, action) {
      const { productId, quantity } = action.payload;
      const index = state.cartItems.findIndex((item) => item.product._id === productId);
      if (index >= 0) {
        state.cartItems[index].quantity = quantity;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitPurchaseOrderUser.fulfilled, (state, action) => {
        state.cartItems = [];
      })
      .addCase(submitPurchaseOrderUser.rejected, (state, action) => {})
      .addCase(submitPurchaseOrderGuest.fulfilled, (state, action) => {
        state.cartItems = [];
      })
      .addCase(submitPurchaseOrderGuest.rejected, (state, action) => {});
  },
});

// Actions
export const cartActions = cartSlice.actions;

// Selectors
export const selectCartItems = (state: any) => state.cart.cartItems;

export const selectCartItemsCount = createSelector(selectCartItems, (cartItems) =>
  cartItems.reduce((count: number, item: ICartItem) => count + item.quantity, 0)
);

export const selectCartTotal = createSelector(selectCartItems, (cartItems) =>
  cartItems.reduce((total: number, item: ICartItem) => total + item.product.price * item.quantity, 0)
);

export const selectCartNotification = (state: any) => state.cart.cartNotification;

// Reducer
const cartReducer = cartSlice.reducer;
export default cartReducer;
