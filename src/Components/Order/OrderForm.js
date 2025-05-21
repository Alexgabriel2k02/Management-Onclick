import React, { useState } from "react";
import { createOrder } from "../../Services/OrderService"; // Importa o serviço
import "./OrderForm.css";

const OrderForm = () => {
  const [seller, setSeller] = useState("");
  const [product, setProduct] = useState("");
  const [quantity, setQuantity] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const newOrder = { seller, product, quantity: parseInt(quantity) };

    try {
      await createOrder(newOrder); // Envia o pedido ao backend
      setMessage("Pedido cadastrado com sucesso!");
      setSeller("");
      setProduct("");
      setQuantity("");
    } catch (error) {
      setMessage(`Erro ao cadastrar pedido: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Cadastrar Novo Pedido</h2>
      {message && <p className="message">{message}</p>}
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
      <button type="submit" disabled={loading}>
        {loading ? "Salvando..." : "Salvar Pedido"}
      </button>
    </form>
  );
};

export default OrderForm;