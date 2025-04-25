import React from "react";
import "./OrderList.css";

const OrderList = ({ pedidos }) => {
  return (
    <div>
      <h2>Lista de Pedidos</h2>
      <ul>
        {pedidos.map((pedido) => (
          <li key={pedido.id}>
            Vendedor: {pedido.seller} | Produto: {pedido.product} | Quantidade:{" "}
            {pedido.quantity}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderList;