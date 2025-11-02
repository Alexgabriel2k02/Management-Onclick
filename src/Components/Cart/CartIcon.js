import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CartService from "../../Services/CartService";
import "./CartIcon.css";

const CartIcon = () => {
  const [count, setCount] = useState(() => {
    try {
      return CartService.getCart().reduce((s, it) => s + Number(it.quantity || 0), 0);
    } catch (e) {
      return 0;
    }
  });

  useEffect(() => {
    const onUpdate = (e) => {
      try {
        const items = e?.detail?.items ?? CartService.getCart();
        setCount(items.reduce((s, it) => s + Number(it.quantity || 0), 0));
      } catch (err) {
        setCount(0);
      }
    };

    window.addEventListener("cart_updated", onUpdate);

    // também atualiza na montagem
    onUpdate({ detail: { items: CartService.getCart() } });

    return () => window.removeEventListener("cart_updated", onUpdate);
  }, []);

  return (
    <div className="cart-icon-wrapper">
      <Link to="/cart" className="cart-link" aria-label="Ver carrinho">
        <svg className="cart-svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor" aria-hidden>
          <path d="M7 4h-2l-1 2h2l3.6 7.59-1.35 2.45A1 1 0 0 0 9 17h8v-2H9.42c-.14 0-.25-.08-.3-.2L9.1 14h7.45a1 1 0 0 0 .9-.57l3.24-7.13L22 4H7z" />
        </svg>
        {count > 0 && <span className="cart-count">{count}</span>}
      </Link>
    </div>
  );
};

export default CartIcon;
