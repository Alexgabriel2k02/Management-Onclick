import React from "react";
import PropTypes from "prop-types";
import "./ProductList.css";

const ProductList = ({ products, onDeleteProduct, onEditProduct }) => {
  if (!products || products.length === 0) {
    return <p>Nenhum produto cadastrado.</p>;
  }

  return (
    <div className="container">
      <h2>Lista de Produtos</h2>
      <div className="produtos-list">
        <ul>
          {products.map((product) => (
            <li
              key={product.id}
              className={`product-item ${product.status === "Inativo" ? "inactive" : ""}`}
            >
              <img
                src={`http://localhost:5000/${product.img}`}
                alt={`Imagem de ${product.name}`}
                className="product-image"
              />
              <div className="product-info">
                <div className="product-name">{product.name}</div>
                <div className="product-details">
                  <span className="product-price">Preço: <b>R$ {Number(product.price).toFixed(2)}</b></span>
                  <span className="product-quantity"> | Estoque: <b>{product.quantity}</b></span>
                  <span className="product-status"> | Status: <b>{product.status}</b></span>
                </div>
              </div>
              <div className="product-actions">
                <button
                  className="btn-edit"
                  onClick={() => onEditProduct(product)}
                  aria-label={`Editar produto ${product.name}`}
                >
                  Editar
                </button>
                <button
                  className="btn-delete"
                  onClick={() => onDeleteProduct(product.id)}
                  aria-label={`Excluir produto ${product.name}`}
                >
                  Excluir
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

// Validação das props
ProductList.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      stock: PropTypes.number.isRequired,
      status: PropTypes.string.isRequired,
    })
  ).isRequired,
  onDeleteProduct: PropTypes.func.isRequired,
  onEditProduct: PropTypes.func.isRequired,
};

export default ProductList;