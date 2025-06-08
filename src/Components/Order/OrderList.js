import React from "react";
import PropTypes from "prop-types";
import "./OrderList.css";

const statusClass = {
  Pendente: "status-pendente",
  Vendido: "status-vendido",
  Cancelado: "status-cancelado",
};

const OrderList = ({ pedidos, message }) => {
  if (!pedidos || pedidos.length === 0) {
    return <p>Nenhum pedido encontrado.</p>;
  }

  return (
    <div className="order-list-cards">
      <h2>Lista de Pedidos</h2>
      {message && message.text && (
        <p className={`message ${message.type}`}>{message.text}</p>
      )}
      <div className="order-cards-container">
        {pedidos.map((pedido) => (
          <div key={pedido.id} className="order-card order-card-row">
            {pedido.product && pedido.product.img && (
              <img
                src={`http://localhost:5000/${pedido.product.img}`}
                alt={pedido.product.name}
                className="order-product-img"
              />
            )}
            <div className="order-info">
              <div className="order-title">
                <strong>{pedido.product?.name || "-"}</strong>
              </div>
              <div>
                <strong>Cliente:</strong> {pedido.client?.name || "-"}
              </div>
              <div>
                <strong>Quantidade:</strong> {pedido.quantity}
              </div>
              <div>
                <span className={`status ${statusClass[pedido.status] || ""}`}>
                  {pedido.status || "Pendente"}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

OrderList.propTypes = {
  pedidos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      client: PropTypes.object,
      product_name: PropTypes.string,
      quantity: PropTypes.number.isRequired,
      status: PropTypes.string,
      // product_img: PropTypes.string, // se for usar imagem
    })
  ),
  message: PropTypes.shape({
    text: PropTypes.string,
    type: PropTypes.string,
  }),
};

export default OrderList;