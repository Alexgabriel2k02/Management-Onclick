import React, { useState } from "react";
import { createProduct } from "../../Services/ProductService"; // Importa o serviço
import "./ProductForm.css";

const ProductForm = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [status, setStatus] = useState("Ativo");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const newProduct = {
      name,
      price: parseFloat(price),
      quantity: parseInt(stock),
      status,
    };

    try {
      await createProduct(newProduct); // Envia o produto ao backend
      setMessage("Produto cadastrado com sucesso!");
      setName("");
      setPrice("");
      setStock("");
      setStatus("Ativo");
    } catch (error) {
      setMessage(`Erro ao cadastrar produto: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <main className="container">
        <h2>Cadastrar Novo Produto</h2>
        {message && <p className="message">{message}</p>}
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Nome do Produto:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <label htmlFor="price">Preço (R$):</label>
          <input
            type="number"
            id="price"
            name="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            step="0.01"
            required
          />

          <label htmlFor="stock">Estoque:</label>
          <input
            type="number"
            id="stock"
            name="stock"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            required
          />

          <label htmlFor="status">Status:</label>
          <select
            id="status"
            name="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="Ativo">Ativo</option>
            <option value="Inativo">Inativo</option>
          </select>

          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? "Salvando..." : "Salvar Produto"}
          </button>
        </form>
      </main>
    </div>
  );
};

export default ProductForm;