import React, { useState, useEffect } from "react";
import { getSalesHistory } from "../../Services/SaleService";
import { listProductsForSale } from "../../Services/ProductService";
import "./SalesHistory.css";

const SalesHistory = () => {
  const [sales, setSales] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filters, setFilters] = useState({
    dateFrom: "",
    dateTo: "",
    productId: "",
    minValue: "",
    maxValue: "",
  });
  const user = JSON.parse(localStorage.getItem("user"));
  const sellerId = user?.id;

  // Buscar vendas e produtos
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [salesData, productsData] = await Promise.all([
          getSalesHistory(filters),
          listProductsForSale(),
        ]);
        setSales(salesData);
        setProducts(productsData);
        setError("");
      } catch (err) {
        console.error("Erro ao buscar dados:", err);
        setError("Erro ao carregar histórico de vendas");
        setSales([]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [filters]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const clearFilters = () => {
    setFilters({
      dateFrom: "",
      dateTo: "",
      productId: "",
      minValue: "",
      maxValue: "",
    });
  };

  const calculateTotals = () => {
    const totalVendas = sales.length;
    const totalValue = sales.reduce(
      (sum, sale) => sum + parseFloat(sale.total_price || 0),
      0
    );
    const totalQuantidade = sales.reduce(
      (sum, sale) => sum + (sale.quantity || 0),
      0
    );
    return { totalVendas, totalValue, totalQuantidade };
  };

  const getProductName = (productId) => {
    const product = products.find(p => p.id === productId);
    return product ? product.name || `Produto #${productId}` : `Produto #${productId}`;
  };

  const { totalVendas, totalValue, totalQuantidade } = calculateTotals();

  if (loading) {
    return <div className="sales-history-page"><p className="loading">Carregando histórico de vendas...</p></div>;
  }

  return (
    <div className="sales-history-page">
      {error && <p className="error-message">{error}</p>}

      <div className="sales-header">
        <h1>Histórico de Vendas</h1>
      </div>

      {/* Filtros */}
      <div className="filters-card">
        <h3>Filtros</h3>
        <div className="filters-grid">
          <div className="filter-group">
            <label>Data Inicial:</label>
            <input
              type="date"
              name="dateFrom"
              value={filters.dateFrom}
              onChange={handleFilterChange}
            />
          </div>

          <div className="filter-group">
            <label>Data Final:</label>
            <input
              type="date"
              name="dateTo"
              value={filters.dateTo}
              onChange={handleFilterChange}
            />
          </div>

          <div className="filter-group">
            <label>Produto:</label>
            <select
              name="productId"
              value={filters.productId}
              onChange={handleFilterChange}
            >
              <option value="">Todos os produtos</option>
              {products.map(product => (
                <option key={product.id} value={product.id}>
                  {product.name}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label>Valor Mínimo:</label>
            <input
              type="number"
              name="minValue"
              value={filters.minValue}
              onChange={handleFilterChange}
              placeholder="R$ 0,00"
              min="0"
              step="0.01"
            />
          </div>

          <div className="filter-group">
            <label>Valor Máximo:</label>
            <input
              type="number"
              name="maxValue"
              value={filters.maxValue}
              onChange={handleFilterChange}
              placeholder="R$ 0,00"
              min="0"
              step="0.01"
            />
          </div>

          <div className="filter-group button-group">
            <button className="btn-clear" onClick={clearFilters}>
              Limpar Filtros
            </button>
          </div>
        </div>
      </div>

      {/* Resumo */}
      <div className="summary-card">
        <div className="summary-item">
          <span className="summary-label">Total de Vendas</span>
          <span className="summary-value">{totalVendas}</span>
        </div>
        <div className="summary-item">
          <span className="summary-label">Quantidade Total</span>
          <span className="summary-value">{totalQuantidade} unid.</span>
        </div>
        <div className="summary-item highlight">
          <span className="summary-label">Valor Total</span>
          <span className="summary-value">
            R$ {totalValue.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </span>
        </div>
      </div>

      {/* Lista de Vendas */}
      <div className="sales-list-card">
        <h3>Vendas</h3>
        {sales.length === 0 ? (
          <p className="no-sales">Nenhuma venda encontrada com os filtros aplicados.</p>
        ) : (
          <div className="table-responsive">
            <table className="sales-table">
              <thead>
                <tr>
                  <th>Data</th>
                  <th>Produto</th>
                  <th>Quantidade</th>
                  <th>Valor Unitário</th>
                  <th>Valor Total</th>
                </tr>
              </thead>
              <tbody>
                {sales.map((sale, idx) => {
                  const product = products.find(p => p.id === sale.product_id);
                  const unitPrice = product ? product.price : "N/A";
                  const totalPrice = parseFloat(sale.total_price || 0).toLocaleString("pt-BR", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  });
                  const unitPriceFormatted = typeof unitPrice === "number"
                    ? unitPrice.toLocaleString("pt-BR", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })
                    : unitPrice;

                  return (
                    <tr key={idx} className="sale-row">
                      <td className="date-cell">
                        {new Date(sale.date || sale.created_at).toLocaleDateString("pt-BR")} {" "}
                        {new Date(sale.date || sale.created_at).toLocaleTimeString("pt-BR")}
                      </td>
                      <td className="product-cell">{getProductName(sale.product_id)}</td>
                      <td className="quantity-cell">{sale.quantity}</td>
                      <td className="price-cell">R$ {unitPriceFormatted}</td>
                      <td className="total-cell">R$ {totalPrice}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default SalesHistory;
