import { fetchWithAuth } from "./Api";

export const createSale = (saleData) => {
  return fetchWithAuth("/sales", {
    method: "POST",
    body: JSON.stringify(saleData),
  });
};