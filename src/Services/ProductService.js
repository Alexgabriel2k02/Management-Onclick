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

