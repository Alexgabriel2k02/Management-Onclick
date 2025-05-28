import React, { useState, useEffect } from "react";
import ProductList from "./ProductList";
import ProductForm from "./ProductForm";
import {
  listProducts,
  createProduct,
  deleteProduct, // 
  toggleProductStatus,
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

  // Função para ativar/inativar produto
  const handleToggleStatus = async (product) => {
    try {
      const updatedProduct = await toggleProductStatus(product.id);
      setProducts((prevProducts) =>
        prevProducts.map((p) =>
          p.id === updatedProduct.id ? updatedProduct : p
        )
      );
    } catch (err) {
      alert(`Erro ao alterar status: ${err.message}`);
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
      <ProductForm onAddProduct={handleAddProduct} />
      <ProductList
        products={products}
        onDeleteProduct={handleDeleteProduct}
        onEditProduct={handleEditProduct}
        onToggleStatus={handleToggleStatus} // Passe a função aqui
      />
    </div>
  );
};

export default ProductPage;