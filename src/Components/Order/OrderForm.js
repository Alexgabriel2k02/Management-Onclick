import React, { useState } from "react";
import "./OrderForm.css";

const OrderForm = ({ onAddOrder }) => {
  const [seller, setSeller] = useState("");
  const [product, setProduct] = useState("");
  const [quantity, setQuantity] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const newOrder = { seller, product, quantity: parseInt(quantity) };
    onAddOrder(newOrder);
    setSeller("");
    setProduct("");
    setQuantity("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Cadastrar Novo Pedido</h2>
      <label>Vendedor:</label>
      <input
        type="text"
        value={seller}
        onChange={(e) => setSeller(e.target.value)}
        required
      />
      <label>Produto:</label>
      <input
        type="text"
        value={product}
        onChange={(e) => setProduct(e.target.value)}
        required
      />
      <label>Quantidade:</label>
      <input
        type="number"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        required
      />
      <button type="submit">Salvar Pedido</button>
    </form>
  );
};

export default OrderForm;