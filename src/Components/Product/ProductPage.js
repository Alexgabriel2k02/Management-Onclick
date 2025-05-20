import React, { useState, useEffect } from "react";
import ProductList from "./ProductList";
import ProductForm from "./ProductForm";
import {
  listProducts,
  createProduct,
  updateProduct,
  inactivateProduct,
} from "../Services/ProductService"; // Importa o serviço
import "./ProductPage.css";

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
      await inactivateProduct(id); // Usa o ProductService
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product.id !== id)
      );
    } catch (err) {
      alert(`Erro ao excluir produto: ${err.message}`);
    }
  };

  // Editar produto
  const handleEditProduct = async (updatedProduct) => {
    try {
      const editedProduct = await updateProduct(
        updatedProduct.id,
        updatedProduct
      ); // Usa o ProductService
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.id === editedProduct.id ? editedProduct : product
        )
      );
    } catch (err) {
      alert(`Erro ao editar produto: ${err.message}`);
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
      />
    </div>
  );
};

export default ProductPage;