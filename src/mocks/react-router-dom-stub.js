const React = require('react');

const Routes = ({ children }) => React.createElement(React.Fragment, null, children);
const Route = ({ element }) => element || null;
const Navigate = ({ to }) => null;
const BrowserRouter = ({ children }) => React.createElement(React.Fragment, null, children);

const useNavigate = () => {
  return () => {};
};

const Link = ({ children }) => React.createElement('a', null, children);

module.exports = {
  Routes,
  Route,
  Navigate,
  BrowserRouter,
  useNavigate,
  Link,
};
