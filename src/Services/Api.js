const BASE_URL = "http://localhost:5000"; // URL base do backend Flask

export const fetchWithAuth = async (url, options = {}) => {
  const token = localStorage.getItem("token");
  const isFormData = options.body instanceof FormData;

  const headers = {
    ...(isFormData ? {} : { "Content-Type": "application/json" }),
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };

  const response = await fetch(`${BASE_URL}${url}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    if (response.status === 401 || response.status === 422) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    let error;
    try {
      error = await response.json();
    } catch {
      error = { message: await response.text() };
    }
    throw new Error(error.message || "Erro na requisição");
  }

  return response.json();
};