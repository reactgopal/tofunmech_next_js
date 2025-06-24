import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = "https://tofun.online"

export const fetchCategories = createAsyncThunk('categories/fetchCategories', async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/category`);
      // console.log('API Response:', response.data);
      return response.data.data;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  });
  

const categorySlice = createSlice({
  name: 'categories',
  initialState: {
    categories: [],
    status: 'idle',
    error: null,
  },
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
  },
});

export default categorySlice.reducer;
