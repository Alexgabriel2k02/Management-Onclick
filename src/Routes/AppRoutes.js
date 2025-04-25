import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../Components/Home";
import CadastroUsuario from "../Components/Auth/CadastroUsuario";
import Login from "../Components/Auth/Login";
import ProductPage from "../Components/Product/ProductPage";
import SellerPage from "../Components/Seller/SellerPage";
import OrderPage from "../Components/Order/OrderPage";
import SalePage from "../Components/Sale/SalePage";

const AppRoutes = () => {
  const isAuthenticated = !!localStorage.getItem("token"); // Verifica se o usuário está autenticado
  const hasRegistered = !!localStorage.getItem("registered"); // Verifica se o usuário já se cadastrou

  return (
    <Routes>
      {/* Redirecionamento inicial */}
      <Route
        path="/"
        element={
          !hasRegistered ? (
            <Navigate to="/cadastro" />
          ) : !isAuthenticated ? (
            <Navigate to="/login" />
          ) : (
            <Home />
          )
        }
      />

      {/* Rotas públicas */}
      <Route path="/cadastro" element={<CadastroUsuario />} />
      <Route path="/login" element={<Login />} />

      {/* Rotas protegidas */}
      <Route path="/product" element={isAuthenticated ? <ProductPage /> : <Navigate to="/login" />} />
      <Route path="/seller" element={isAuthenticated ? <SellerPage /> : <Navigate to="/login" />} />
      <Route path="/order" element={isAuthenticated ? <OrderPage /> : <Navigate to="/login" />} />
      <Route path="/sale" element={isAuthenticated ? <SalePage /> : <Navigate to="/login" />} />
    </Routes>
  );
};

export default AppRoutes;