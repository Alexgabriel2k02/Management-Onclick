import { fetchWithAuth } from "./Api";

export const activateSeller = (sellerId) => {
  return fetchWithAuth("/vendedores/activate", {
    method: "POST",
    body: JSON.stringify({ sellerId }),
  });
};

export const listSellers = async () => {
  const response = await fetchWithAuth("/sellers", {
    method: "GET",
  });
  if (!response.ok) throw new Error("Erro ao buscar vendedores");
  return response.json();
};