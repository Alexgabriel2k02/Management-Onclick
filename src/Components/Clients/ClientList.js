import React from "react";
import "./ClientList.css";

const ClientList = ({ clients, error }) => (
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
);

export default ClientList;