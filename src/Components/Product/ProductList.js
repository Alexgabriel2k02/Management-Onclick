import React from "react";
import "./ProductList.css";

const ProductList = ({ products, onDeleteProduct, onEditProduct }) => {
  return (
    <div className="container">
      <h2>Lista de Produtos</h2>
      {products.length > 0 ? (
        <ul>
          {products.map((product) => (
            <li key={product.id} className="product-item">
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
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>Nenhum produto cadastrado.</p>
      )}
    </div>
  );
};

export default ProductList;