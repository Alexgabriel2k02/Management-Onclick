import React, { useState } from "react";
import { createProduct } from "../../Services/ProductService";
import "./ProductForm.css";

const ProductForm = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [img, setImg] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", parseFloat(price));
    formData.append("quantity", parseInt(stock));
    if (img) {
      formData.append("img", img);
    }

    try {
      await createProduct(formData, true);
      setMessage("Produto cadastrado com sucesso!");
      setName("");
      setPrice("");
      setStock("");
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