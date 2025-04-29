import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CadastroUsuario.css";

const CadastroUsuario = () => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();

  const handleCadastro = (e) => {
    e.preventDefault();

    // Salva os dados no localStorage
    localStorage.setItem("registered", "true");
    localStorage.setItem(
      "userData",
      JSON.stringify({ nome, email, phone, cnpj, senha })
    );

    // Redireciona para a página de login
    navigate("/login");
  };

  return (
    <div className="cadastro-container">
      <h2>Cadastro</h2>
      <form onSubmit={handleCadastro} className="cadastro-form">
        <div className="input-group">
          <label htmlFor="nome">Nome:</label>
          <input
            id="nome"
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Digite seu nome"
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
            placeholder="Digite seu email"
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
            placeholder="Digite seu telefone"
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
            placeholder="Digite seu CNPJ"
            required
          />
        </div>

        <div className="input-group">
          <label htmlFor="senha">Senha:</label>
          <input
            id="senha"
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            placeholder="Digite sua senha"
            required
          />
        </div>

        <button type="submit">Concluir Cadastro</button>
      </form>
    </div>
  );
};

export default CadastroUsuario;