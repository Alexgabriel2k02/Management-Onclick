import React, { useState, useEffect } from "react";
import ProductList from "./ProductList";
import ProductForm from "./ProductForm";
import {
  listProducts,
  createProduct,
  deleteProduct,
  updateProduct,
  copyProduct,
  applyDiscount, // Adicione aqui!
} from "../../Services/ProductService";
import "./ProductPage.css";
import { useNavigate } from "react-router-dom"; // Adicione esta linha

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Adicione esta linha

  // Buscar produtos ao carregar a página
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await listProducts(); // Usa o ProductService
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Adicionar produto
  const handleAddProduct = async (newProduct) => {
    try {
      const addedProduct = await createProduct(newProduct); // Usa o ProductService
      setProducts((prevProducts) => [...prevProducts, addedProduct]);
    } catch (err) {
      alert(`Erro ao adicionar produto: ${err.message}`);
    }
  };

  // Excluir produto
  const handleDeleteProduct = async (id) => {
    try {
      await deleteProduct(id); // Usa o ProductService
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product.id !== id)
      );
    } catch (err) {
      alert(`Erro ao excluir produto: ${err.message}`);
    }
  };

  // Editar produto
  const handleEditProduct = (product) => {
    navigate(`/editar-produto/${product.id}`); // Use navigate aqui
  };

  // Inativar produto (apenas muda o status)
  const handleToggleStatus = async (product) => {
    try {
      const newStatus = product.status === "Ativo" ? "Inativo" : "Ativo";
      await updateProduct(product.id, { status: newStatus });
      setProducts((prevProducts) =>
        prevProducts.map((p) =>
          p.id === product.id ? { ...p, status: newStatus } : p
        )
      );
    } catch (err) {
      alert(`Erro ao alterar status: ${err.message}`);
    }
  };

  const handleCopyProduct = async (product) => {
    try {
      const data = await copyProduct(product.id);

      if (data.produto) {
        setProducts((prev) => [...prev, data.produto]);
      } else {
        alert(data.mensagem || "Erro ao copiar produto.");
      }
    } catch (err) {
      alert(`Erro ao copiar produto: ${err.message}`);
    }
  };

  const handleDiscountProduct = async (product) => {
    try {
      const data = await applyDiscount(product.id);

      if (data.produto) {
        setProducts((prevProducts) =>
          prevProducts.map((p) => (p.id === product.id ? data.produto : p))
        );
      } else {
        alert(data.mensagem || "Erro ao aplicar desconto.");
      }
    } catch (err) {
      alert(`Erro ao aplicar desconto: ${err.message}`);
    }
  };

  if (loading) {
    return <p>Carregando produtos...</p>;
  }

  if (error) {
    return <p>Erro: {error}</p>;
  }

  return (
    <div className="product-page">
      <div className="product-layout">
        <ProductForm onAddProduct={handleAddProduct} />
        <ProductList
          products={products}
          onDeleteProduct={handleDeleteProduct}
          onEditProduct={handleEditProduct}
          onToggleStatus={handleToggleStatus}
          onCopyProduct={handleCopyProduct}
          onDiscount={handleDiscountProduct} // Adicione esta linha
        />
      </div>
    </div>
  );
};

export default ProductPage;