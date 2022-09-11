import { createSlice } from '@reduxjs/toolkit';



export interface ProductState {

}

const initialState:ProductState = {

};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {    
   
  },
});

// Actions
export const productActions = productSlice.actions;
// Selectors

// Reducer
const productReducer = productSlice.reducer;
export default productReducer;