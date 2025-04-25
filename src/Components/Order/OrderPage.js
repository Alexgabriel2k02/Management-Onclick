import React, { useState, useEffect } from "react";
import OrderForm from "./OrderForm";
import OrderList from "./OrderList";
import "./OrderPage.css";

const OrderPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Buscar pedidos da API ao carregar a página
  useEffect(() => {
    fetch("http://localhost:3001/orders", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erro ao buscar pedidos");
        }
        return response.json();
      })
      .then((data) => {
        setOrders(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // Adicionar pedido na API
  const handleAddOrder = (newOrder) => {
    fetch("http://localhost:3001/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(newOrder),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erro ao adicionar pedido");
        }
        return response.json();
      })
      .then((addedOrder) => {
        setOrders([...orders, addedOrder]);
      })
      .catch((err) => {
        alert(err.message);
      });
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