import React, { useState, useEffect } from "react";
import OrderForm from "./OrderForm";
import OrderList from "./OrderList";
import { fetchWithAuth } from "../Services/Api"; // Reutiliza fetchWithAuth
import "./OrderPage.css";

const OrderPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Buscar pedidos da API ao carregar a página
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await fetchWithAuth("/orders", { method: "GET" });
        setOrders(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // Adicionar pedido na API
  const handleAddOrder = async (newOrder) => {
    try {
      const addedOrder = await fetchWithAuth("/orders", {
        method: "POST",
        body: JSON.stringify(newOrder),
      });
      setOrders((prevOrders) => [...prevOrders, addedOrder]);
    } catch (err) {
      alert(`Erro ao adicionar pedido: ${err.message}`);
    }
  };

  if (loading) {
    return <p>Carregando pedidos...</p>;
  }

  if (error) {
    return <p>Erro: {error}</p>;
  }

  return (
    <div className="order-page">
      <OrderForm onAddOrder={handleAddOrder} />
      <OrderList pedidos={orders} />
    </div>
  );
};

export default OrderPage;