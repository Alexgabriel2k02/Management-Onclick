import React from "react";
import PropTypes from "prop-types";
import "./SellerList.css";

const SellerList = ({ sellers, onDeleteSeller }) => {
  if (!sellers || sellers.length === 0) {
    return <p>Nenhum vendedor cadastrado.</p>;
  }

  return (
    <div className="form-card">
      <h2>Lista de Vendedores</h2>
      <ul className="seller-list-ul">
        {sellers.map((seller) => (
          <li key={seller.id} className="seller-item">
            <span>
              {seller.name} - {seller.email} - {seller.phone}
            </span>
            <button
              className="btn-delete"
              onClick={() => onDeleteSeller(seller.id)}
            >
              Excluir
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

SellerList.propTypes = {
  sellers: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      phone: PropTypes.string.isRequired,
    })
  ).isRequired,
  onDeleteSeller: PropTypes.func.isRequired,
};

export default SellerList;