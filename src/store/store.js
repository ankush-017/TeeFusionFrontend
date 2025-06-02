import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../slice/authSlice'
import searchReducer from '../slice/searchSlice'
import cartReducer from '../slice/cartSlice';
import darkThemeReducer from '../slice/darkTheme'

export const store = configureStore({
    
    reducer:{
        auth: authReducer,
        search: searchReducer,
        cart: cartReducer,
        Theme: darkThemeReducer,
    }
});