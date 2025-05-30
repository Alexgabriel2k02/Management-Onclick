import React, { useState } from "react";
import "./SellerForm.css";

const SellerForm = ({ onAddSeller }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const newSeller = { name, email, phone, cnpj, password };
    onAddSeller(newSeller);
    setName("");
    setEmail("");
    setPhone("");
    setCnpj("");
    setPassword("");
  };

  return (
    <form className="form-card" onSubmit={handleSubmit}>
      <h2>Cadastrar Novo Vendedor</h2>
      <label>Nome:</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <label>Email:</label>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <label>Telefone:</label>
      <input
        type="text"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        required
      />
      <label>CNPJ:</label>
      <input
        type="text"
        value={cnpj}
        onChange={(e) => setCnpj(e.target.value)}
        required
      />
      <label>Senha:</label>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">Salvar Vendedor</button>
    </form>
  );
};

export default SellerForm;