import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getProductos = createAsyncThunk(
  "productoSlice/getProductos",
  async (dispatch, getState) => {
    try {
      const response = await axios.get("http://localhost:3005/productos");
      return response.data;
    } catch (error) {
      console.error("Cuidado!!!..., estas teniendo este " + error);
    }
  }
);

const initialState = {
  productos: [],
  status: null,
  showModal: false,
  productoEditadoActivo: {}
};
const productoSlice = createSlice({
  name: "productoSlice",
  initialState,
  reducers: {
    eliminarProducto: (state, action) => {
      state.productos = state.productos.filter(
        producto => producto.id !== action.payload
      );
    },
    changeShowModal: state => {
      state.showModal = !state.showModal;
    },
    cargarDatosProductoEdicioActiva: (state, action) => {
      state.productoEditadoActivo = action.payload;
    }
  },
  extraReducers: {
    [getProductos.pending]: (state, action) => {
      state.status = "loading";
    },
    [getProductos.fulfilled]: (state, action) => {
      state.status = "success";
      state.productos = action.payload;
    },
    [getProductos.rejected]: (state, action) => {
      state.status = "failed";
    }
  }
});

export const {
  eliminarProducto,
  changeShowModal,
  cargarDatosProductoEdicioActiva
} = productoSlice.actions;
export default productoSlice.reducer;
