import React, { useState, useEffect } from "react";
import { listProducts } from "../../Services/ProductService";
import { createSale } from "../../Services/SaleService";
import "./SalePage.css";

const SalePage = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [quantity, setQuantity] = useState("");
  const [message, setMessage] = useState("");

  // Buscar produtos disponíveis para venda
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await listProducts(); // Usa o ProductService
        const activeProducts = data.filter((product) => product.status === "Ativo");
        setProducts(activeProducts);
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
        setMessage("Erro ao carregar produtos.");
      }
    };

    fetchProducts();
  }, []);

  const handleSale = async (e) => {
    e.preventDefault();

    // Validações
    const product = products.find((p) => p.id === parseInt(selectedProduct));
    if (!product) {
      setMessage("Produto inválido.");
      return;
    }

    if (product.stock < quantity) {
      setMessage("Quantidade solicitada excede o estoque disponível.");
      return;
    }

    // Dados da venda
    const newSale = {
      productId: product.id,
      quantity: parseInt(quantity),
      price: product.price,
    };

    try {
      await createSale(newSale); // Usa o SaleService
      setMessage("Venda registrada com sucesso!");
      setQuantity("");
      setSelectedProduct("");
    } catch (error) {
      console.error("Erro ao registrar venda:", error);
      setMessage("Erro ao registrar venda.");
    }
  };

  return (
    <div className="sale-page">
      <h2>Realizar Venda</h2>
      {message && <p className="message">{message}</p>}
      <form onSubmit={handleSale}>
        <label>Produto:</label>
        <select
          value={selectedProduct}
          onChange={(e) => setSelectedProduct(e.target.value)}
          required
        >
          <option value="">Selecione um produto</option>
          {products.map((product) => (
            <option key={product.id} value={product.id}>
              {product.name} - R$ {product.price.toFixed(2)} (Estoque: {product.stock})
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
  );
};

export default SalePage;