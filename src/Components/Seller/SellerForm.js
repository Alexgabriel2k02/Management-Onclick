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

    // Cria o objeto do novo vendedor
    const newSeller = { name, email, phone, cnpj, password };

    // Chama a função de callback para adicionar o vendedor
    onAddSeller(newSeller);

    // Limpa os campos do formulário
    setName("");
    setEmail("");
    setPhone("");
    setCnpj("");
    setPassword("");
  };

  return (
    <form onSubmit={handleSubmit} className="seller-form">
      <h2>Cadastrar Novo Vendedor</h2>

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