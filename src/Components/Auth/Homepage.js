import React from "react";
import "../Home.css"; // Reaproveite o CSS da Home

const SellerHome = () => {
  return (
    <div className="App">
      <header>
        <h1>
          <span className="text-primary">MERCADO</span> ONCLICK
        </h1>
      </header>

      <div className="container">
        <a href="/cadastro" className="btn-group">Cadastrar Vendedor</a>
        <a href="/ativar-vendedor" className="btn-group">Ativar Número</a>
        <a href="/login" className="btn-group">Login</a>
      </div>

      <footer>
        <p>&copy; 2025 MERCADO ONCLICK. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
};

export default SellerHome;