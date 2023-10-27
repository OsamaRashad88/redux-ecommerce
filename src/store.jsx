import { configureStore } from '@reduxjs/toolkit';
import { getcartSlice } from './getCartSlice';
import { getwishlistSlice } from './Getwishlist';
const store = configureStore({
  reducer: {
    
    cartdetails:getcartSlice,
    wishlist:getwishlistSlice

  },
});

export default store;
