import { configureStore } from '@reduxjs/toolkit';
import filter from './slices/filterSlice';
import basket from './slices/basketSlice';

export const store = configureStore({
  reducer: {
    filter,
    basket
  },
});