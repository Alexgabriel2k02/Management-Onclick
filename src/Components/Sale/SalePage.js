import React, { useState, useEffect } from "react";
import { listProducts } from "../../Services/ProductService";
import { createSale, listSales } from "../../Services/SaleService";
import "./SalePage.css";

const SalePage = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [quantity, setQuantity] = useState("");
  const [message, setMessage] = useState({ text: "", type: "" });
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
        setMessage({ text: "Erro ao carregar produtos.", type: "error" });
      }
    };

    fetchProducts();
  }, []);

  // Buscar histórico de vendas do backend
  useEffect(() => {
    const fetchSalesHistory = async () => {
      try {
        const sales = await listSales();
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
      setMessage({ text: "Produto inválido.", type: "error" });
      return;
    }

    if (product.stock < quantity) {
      setMessage({ text: "Quantidade solicitada excede o estoque disponível.", type: "error" });
      return;
    }

    const newSale = {
      product_id: product.id,
      quantity: parseInt(quantity),
    };

    try {
      await createSale(newSale);
      setMessage({ text: "Venda registrada com sucesso!", type: "success" });
      setQuantity("");
      setSelectedProduct("");

      // Atualiza o histórico após registrar a venda
      const sales = await listSales();
      setSalesHistory(sales);
    } catch (error) {
      console.error("Erro ao registrar venda:", error);
      setMessage({ text: "Erro ao registrar venda.", type: "error" });
    }
  };

  return (
    <div className="sale-page">
      {message.text && (
        <p className={`message ${message.type}`}>{message.text}</p>
      )}
      <div className="sale-content">
        <div className="form-card">
          <h2>Realizar Venda</h2>
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
        </div>

        <div className="form-card">
          <h2>Histórico de Vendas</h2>
          <ul className="sales-history-list">
            {salesHistory.length === 0 && <li>Nenhuma venda registrada.</li>}
            {salesHistory.map((sale, idx) => {
              const product = products.find((p) => p.id === sale.product_id);
              const productName = product ? product.name : `ID: ${sale.product_id}`;
              const totalPrice = product ? (product.price * sale.quantity).toFixed(2) : "-";
              return (
                <li key={idx} className="sales-history-item">
                  <div className="sale-product-name">{productName}</div>
                  <div className="sale-details">
                    <span className="sale-date">
                      {new Date(sale.date || sale.created_at).toLocaleString()}
                    </span>
                    <span className="sale-seller">
                      Vendedor: <b>{sale.seller_id}</b>
                    </span>
                    <span className="sale-product-id">
                      ID Produto: <b>{sale.product_id}</b>
                    </span>
                  </div>
                  <div className="sale-info">
                    <span className="sale-quantity">
                      Qtd: <b>{sale.quantity}</b>
                    </span>
                    <span className="sale-total">
                      Total: <b>R$ {totalPrice}</b>
                    </span>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SalePage;
