import { variables } from "./app/functions.js";
import { login } from "./app/auth/login.js";
import { logout } from "./app/auth/logout.js";
import { dashboard } from "./app/auth/dashboard.js";
import { home } from "./pages/home.js";
import { productos } from "./pages/productos.js";
import { notFound } from "./pages/404.js";

/* ==========================
   RUTAS
========================== */
export const routes = {
  'home': home,
  'productos': productos,
  'login': login, 
  'logout': logout,
  'dashboard': dashboard,
  '404': notFound
};

/* ==========================
   ROUTER
========================== */
export const renderPage = (path = "/home") => {
  const app = document.querySelector("#app");
  if (!app) return;
  const page = path.replace(/^\/+/, "").toLowerCase() || "home";
  const validPage = Object.hasOwn(routes, page) ? page : "404";
  console.log("Rendering:", validPage);
  app.innerHTML = route(validPage) || route("404")();
};

export function route(page) {
  const v = variables(); console.log(v);
  return routes[page]() || routes['404']();
}

/* ==========================
   NAVEGACIÓN
========================== */
export function navigate(path) {
  history.pushState({}, "", path);
  renderPage(path);
}
