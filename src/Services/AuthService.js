const API_URL = "http://localhost:5000"; // Substitua pela URL do seu backend, se necessário

// Função para registrar um novo vendedor
export const registerSeller = async (userData) => {
  const response = await fetch(`${API_URL}/register/vendedores`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    throw new Error("Erro ao registrar vendedor");
  }

  return response.json(); // Retorna os dados do backend
};

// Função para ativar um vendedor
export const activateSeller = async (sellerId) => {
  const response = await fetch(`${API_URL}/vendedores/activate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ sellerId }),
  });

  if (!response.ok) {
    throw new Error("Erro ao ativar vendedor");
  }

  return response.json(); // Retorna os dados do backend
};

// Função para fazer login de um vendedor
export const login = async (email, password) => {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    throw new Error("Erro ao fazer login");
  }

  return response.json(); // Retorna os dados do backend
};

// Função para fazer login de um cliente
export const loginClient = async (email, password) => {
  const response = await fetch(`${API_URL}/login/clients`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    throw new Error("Erro ao fazer login do cliente");
  }

  return response.json(); // Retorna os dados do backend
};

// Função para registrar um novo cliente
export const registerClient = async (clientData) => {
  const response = await fetch(`${API_URL}/register/clients`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(clientData),
  });

  if (!response.ok) {
    throw new Error("Erro ao registrar cliente");
  }

  return response.json(); // Retorna os dados do backend
};