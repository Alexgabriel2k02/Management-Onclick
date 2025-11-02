import React from "react";

// Tenta usar react-router-dom em runtime; se não estiver instalado (ex.: ambiente de testes),
// exporta componentes/funções simples que permitem os componentes renderizarem sem lançar erro.
let rr = null;
try {
  // eslint-disable-next-line global-require
  rr = require("react-router-dom");
} catch (e) {
  rr = null;
}

export const Routes = rr && rr.Routes ? rr.Routes : ({ children }) => <>{children}</>;
export const Route = rr && rr.Route ? rr.Route : ({ element }) => (element ? element : null);
export const Navigate = rr && rr.Navigate ? rr.Navigate : ({ to }) => null;
export const BrowserRouter = rr && rr.BrowserRouter ? rr.BrowserRouter : ({ children }) => <>{children}</>;
export const useNavigate = rr && rr.useNavigate ? rr.useNavigate : () => () => {};
export const useParams = rr && rr.useParams ? rr.useParams : () => ({});
export const Link = rr && rr.Link ? rr.Link : ({ children }) => children;

export default {
  Routes,
  Route,
  Navigate,
  BrowserRouter,
  useNavigate,
  useParams,
  Link,
};
