import React, { useState, useEffect } from "react";
import SellerForm from "./SellerForm";
import SellerList from "./SellerList";
import { fetchWithAuth } from "../../Services/Api";
import { activateSeller } from "../../Services/SellerService";
import "./SellerPage.css";

const SellerPage = () => {
  const [sellers, setSellers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Buscar vendedores da API ao carregar a página
  useEffect(() => {
    const fetchSellers = async () => {
      try {
        const data = await fetchWithAuth("/sellers", { method: "GET" });
        setSellers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSellers();
  }, []);

  // Adicionar vendedor na API
  const handleAddSeller = async (newSeller) => {
    try {
      const addedSeller = await activateSeller(newSeller);
      setSellers((prevSellers) => [...prevSellers, addedSeller]);
    } catch (err) {
      alert(`Erro ao adicionar vendedor: ${err.message}`);
    }
  };

  // Excluir vendedor na API
  const handleDeleteSeller = async (id) => {
    try {
      await fetchWithAuth(`/sellers/${id}`, { method: "DELETE" });
      setSellers((prevSellers) => prevSellers.filter((seller) => seller.id !== id));
    } catch (err) {
      alert(`Erro ao excluir vendedor: ${err.message}`);
    }
  };

  if (loading) {
    return <p>Carregando vendedores...</p>;
  }

  if (error) {
    return <p>Erro: {error}</p>;
  }

  return (
    <div className="sellers-page">
      <SellerForm onAddSeller={handleAddSeller} />
      <SellerList sellers={sellers} onDeleteSeller={handleDeleteSeller} />
    </div>
  );
};

export default SellerPage;