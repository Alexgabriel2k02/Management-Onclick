import React, { useEffect, useState } from "react";
import ClientForm from "./ClientForm";
import { listClients } from "../../Services/ClientService";
import "./ClientPage.css";

const ClientPage = () => {
  const [clients, setClients] = useState([]);
  const [reload, setReload] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    listClients()
      .then(setClients)
      .catch((err) => setError(err.message));
  }, [reload]);

  const handleClientCreated = () => setReload((r) => !r);

  return (
    <div className="client-page">
      <h1>Clientes</h1>
      <div className="client-layout">
        <div className="client-form-card">
          <ClientForm onCreate={handleClientCreated} />
        </div>
        <div className="client-list-card">
          <h2>Lista de Clientes</h2>
          {error && <p className="message error">{error}</p>}
          {clients.length === 0 ? (
            <p>Nenhum cliente cadastrado.</p>
          ) : (
            <ul>
              {clients.map((client) => (
                <li key={client.id}>
                  <strong>{client.name}</strong> | {client.email} | {client.phone} | Status: {client.status}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClientPage;