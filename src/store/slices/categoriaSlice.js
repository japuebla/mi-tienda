import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getCategorias = createAsyncThunk(
  "categoriaSlice/getCategorias",
  async (dispatch, getState) => {
    try {
      const response = await axios.get("http://localhost:3005/categorias");
      return response.data;
    } catch (error) {
      console.error("Cuidado!!!..., estas teniendo este " + error);
    }
  }
);
const initialState = {
  categorias: [],
  status: null
};
const categoriaSlice = createSlice({
  name: "categoriaSlice",
  initialState,
 
  extraReducers: {
    [getCategorias.pending]: (state, action) => {
      state.status = "loading";
    },
    [getCategorias.fulfilled]: (state, action) => {
      state.status = "success";
      state.categorias = action.payload;
    },
    [getCategorias.rejected]: (state, action) => {
      state.status = "failed";
    }
  }
});

export const { caragarCategorias } = categoriaSlice.actions;
export default categoriaSlice.reducer;
