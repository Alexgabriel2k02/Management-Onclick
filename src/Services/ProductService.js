import { fetchWithAuth } from "./Api";

export const createProduct = (productData) => {
  return fetchWithAuth("/products", {
    method: "POST",
    body: JSON.stringify(productData),
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
  });
};

export const inactivateProduct = (productId) => {
  return fetchWithAuth(`/products/${productId}/inactivate`, {
    method: "PATCH",
  });
};

