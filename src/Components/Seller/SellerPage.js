import React, { useState, useEffect } from "react";
import SellerForm from "./SellerForm";
import SellerList from "./SellerList";
import "./SellerPage.css";

const SellerPage = () => {
  const [sellers, setSellers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Buscar vendedores da API ao carregar a página
  useEffect(() => {
    fetch("http://localhost:3001/sellers", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erro ao buscar vendedores");
        }
        return response.json();
      })
      .then((data) => {
        setSellers(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // Adicionar vendedor na API
  const handleAddSeller = (newSeller) => {
    fetch("http://localhost:3001/sellers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(newSeller),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erro ao adicionar vendedor");
        }
        return response.json();
      })
      .then((addedSeller) => {
        setSellers([...sellers, addedSeller]);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  // Excluir vendedor na API
  const handleDeleteSeller = (id) => {
    fetch(`http://localhost:3001/sellers/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erro ao excluir vendedor");
        }
        setSellers(sellers.filter((seller) => seller.id !== id));
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  if (loading) {
    return <p>Carregando vendedores...</p>;
  }

  if (error) {
    return <p>Erro: {error}</p>;
  }

  return (
    <div className="seller-page">
      <SellerForm onAddSeller={handleAddSeller} />
      <SellerList sellers={sellers} onDeleteSeller={handleDeleteSeller} />
    </div>
  );
};

export default SellerPage;