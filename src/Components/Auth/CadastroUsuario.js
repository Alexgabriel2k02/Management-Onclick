import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CadastroUsuario.css";

const CadastroUsuario = () => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();

  const handleCadastro = (e) => {
    e.preventDefault();
    localStorage.setItem("registered", "true"); // Marca o usuário como registrado
    localStorage.setItem("userData", JSON.stringify({ nome, email, senha })); // Salva os dados do usuário
    navigate("/login"); // Redireciona para o login
  };

  return (
    <div>
      <h2>Cadastro</h2>
      <form onSubmit={handleCadastro}>
        <label>Nome:</label>
        <input
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
        />
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label>Senha:</label>
        <input
          type="password"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          required
        />
        <button type="submit">Concluir Cadastro</button>
      </form>
    </div>
  );
};

export default CadastroUsuario;