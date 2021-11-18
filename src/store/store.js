import {configureStore} from "@reduxjs/toolkit";
import productoSlice from "./slices/productoSlice";
import departamentoSlice from "./slices/departamentoSlice";
import categoriaSlice from "./slices/categoriaSlice";


export const store = configureStore({
    reducer: {
        productos: productoSlice,
        departamentos: departamentoSlice,
        categorias: categoriaSlice
    }
});