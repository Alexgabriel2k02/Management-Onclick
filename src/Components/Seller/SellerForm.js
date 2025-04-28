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
    const newSeller = { name, email, phone };
    const newSeller = { name, email, phone, cnpj, password };
    onAddSeller(newSeller);
    setName("");
    setEmail("");
    setPhone("");
    setCnpj("");
    setPassword("");
  };

  return (
    <form onSubmit={handleSubmit} className="seller-form">
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

      <div className="input-group">
        <label htmlFor="name">Nome:</label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Digite o nome"
          required
        />
      </div>

      <div className="input-group">
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Digite o email"
          required
        />
      </div>

      <div className="input-group">
        <label htmlFor="phone">Telefone:</label>
        <input
          id="phone"
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Digite o telefone"
          required
        />
      </div>

      <div className="input-group">
        <label htmlFor="cnpj">CNPJ:</label>
        <input
          id="cnpj"
          type="text"
          value={cnpj}
          onChange={(e) => setCnpj(e.target.value)}
          placeholder="Digite o CNPJ"
          required
        />
      </div>

      <div className="input-group">
        <label htmlFor="password">Senha:</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Digite a senha"
          required
        />
      </div>

      <button type="submit">Salvar Vendedor</button>
    </form>
  );
};

export default SellerForm;