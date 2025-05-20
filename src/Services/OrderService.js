const BASE_URL = "http://localhost:5000"; // URL base do backend

// Função para criar um pedido
export const createOrder = async (orderData) => {
  const token = localStorage.getItem("token");
  const response = await fetch(`${BASE_URL}/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(orderData),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Erro ao criar pedido");
  }

  return response.json();
};

// Função para listar todos os pedidos
export const listOrders = async () => {
  const token = localStorage.getItem("token");
  const response = await fetch(`${BASE_URL}/orders`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Erro ao listar pedidos");
  }

  return response.json();
};

// Função para obter detalhes de um pedido específico
export const getOrderDetails = async (orderId) => {
  const token = localStorage.getItem("token");
  const response = await fetch(`${BASE_URL}/orders/${orderId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Erro ao obter detalhes do pedido");
  }

  return response.json();
};

// Função para atualizar um pedido
export const updateOrder = async (orderId, orderData) => {
  const token = localStorage.getItem("token");
  const response = await fetch(`${BASE_URL}/orders/${orderId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(orderData),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Erro ao atualizar pedido");
  }

  return response.json();
};

// Função para excluir um pedido
export const deleteOrder = async (orderId) => {
  const token = localStorage.getItem("token");
  const response = await fetch(`${BASE_URL}/orders/${orderId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Erro ao excluir pedido");
  }

  return response.json();
};