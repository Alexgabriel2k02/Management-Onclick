import React, { useState, useEffect } from "react";
import "./ProductForm.css";
import { useParams, useNavigate } from "react-router-dom";

const ProductEditForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [status, setStatus] = useState("Ativo");
  const [img, setImg] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Carrega dados do produto ao montar
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`http://localhost:5000/products/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error("Erro ao carregar produto.");
        const data = await res.json();
        setName(data.name);
        setPrice(data.price);
        setStock(data.quantity || data.stock || "");
        setStatus(data.status || "Ativo");
        setImg(null);
      } catch (err) {
        setMessage("Erro ao carregar produto.");
      }
    };
    fetchProduct();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", parseFloat(price));
    formData.append("quantity", parseInt(stock));
    formData.append("status", status);
    if (img) {
      formData.append("img", img);
    }

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`http://localhost:5000/products/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          // NÃO coloque Content-Type aqui, o browser define para multipart!
        },
        body: formData,
      });
      if (!res.ok) throw new Error("Erro ao atualizar produto.");
      setMessage("Produto atualizado com sucesso!");
      setTimeout(() => navigate("/product"), 1000);
    } catch (error) {
      setMessage("Erro ao atualizar produto.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <main className="container">
        <h2>Editar Produto</h2>
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
            {loading ? "Salvando..." : "Salvar Alterações"}
          </button>
        </form>
      </main>
    </div>
  );
};

export default ProductEditForm;