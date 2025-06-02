import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../Components/Home";
import CadastroUsuario from "../Components/Auth/CadastroUsuario";
import Login from "../Components/Auth/Login";
import ProductPage from "../Components/Product/ProductPage";
import SellerPage from "../Components/Seller/SellerPage";
import OrderPage from "../Components/Order/OrderPage";
import SalePage from "../Components/Sale/SalePage";
import SellerActivationPage from "../Components/Auth/SellerActivationPage";
import ProductEditForm from "../Components/Product/ProductEditForm";
import SellerHome from "../Components/Auth/Homepage";

const AppRoutes = () => {
  const isAuthenticated = !!localStorage.getItem("token"); // Verifica se o usuário está autenticado

  return (
    <Routes>
      {/* Sempre começa pelo cadastro */}
      <Route path="/" element={<Navigate to="/inicio-vendedor" />} />

      {/* Cadastro */}
      <Route path="/cadastro" element={<CadastroUsuario />} />
      {/* Ativação */}
      <Route path="/ativar-vendedor" element={<SellerActivationPage />} />
      {/* Login */}
      <Route path="/login" element={<Login />} />

      {/* Rotas protegidas */}
      <Route path="/product" element={isAuthenticated ? <ProductPage /> : <Navigate to="/login" />} />
      <Route path="/editar-produto/:id" element={isAuthenticated ? <ProductEditForm /> : <Navigate to="/login" />} />
      
      <Route path="/seller" element={isAuthenticated ? <SellerPage /> : <Navigate to="/login" />} />
      <Route path="/order" element={isAuthenticated ? <OrderPage /> : <Navigate to="/login" />} />
      <Route path="/sale" element={isAuthenticated ? <SalePage /> : <Navigate to="/login" />} />
      <Route path="/home" element={isAuthenticated ? <Home /> : <Navigate to="/login" />} />
      <Route path="/inicio-vendedor" element={<SellerHome />} />
    </Routes>
  );
};

export default AppRoutes;