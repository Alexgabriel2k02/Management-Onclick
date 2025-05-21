const BASE_URL = "http://localhost:5000"; // URL base do backend

export const fetchWithAuth = async (url, options = {}) => {
  const token = localStorage.getItem("token");

  const headers = {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }), // Adiciona o token JWT, se existir
  };

  const response = await fetch(`${BASE_URL}${url}`, {
    ...options,
    headers: {
      ...headers,
      ...options.headers,
    },
  });

  if (!response.ok) {
    if (response.status === 401 || response.status === 422) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    const error = await response.json();
    throw new Error(error.message || "Erro na requisição");
  }

  return response.json();
};