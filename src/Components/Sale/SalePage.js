import React, { useState, useEffect } from "react";
import { listProducts } from "../../Services/ProductService";
import { createSale, listSales } from "../../Services/SaleService"; // Importe listSales
import "./SalePage.css";

const SalePage = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [quantity, setQuantity] = useState("");
  const [message, setMessage] = useState("");
  const [salesHistory, setSalesHistory] = useState([]);

  // Buscar produtos disponíveis para venda
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await listProducts();
        const activeProducts = data.filter((product) => product.status === "Ativo");
        setProducts(activeProducts);
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
        setMessage("Erro ao carregar produtos.");
      }
    };

    fetchProducts();
  }, []);

  // Buscar histórico de vendas do backend
  useEffect(() => {
    const fetchSalesHistory = async () => {
      try {
        const sales = await listSales(); // Chama o backend
        setSalesHistory(sales);
      } catch (error) {
        console.error("Erro ao buscar histórico de vendas:", error);
      }
    };

    fetchSalesHistory();
  }, []);

  const handleSale = async (e) => {
    e.preventDefault();

    const product = products.find((p) => p.id === parseInt(selectedProduct));
    if (!product) {
      setMessage("Produto inválido.");
      return;
    }

    if (product.stock < quantity) {
      setMessage("Quantidade solicitada excede o estoque disponível.");
      return;
    }

    const newSale = {
      product_id: product.id,
      quantity: parseInt(quantity),
    };

    try {
      await createSale(newSale);
      setMessage("Venda registrada com sucesso!");
      setQuantity("");
      setSelectedProduct("");

      // Atualiza o histórico após registrar a venda
      const sales = await listSales();
      setSalesHistory(sales);
    } catch (error) {
      console.error("Erro ao registrar venda:", error);
      setMessage("Erro ao registrar venda.");
    }
  };

  return (
    <div className="sale-page">
      <h2>Realizar Venda</h2>
      {message && <p className="message">{message}</p>}
      <form onSubmit={handleSale}>
        <label>Produto:</label>
        <select
          value={selectedProduct}
          onChange={(e) => setSelectedProduct(e.target.value)}
          required
        >
          <option value="">Selecione um produto</option>
          {products.map((product) => (
            <option key={product.id} value={product.id}>
              {product.name} - R$ {product.price.toFixed(2)} (Estoque: {product.stock})
            </option>
          ))}
        </select>

        <label>Quantidade:</label>
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          min="1"
          required
        />

        <button type="submit">Registrar Venda</button>
      </form>

      {/* Histórico de vendas */}
      <h3>Histórico de Vendas</h3>
      <ul>
        {salesHistory.length === 0 && <li>Nenhuma venda registrada.</li>}
        {salesHistory.map((sale, idx) => (
          <li key={idx}>
            {sale.date || sale.created_at} - Produto ID: {sale.product_id} - Quantidade: {sale.quantity}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SalePage;