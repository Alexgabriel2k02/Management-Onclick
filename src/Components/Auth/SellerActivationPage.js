import React, { useState, useEffect } from "react";
import { fetchWithAuth } from "../../Services/Api";
import { activateSeller } from "../../Services/AuthService"; // Agora usando o AuthService
import "./SellerActivationPage.css";

const SellerActivationPage = () => {
  const [sellers, setSellers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("");
  const [activating, setActivating] = useState(null); // Estado para controlar o botão de ativação

  // Buscar vendedores inativos
  useEffect(() => {
    const fetchInactiveSellers = async () => {
      try {
        const data = await fetchWithAuth("/sellers?status=inactive", { method: "GET" });
        setSellers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchInactiveSellers();
  }, []);

  // Ativar vendedor
  const handleActivateSeller = async (sellerId) => {
    setActivating(sellerId); // Define o estado de carregamento para o botão
    try {
      await activateSeller(sellerId); // Usando o AuthService
      setMessage("Vendedor ativado com sucesso!");
      setSellers((prevSellers) => prevSellers.filter((seller) => seller.id !== sellerId));
    } catch (err) {
      setMessage(`Erro ao ativar vendedor: ${err.message}`);
    } finally {
      setActivating(null); // Reseta o estado de carregamento do botão
    }
  };

  if (loading) {
    return <p>Carregando vendedores inativos...</p>;
  }

  if (error) {
    return <p>Erro: {error}</p>;
  }

  return (
    <div className="seller-activation-page">
      <h2>Ativação de Vendedores</h2>
      {message && <p className="message">{message}</p>}
      {sellers.length === 0 ? (
        <p>Nenhum vendedor inativo encontrado.</p>
      ) : (
        <ul>
          {sellers.map((seller) => (
            <li key={seller.id} className="seller-item">
              <span>
                {seller.name} - {seller.email} - {seller.phone}
              </span>
              <button
                className="btn-activate"
                onClick={() => handleActivateSeller(seller.id)}
                disabled={activating === seller.id} // Desabilita o botão enquanto está ativando
              >
                {activating === seller.id ? "Ativando..." : "Ativar"}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SellerActivationPage;