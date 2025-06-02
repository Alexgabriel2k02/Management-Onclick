import React from "react";
import PropTypes from "prop-types";
import "./OrderList.css";

const OrderList = ({ pedidos, message }) => {
  if (!pedidos || pedidos.length === 0) {
    return <p>Nenhum pedido encontrado.</p>;
  }

  return (
    <div>
      <h2>Lista de Pedidos</h2>
      {message && message.text && (
        <p className={`message ${message.type}`}>{message.text}</p>
      )}
      <ul>
        {pedidos.map((pedido) => (
          <li key={pedido.id} className="order-item">
            <strong>Vendedor:</strong> {pedido.seller} | <strong>Produto:</strong> {pedido.product} |{" "}
            <strong>Quantidade:</strong> {pedido.quantity}
          </li>
        ))}
      </ul>
    </div>
  );
};

// Validação das props
OrderList.propTypes = {
  pedidos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      seller: PropTypes.string.isRequired,
      product: PropTypes.string.isRequired,
      quantity: PropTypes.number.isRequired,
    })
  ),
  message: PropTypes.shape({
    text: PropTypes.string,
    type: PropTypes.string,
  }),
};

export default OrderList;