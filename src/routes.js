import { variables, app } from "./app/functions.js";
import { dashboard } from "./app/auth/dashboard.js";
import { register } from "./app/auth/register.js";
import { login } from "./app/auth/login.js";
import { logout } from "./app/auth/logout.js";
import { noauth } from "./app/auth/noauth.js";
import { home } from "./pages/home.js";
import { productos } from "./pages/productos.js";
import { notFound } from "./pages/404.js";
import { sesionActiva } from "./app/services/firebase.js";

/* ==========================
   RUTAS
========================== */
export const routes = {
  'home': home,
  'productos': productos,
  'registro': register,
  'login': login, 
  'logout': logout,
  'noauth': noauth,
  'dashboard': dashboard,
  '404': notFound
};

/* ==========================
   ROUTER
========================== */
export const renderPage = (path = "/home") => {
  //const app = document.querySelector("#app");
  if (!app) return;
  const page = path.replace(/^\/+/, "").toLowerCase() || "home";
  const validPage = Object.hasOwn(routes, page) ? page : "404";
  console.log("Rendering:", validPage);
  app.innerHTML = route(validPage) || route("404")();
};

export function route(page) {
  const v = variables(); console.log(v);
  sesionActiva(v);
  return routes[page]() || routes['404']();
}

/* ==========================
   NAVEGACIÓN
========================== */
export function navigate(path) {
  history.pushState({}, "", path);
  renderPage(path);
}
