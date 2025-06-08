import React, { useEffect, useState } from "react";
import ClientForm from "./ClientForm";
import ClientList from "./ClientList";
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
        <ClientList clients={clients} error={error} />
      </div>
    </div>
  );
};

export default ClientPage;