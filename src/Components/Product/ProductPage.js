import React, { useState, useEffect } from "react";
import ProductList from "./ProductList";
import ProductForm from "./ProductForm";
import "./ProductPage.css";

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3001/products", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erro ao buscar produtos");
        }
        return response.json();
      })
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const handleAddProduct = (newProduct) => {
    fetch("http://localhost:3001/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(newProduct),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erro ao adicionar produto");
        }
        return response.json();
      })
      .then((addedProduct) => {
        setProducts([...products, addedProduct]);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  const handleDeleteProduct = (id) => {
    fetch(`http://localhost:3001/products/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erro ao excluir produto");
        }
        setProducts(products.filter((product) => product.id !== id));
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  const handleEditProduct = (updatedProduct) => {
    fetch(`http://localhost:3001/products/${updatedProduct.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(updatedProduct),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erro ao editar produto");
        }
        return response.json();
      })
      .then((editedProduct) => {
        setProducts(
          products.map((product) =>
            product.id === editedProduct.id ? editedProduct : product
          )
        );
      })
      .catch((err) => {
        alert(err.message);
      });
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