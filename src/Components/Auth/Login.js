import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../Services/AuthService"; // Importa o serviço de autenticação
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      // Faz a chamada ao backend para autenticação
      const response = await login(email, senha);

      console.log("Resposta do login:", response); // Log para depuração

      // Ajuste para garantir que token e user existam na resposta
      const token = response.token || response.data?.token;
      const user = response.user || response.data?.user;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("registered", "true"); // Marca como registrado

      setMessage("Login realizado com sucesso!");
      navigate("/home"); // Redireciona para a tela de gerenciamento após login
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      setMessage("Email ou senha incorretos!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      {message && <p className="message">{message}</p>}
      <form onSubmit={handleLogin}>
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

        <button type="submit" disabled={loading}>
          {loading ? "Entrando..." : "Entrar"}
        </button>
      </form>
    </div>
  );
};

export default Login;