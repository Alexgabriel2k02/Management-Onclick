import { fetchWithAuth } from "./Api";

export const createSale = (saleData) => {
  return fetchWithAuth("/sales", {
    method: "POST",
    body: JSON.stringify(saleData),
  });
};

// Função para listar vendas
export const listSales = () => {
  return fetchWithAuth("/sales", {
    method: "GET",
  });
};

export const realizarVenda = (orderId, outrosDados) => {
  return fetchWithAuth("/sales/realizar-venda", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      order_id: orderId,
      ...outrosDados,
    }),
  });
};