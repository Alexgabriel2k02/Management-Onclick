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

// Função para obter histórico de vendas com filtros
export const getSalesHistory = (filters = {}) => {
  const params = new URLSearchParams();
  
  if (filters.dateFrom) params.append("date_from", filters.dateFrom);
  if (filters.dateTo) params.append("date_to", filters.dateTo);
  if (filters.productId) params.append("product_id", filters.productId);
  if (filters.minValue) params.append("min_value", filters.minValue);
  if (filters.maxValue) params.append("max_value", filters.maxValue);
  
  const queryString = params.toString();
  const url = queryString ? `/sales/history?${queryString}` : "/sales/history";
  
  return fetchWithAuth(url, {
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
