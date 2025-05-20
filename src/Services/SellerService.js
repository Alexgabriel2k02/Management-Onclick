import { fetchWithAuth } from "./Api";

export const activateSeller = (sellerId) => {
  return fetchWithAuth("/vendedores/activate", {
    method: "POST",
    body: JSON.stringify({ sellerId }),
  });
};