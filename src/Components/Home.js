import React from "react";
import "./Home.css";

const Home = () => {
  return (
    <div className="App">
      <header>
        <h1>
          <span className="text-primary">MERCADO</span> ONCLICK
        </h1>
      </header>

      <div className="container">
        <a href="/product" className="btn-group">Gerenciar Produtos</a>
        <a href="/seller" className="btn-group">Gerenciar Vendedores</a>
        <a href="/order" className="btn-group">Gerenciar Pedidos</a>
      </div>

      <footer>
        <p>&copy; 2025 MERCADO ONCLICK. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
};

export default Home;