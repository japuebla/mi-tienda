import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MyNavbar from '../components/navbar/MyNavBar';
import App from "../container/App";
import NewProducto from "../components/newProducto/NewProducto";

const Router = () => {
  return (
    <BrowserRouter>
      <MyNavbar />
      <Routes>
        <Route exact path="/" element={<App />} />
        <Route exact path="/new" element={<NewProducto/>} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
