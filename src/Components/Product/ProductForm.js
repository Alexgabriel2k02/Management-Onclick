import React, { useState } from "react";
import { createProduct } from "../../Services/ProductService";
import "./ProductForm.css";

const ProductForm = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [status, setStatus] = useState("Ativo");
  const [img, setImg] = useState(null); // Novo estado para imagem
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    // Usando FormData para enviar arquivo + dados
    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", parseFloat(price));
    formData.append("quantity", parseInt(stock));
    formData.append("status", status);
    if (img) {
      formData.append("img", img);
    }

    try {
      await createProduct(formData, true); // true indica multipart
      setMessage("Produto cadastrado com sucesso!");
      setName("");
      setPrice("");
      setStock("");
      setStatus("Ativo");
      setImg(null);
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

          <label htmlFor="img">Imagem do Produto:</label>
          <input
            type="file"
            id="img"
            name="img"
            accept="image/*"
            onChange={(e) => setImg(e.target.files[0])}
          />

          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? "Salvando..." : "Salvar Produto"}
          </button>
        </form>
      </main>
    </div>
  );
};

export default ProductForm;