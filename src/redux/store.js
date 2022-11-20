import { configureStore } from '@reduxjs/toolkit';
import filter from './slices/filterSlice';
import basket from './slices/basketSlice';
import pizza from './slices/pizzaSlice'

export const store = configureStore({
  reducer: {
    filter,
    basket,
    pizza
  },
});