import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import "./ProductList.css";

const ProductList = ({
  products,
  onDeleteProduct,
  onEditProduct,
  onCopyProduct,
  onDiscount, // Adicione esta linha
  onAddToCart,
}) => {
  if (!products || products.length === 0) {
    return <p>Nenhum produto cadastrado.</p>;
  }

  return (
    <div className="container">
      <div className="product-header" style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
        <h2>Lista de Produtos</h2>
        <Link to="/cart" className="btn-group">Ver Carrinho</Link>
      </div>
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
                  <span className="product-price">
                    Preço: <b>R$ {Number(product.price).toFixed(2)}</b>
                  </span>
                  <span className="product-quantity">
                    {" "}
                    | Estoque: <b>{product.quantity}</b>
                  </span>
                  <span className="product-status">
                    {" "}
                    | Status: <b>{product.status}</b>
                  </span>
                  <span className="product-seller">
                    {" "}
                    | Seller: <b>{product.seller || "-"}</b>
                  </span>
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
                <button
                  className="btn-copy"
                  onClick={() => onCopyProduct(product)}
                  aria-label={`Copiar produto ${product.name}`}
                >
                  Copiar
                </button>
                <button
                  className="btn-discount"
                  onClick={() => onDiscount(product)}
                  aria-label={`Aplicar desconto ao produto ${product.name}`}
                >
                  Desconto
                </button>
                <button
                  className="btn-addcart"
                  onClick={() => onAddToCart && onAddToCart(product)}
                  aria-label={`Adicionar ${product.name} ao carrinho`}
                >
                  Adicionar ao carrinho
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
      quantity: PropTypes.number.isRequired,
      status: PropTypes.string.isRequired,
      seller: PropTypes.string, // Adicione seller aqui
    })
  ).isRequired,
  onDeleteProduct: PropTypes.func.isRequired,
  onEditProduct: PropTypes.func.isRequired,
  onCopyProduct: PropTypes.func.isRequired,
  onDiscount: PropTypes.func.isRequired, // Adicione esta linha
  onAddToCart: PropTypes.func,
};

export default ProductList;