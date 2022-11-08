import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categoryId: 0,
  sort: {
    name: 'popular  🠗',
    sortProperty: 'rating'
  },
  currentPage: 1,
}

const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setCategoryId(state, action) {
      state.categoryId = action.payload;
    },
    setSort(state, action) {
      state.sort = action.payload;
    },
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
    setFilters(state, action) {
      state.currentPage = Number(action.payload.currentPage);
      state.sortProperty = action.payload.sortProperty;
      state.categoryId = Number(action.payload.categoryId);
    }
  }
});

export const { setCategoryId, setSort, setCurrentPage, setFilters } = filterSlice.actions;

export default filterSlice.reducer;