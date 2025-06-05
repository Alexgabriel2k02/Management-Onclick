const API_URL = "http://localhost:5000"; // ajuste se necessário

export async function createClient(client) {
  const response = await fetch(`${API_URL}/register/clients`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(client),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.mensagem || "Erro ao cadastrar cliente");
  return data;
}

export async function listClients() {
  const response = await fetch(`${API_URL}/clients`);
  if (!response.ok) throw new Error("Erro ao buscar clientes");
  return response.json();
}