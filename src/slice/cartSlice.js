import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItem: JSON.parse(localStorage.getItem("cart")) || [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;
      const existingProduct = state.cartItem.find((p) => p._id === product._id);

      if (existingProduct) {
        existingProduct.cartQuantity += product.cartQuantity || 1;
      } else {
        state.cartItem.push({ ...product, cartQuantity: 1 });
      }

      localStorage.setItem("cart", JSON.stringify(state.cartItem));
    },

    removeCartItem: (state, action) => {
      const product = action.payload;
      state.cartItem = state.cartItem.filter((p) => p._id !== product._id);
      localStorage.setItem("cart", JSON.stringify(state.cartItem));
    },

    AddQuantity: (state, action) => {
      const product = action.payload;
      const existingProduct = state.cartItem.find((p) => p._id === product._id);

      if (existingProduct) {
        existingProduct.cartQuantity = product.cartQuantity+1; 
      }

      localStorage.setItem("cart", JSON.stringify(state.cartItem));
    },
    DecreaseQuantity: (state, action) => {
      const product = action.payload;
      const existingProduct = state.cartItem.find((p) => p._id === product._id);

      if (existingProduct) {
        existingProduct.cartQuantity = product.cartQuantity-1;
      }

      localStorage.setItem("cart", JSON.stringify(state.cartItem));
    },

    clearCart: (state) => {
      state.cartItem = [];
      localStorage.removeItem("cart");
    },
  },
});

export const { addToCart, AddQuantity,DecreaseQuantity, removeCartItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;