const CART_KEY = "cart_items_v1";

const read = () => {
  try {
    const raw = localStorage.getItem(CART_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error("Erro lendo cart do localStorage", e);
    return [];
  }
};

const write = (items) => {
  try {
    localStorage.setItem(CART_KEY, JSON.stringify(items));
    try {
      // Dispara evento para avisar UI sobre alteração do carrinho
      if (typeof window !== "undefined" && window.dispatchEvent) {
        window.dispatchEvent(new CustomEvent("cart_updated", { detail: { count: items.length, items } }));
      }
    } catch (e) {
      // ignore
    }
  } catch (e) {
    console.error("Erro gravando cart no localStorage", e);
  }
};

const getCart = () => {
  return read();
};

const addItem = (product, quantity = 1) => {
  const items = read();
  const idx = items.findIndex((i) => i.id === product.id);
  if (idx !== -1) {
    items[idx].quantity = (items[idx].quantity || 0) + Number(quantity);
  } else {
    items.push({ ...product, quantity: Number(quantity) });
  }
  write(items);
  return items;
};

const removeItem = (productId) => {
  const items = read().filter((i) => i.id !== productId);
  write(items);
  return items;
};

const updateItemQuantity = (productId, quantity) => {
  const items = read();
  const idx = items.findIndex((i) => i.id === productId);
  if (idx !== -1) {
    items[idx].quantity = Number(quantity);
    if (items[idx].quantity <= 0) {
      items.splice(idx, 1);
    }
    write(items);
  }
  return items;
};

const clear = () => {
  write([]);
};

const getTotal = () => {
  const items = read();
  return items.reduce((sum, it) => sum + Number(it.price || 0) * Number(it.quantity || 0), 0);
};

export default {
  getCart,
  addItem,
  removeItem,
  updateItemQuantity,
  clear,
  getTotal,
};
