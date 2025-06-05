import React, { useState, useEffect } from "react";
import { createOrder } from "../../Services/OrderService";
import { listClients } from "../../Services/ClientService";
import { listProducts } from "../../Services/ProductService";
import "./OrderForm.css";

const OrderForm = () => {
  const [product_id, setProductId] = useState("");
  const [products, setProducts] = useState([]);
  const [quantity, setQuantity] = useState("");
  const [client_id, setClientId] = useState("");
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });

  useEffect(() => {
    listClients()
      .then(setClients)
      .catch(() => setClients([]));
    listProducts()
      .then(setProducts)
      .catch(() => setProducts([]));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ text: "", type: "" });

    const newOrder = {
      client_id,
      product_id,
      quantity: parseInt(quantity),
    };

    try {
      await createOrder(newOrder);
      setMessage({ text: "Pedido cadastrado com sucesso!", type: "success" });
      setProductId("");
      setQuantity("");
      setClientId("");
    } catch (error) {
      setMessage({ text: `Erro ao cadastrar pedido: ${error.message}`, type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Cadastrar Novo Pedido</h2>
      {message.text && <p className={`message ${message.type}`}>{message.text}</p>}
      <label>Cliente:</label>
      <select
        value={client_id}
        onChange={(e) => setClientId(e.target.value)}
        required
      >
        <option value="">Selecione um cliente</option>
        {clients.map((client) => (
          <option key={client.id} value={client.id}>
            {client.name} ({client.email})
          </option>
        ))}
      </select>
      <label>Produto:</label>
      <select
        value={product_id}
        onChange={(e) => setProductId(e.target.value)}
        required
      >
        <option value="">Selecione um produto</option>
        {products.map((product) => (
          <option key={product.id} value={product.id}>
            {product.name}
          </option>
        ))}
      </select>
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