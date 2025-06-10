import { fetchWithAuth } from "./Api";

// Novo createProduct que aceita FormData ou JSON
export const createProduct = (productData, isMultipart = false) => {
  return fetchWithAuth("/products", {
    method: "POST",
    body: isMultipart ? productData : JSON.stringify(productData),
    ...(isMultipart
      ? {} // Não define Content-Type, o navegador faz isso
      : { headers: { "Content-Type": "application/json" } }
    ),
  });
};

export const listProducts = () => {
  return fetchWithAuth("/products", {
    method: "GET",
  });
};

export const getProductDetails = (productId) => {
  return fetchWithAuth(`/products/${productId}`, {
    method: "GET",
  });
};

export const updateProduct = (productId, productData) => {
  return fetchWithAuth(`/products/${productId}`, {
    method: "PUT",
    body: JSON.stringify(productData),
    headers: { "Content-Type": "application/json" },
  });
};

export const inactivateProduct = (productId) => {
  return fetchWithAuth(`/products/${productId}/inactivate`, {
    method: "PATCH",
  });
};

export const toggleProductStatus = (productId) => {
  return fetchWithAuth(`/products/${productId}/toggle-status`, {
    method: "PATCH",
  });
};

export const deleteProduct = (productId) => {
  return fetchWithAuth(`/products/${productId}`, {
    method: "DELETE",
  });
};

export const copyProduct = (productId) => {
  return fetchWithAuth(`/products/${productId}/copy`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });
};

export const applyDiscount = (productId) => {
  return fetchWithAuth(`/products/${productId}/discount`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });
};

export const listProductsForSale = async () => {
  const token = localStorage.getItem("token");
  const response = await fetch("http://localhost:5000/products/for-sale", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error("Erro ao buscar produtos para venda");
  }
  return response.json();
};

