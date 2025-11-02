import React, { useEffect, useState } from "react";
import CartService from "../../Services/CartService";
import { createSale } from "../../Services/SaleService";
import "./CartPage.css";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const [items, setItems] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState("credit");
  const [processing, setProcessing] = useState(false);
  const [message, setMessage] = useState(null);
  const [cardHolder, setCardHolder] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");
  const [installments, setInstallments] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    setItems(CartService.getCart());
  }, []);

  const refresh = () => setItems(CartService.getCart());

  const handleRemove = (id) => {
    CartService.removeItem(id);
    refresh();
  };

  const handleQtyChange = (id, qty) => {
    const q = Number(qty) || 0;
    CartService.updateItemQuantity(id, q);
    refresh();
  };

  const handleClear = () => {
    CartService.clear();
    refresh();
  };

  const total = items.reduce((s, it) => s + Number(it.price || 0) * Number(it.quantity || 0), 0);

  const handleCheckout = async () => {
    if (!items || items.length === 0) {
      alert("Carrinho vazio.");
      return;
    }

    setProcessing(true);
    setMessage(null);

    // Monta um payload simples para enviar ao backend; se o backend exigir outro formato, ajustar.
    const payload = {
      items: items.map((it) => ({ product_id: it.id, quantity: it.quantity, price: it.price })),
      total: total,
      payment_method: paymentMethod, // 'credit' | 'debit' | 'pix'
    };

    try {
      // Tenta criar uma venda usando o SaleService; pode falhar se o backend esperar outro formato.
      // incluir payment_details se for cartão
      if (paymentMethod === "credit" || paymentMethod === "debit") {
        payload.payment_details = {
          card_holder_name: cardHolder,
          card_number: cardNumber,
          card_expiry: cardExpiry,
          card_cvv: cardCvv,
          installments: paymentMethod === "credit" ? installments : 1,
        };
      }

      await createSale(payload);
      setMessage({ type: "success", text: "Pagamento realizado com sucesso!" });
      CartService.clear();
      refresh();
      // Opcional: direcionar para página de vendas/ordens
      setTimeout(() => navigate("/sale"), 1200);
    } catch (err) {
      console.error(err);
      setMessage({ type: "error", text: "Erro ao processar pagamento. (Simulação)" });
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="cart-page">
      <h2>Carrinho</h2>
      {items.length === 0 ? (
        <p>Seu carrinho está vazio.</p>
      ) : (
        <div className="cart-content">
          <ul className="cart-items">
            {items.map((it) => (
              <li key={it.id} className="cart-item">
                <img src={it.img ? `http://localhost:5000/${it.img}` : undefined} alt={it.name} />
                <div className="cart-item-info">
                  <div className="cart-item-name">{it.name}</div>
                  <div className="cart-item-price">R$ {Number(it.price).toFixed(2)}</div>
                  <div className="cart-item-qty">
                    Qtde: <input type="number" min="0" value={it.quantity} onChange={(e) => handleQtyChange(it.id, e.target.value)} />
                  </div>
                </div>
                <div className="cart-item-actions">
                  <button onClick={() => handleRemove(it.id)}>Remover</button>
                </div>
              </li>
            ))}
          </ul>

          <div className="cart-sidebar">
            <div className="cart-summary">
              <div>Total: <b>R$ {total.toFixed(2)}</b></div>
            </div>

            <div className="cart-payment">
              <h3>Pagamento</h3>
              <label>
                <input type="radio" name="payment" value="credit" checked={paymentMethod === "credit"} onChange={() => setPaymentMethod("credit")} /> Cartão de crédito
              </label>
              <label>
                <input type="radio" name="payment" value="debit" checked={paymentMethod === "debit"} onChange={() => setPaymentMethod("debit")} /> Cartão de débito
              </label>
              <label>
                <input type="radio" name="payment" value="pix" checked={paymentMethod === "pix"} onChange={() => setPaymentMethod("pix")} /> PIX
              </label>

              {(paymentMethod === "credit" || paymentMethod === "debit") && (
                <div className="payment-card-form">
                  <label>Nome do titular</label>
                  <input type="text" value={cardHolder} onChange={(e) => setCardHolder(e.target.value)} placeholder="Nome impresso no cartão" />

                  <label>Número do cartão</label>
                  <input type="text" value={cardNumber} onChange={(e) => setCardNumber(e.target.value.replace(/\s+/g, ""))} placeholder="0000 0000 0000 0000" maxLength={19} />

                  <div style={{display:'flex',gap:8}}>
                    <div style={{flex:1}}>
                      <label>Validade (MM/AA)</label>
                      <input type="text" value={cardExpiry} onChange={(e) => setCardExpiry(e.target.value)} placeholder="MM/AA" maxLength={5} />
                    </div>
                    <div style={{width:120}}>
                      <label>CVV</label>
                      <input type="password" value={cardCvv} onChange={(e) => setCardCvv(e.target.value)} placeholder="123" maxLength={4} />
                    </div>
                  </div>

                  {paymentMethod === "credit" && (
                    <>
                      <label>Parcelas</label>
                      <select value={installments} onChange={(e) => setInstallments(Number(e.target.value))}>
                        <option value={1}>1x</option>
                        <option value={2}>2x</option>
                        <option value={3}>3x</option>
                        <option value={6}>6x</option>
                      </select>
                    </>
                  )}
                </div>
              )}

              <div className="checkout-actions">
                <button onClick={handleCheckout} disabled={processing}>{processing ? 'Processando...' : 'Finalizar Compra'}</button>
                <button onClick={handleClear} disabled={processing}>Limpar Carrinho</button>
              </div>

              {message && (
                <div className={`cart-message ${message.type}`}>{message.text}</div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
