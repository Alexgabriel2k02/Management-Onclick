import React from "react";
import "./SellerList.css";

const SellerList = ({ sellers, onDeleteSeller }) => {
  return (
    <div>
      <h2>Lista de Vendedores</h2>
      <ul>
        {sellers.map((seller) => (
          <li key={seller.id}>
            {seller.name} - {seller.email} - {seller.phone}
            <button onClick={() => onDeleteSeller(seller.id)}>Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SellerList;