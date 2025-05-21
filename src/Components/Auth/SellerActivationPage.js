import React, { useState } from "react";
import { activateSeller } from "../../Services/AuthService";
import "./SellerActivationPage.css";

const SellerActivationPage = () => {
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleActivate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      await activateSeller({ phone, code });
      setMessage("Vendedor ativado com sucesso! Faça login para continuar.");
      setTimeout(() => window.location.href = "/login", 2000);
    } catch (err) {
      setMessage("Erro ao ativar vendedor: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="seller-activation-page">
      <h2>Ativação de Vendedor</h2>
      {message && <p className="message">{message}</p>}
      <form onSubmit={handleActivate}>
        <label>Celular:</label>
        <input
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
        <label>Código de Ativação:</label>
        <input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Ativando..." : "Ativar Conta"}
        </button>
      </form>
    </div>
  );
};

export default SellerActivationPage;