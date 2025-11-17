import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { listProductsForSale } from "../../Services/ProductService";
import { createSale } from "../../Services/SaleService";
import { listOrders } from "../../Services/OrderService";
import "./SalePage.css";

const SalePage = () => {
  const [products, setProducts] = useState([]);
  const [quantity, setQuantity] = useState("");
  const [message, setMessage] = useState({ text: "", type: "" });
  const [orderId, setOrderId] = useState("");
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const sellerId = user?.id;

  // Buscar produtos disponíveis para venda
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await listProductsForSale();
        setProducts(data);
        console.log("Produtos para venda:", data.map(p => ({ id: p.id, type: typeof p.id })));
      } catch (error) {
        console.error("Erro ao buscar produtos para venda:", error);
        setMessage({ text: "Erro ao carregar produtos.", type: "error" });
      }
    };
    fetchProducts();
  }, []);

  // Buscar pedidos não aprovados
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await listOrders();
        setOrders(data.filter(order => order.status !== "aprovado"));
        // Veja os product_id dos pedidos
        console.log("Pedidos:", data.map(o => ({ id: o.id, product_id: o.product_id, type: typeof o.product_id })));
      } catch (error) {
        console.error("Erro ao buscar pedidos:", error);
      }
    };
    fetchOrders();
  }, []);

  const handleSale = async (e) => {
    e.preventDefault();

    if (!orderId) {
      setMessage({ text: "Selecione um pedido.", type: "error" });
      return;
    }

    const order = orders.find(o => o.id === parseInt(orderId));
    if (!order) {
      setMessage({ text: "Pedido inválido.", type: "error" });
      return;
    }

    const product = products.find(p => String(p.id) === String(order.product_id));
    if (!product) {
      setMessage({ text: "Produto do pedido não encontrado.", type: "error" });
      return;
    }

    if (product.quantity < Number(quantity)) {
      setMessage({ text: "Quantidade solicitada excede o estoque disponível.", type: "error" });
      return;
    }

    try {
      await createSale({
        product_id: product.id,
        quantity: parseInt(quantity),
        order_id: order.id,
        seller_id: sellerId,
      });
      setMessage({ text: "Venda registrada com sucesso!", type: "success" });
      setQuantity("");
      setOrderId("");
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
      <div className="sale-header">
        <h1>Realizar Venda</h1>
        <button 
          className="btn-view-history" 
          onClick={() => navigate("/sales-history")}
        >
          Ver Histórico de Vendas
        </button>
      </div>
      <div className="sale-content">
        <div className="form-card">
          <h2>Realizar Venda</h2>
          <form onSubmit={handleSale}>
            <label>Pedido:</label>
            <select
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              required
            >
              <option value="">Selecione um pedido</option>
              {orders.map(order => (
                <option key={order.id} value={order.id}>
                  Pedido #{order.id}
                  {" - Cliente: "}{order.client?.name || order.client?.nome || "Cliente"}
                  {" - Produto: "}{order.product?.name || order.product?.nome || "?"}
                  {" - Status: "}{order.status}
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
      </div>
    </div>
  );
};

export default SalePage;
