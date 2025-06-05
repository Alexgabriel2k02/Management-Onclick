import React, { useState } from "react";
import { createClient } from "../../Services/ClientService";
import "./ClientForm.css";

const ClientForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState({ text: "", type: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ text: "", type: "" });

    if (!name || !email) {
      setMessage({ text: "Nome e e-mail são obrigatórios.", type: "error" });
      return;
    }

    setLoading(true);
    try {
      await createClient({ name, email, phone });
      setMessage({ text: "Cliente cadastrado com sucesso!", type: "success" });
      setName("");
      setEmail("");
      setPhone("");
    } catch (error) {
      setMessage({ text: error.message, type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="client-form-card">
      <form onSubmit={handleSubmit}>
        <h2>Cadastrar Novo Cliente</h2>
        {message.text && <p className={`message ${message.type}`}>{message.text}</p>}
        <label>Nome:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <label>E-mail:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label>Telefone:</label>
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="(99) 99999-9999"
        />
        <button type="submit" disabled={loading}>
          {loading ? "Salvando..." : "Salvar Cliente"}
        </button>
      </form>
    </div>
  );
};

export default ClientForm;