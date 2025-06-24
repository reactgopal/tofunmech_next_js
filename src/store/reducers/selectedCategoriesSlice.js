import { createSlice } from '@reduxjs/toolkit';

const selectedCategoriesSlice = createSlice({
  name: 'selectedCategories',
  initialState: {
    selected: [],
  },
  reducers: {
    selectCategory(state, action) {
      console.log("...",action.payload);
      state.selected = action.payload
      console.log("0000000000000000",state.selected = action.payload);
    },
    clearSelectedCategories(state) {
      state.selected = [];
    },
  },
});

export const { selectCategory, clearSelectedCategories } = selectedCategoriesSlice.actions;
export default selectedCategoriesSlice.reducer;
