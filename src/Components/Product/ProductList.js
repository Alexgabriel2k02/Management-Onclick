import React from "react";
import PropTypes from "prop-types";
import "./ProductList.css";

const ProductList = ({ products, onDeleteProduct, onEditProduct, onToggleStatus }) => {
  if (!products || products.length === 0) {
    return <p>Nenhum produto cadastrado.</p>;
  }

  return (
    <div className="container">
      <h2>Lista de Produtos</h2>
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
            style={{ width: '100px', height: '100px', objectFit: 'cover' }}
          />
            <span>
              {product.name} - R$ {Number(product.price).toFixed(2)} - Estoque: {product.stock} - Status: {product.status}
            </span>
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
              <button
                className="btn-toggle-status"
                onClick={() => onToggleStatus(product)}
                aria-label={`${
                  product.status === "Ativo" ? "Inativar" : "Ativar"
                } produto ${product.name}`}
              >
                {product.status === "Ativo" ? "Inativar" : "Ativar"}
              </button>
            </div>
          </li>
        ))}
      </ul>
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
  onToggleStatus: PropTypes.func.isRequired,
};

export default ProductList;