import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../slice/authSlice'
import searchReducer from '../slice/searchSlice'
import cartReducer from '../slice/cartSlice';

export const store = configureStore({
    
    reducer:{
        auth: authReducer,
        search: searchReducer,
        cart: cartReducer,
    }
});