import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getDepartamentos = createAsyncThunk(
  "departamentoSlice/getDepartamentos",
  async (dispatch, getState) => {
    try {
      const response = await axios.get("http://localhost:3005/departamentos");
      return response.data;
    } catch (error) {
      console.error("Cuidado!!!..., estas teniendo este " + error);
    }
  }
);

const initialState = {
  departamentos: [],
  status: null
};
const departamentoSlice = createSlice({
  name: "departamentoSlice",
  initialState,

  extraReducers: {
    [getDepartamentos.pending]: (state, action) => {
      state.status = "loading";
    },
    [getDepartamentos.fulfilled]: (state, action) => {
      state.status = "success";
      state.departamentos = action.payload;
    },
    [getDepartamentos.rejected]: (state, action) => {
      state.status = "failed";
    }
  }
});

export const { caragarDepartamentos } = departamentoSlice.actions;
export default departamentoSlice.reducer;
