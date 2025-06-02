import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerSeller } from "../../Services/AuthService"; // Serviço de cadastro
import "./CadastroUsuario.css";

const CadastroUsuario = () => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [telefone, setTelefone] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });
  const navigate = useNavigate();

  const handleCadastro = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ text: "", type: "" });

    try {
      // Faz a chamada ao backend para cadastrar o usuário
      const response = await registerSeller({
        name: nome,
        email: email,
        password: senha,
        cnpj: cnpj,
        phone: telefone,
        status: "Inativo", // Garante que o status seja enviado como Inativo
      });

      // Salva os dados do usuário no localStorage
      localStorage.setItem("user", JSON.stringify(response.user)); // Armazena os dados do usuário
      localStorage.setItem("token", response.token); // Armazena o token JWT, se retornado
      localStorage.setItem("registered", "true"); // Marca como registrado

      setMessage({ text: "Cadastro realizado com sucesso!", type: "success" });
      setTimeout(() => navigate("/ativar-vendedor"), 2000); // Redireciona para ativação após 2 segundos
    } catch (error) {
      console.error("Erro ao cadastrar usuário:", error);
      setMessage({ text: "Erro ao cadastrar. Tente novamente.", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="cadastro-container">
      <h2>Cadastro</h2>
      {message.text && <p className={`message ${message.type}`}>{message.text}</p>}
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

        <label>CNPJ:</label>
        <input
          type="text"
          value={cnpj}
          onChange={(e) => setCnpj(e.target.value)}
          required
        />

        <label>Telefone:</label>
        <input
          type="tel"
          value={telefone}
          onChange={(e) => setTelefone(e.target.value)}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? "Cadastrando..." : "Concluir Cadastro"}
        </button>
      </form>
    </div>
  );
};

export default CadastroUsuario;