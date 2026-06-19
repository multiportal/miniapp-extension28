import { renderPage, navigate } from "../routes.js";

/* ==========================
   VARIABLES
========================== */
export function variables() {
  const w = window;
  const d = document;
  const loc = w.location;
  const dt = new Date();
  const day = String(dt.getDate()).padStart(2, "0");
  const mon = String(dt.getMonth() + 1).padStart(2, "0");
  const year = dt.getFullYear();
  const fecha = `${year}-${mon}-${day}`;
  /*CONSTANTES */
  const { protocol, host, origin, pathname, hash, href, search } = loc;
  const dominio = origin;
  const URL = href;
  const path = pathname;

  return {
    w,
    d,
    loc,
    dt,
    day,
    mon,
    year,
    fecha,
    protocol,
    host,
    origin,
    pathname,
    hash,
    href,
    search,
    dominio,
    URL,
    path
  };
}

/* ==========================
   PARAMETROS URL
========================== */
export function urlVars(search = window.location.search) {
  const params = new URLSearchParams(search);
  return {
    mod: params.get("mod") || "Home",
    ext: params.get("ext") || "index",
    id: params.get("id") || ""
  };
}

/* ==========================
   EVENTOS LINKS
========================== */
export function loadNavigate() {
  document.addEventListener("click", (event) => {
    const link = event.target.closest("a");
    if (!link) return;
    const ruta = link.getAttribute("href"); console.log("Ruta:", ruta);
    if (!ruta || ruta.startsWith("http") || ruta.startsWith("mailto:") || ruta.startsWith("tel:")) {
      return;
    }
    event.preventDefault();
    navigate(ruta);
  });
}

/* ==========================
   LOAD
========================== */
export function load() {
  const app = document.querySelector("#app");
  if (!app) return;
  //Navegación
  loadNavigate();
  // Observador para detectar cambios en el DOM
  const observer = new MutationObserver(() => {
    console.log("Carga del DOM detectada");
    // Aquí puedes ejecutar lógica adicional
    // cuando se agreguen nodos dinámicamente.
  });
  observer.observe(document.body, {
    childList: true,   // Detecta nodos agregados/eliminados
    subtree: true      // Incluye todos los descendientes
  });
  //Load route
  renderPage(window.location.pathname);
  //Handle back/forward navigation
  window.addEventListener('popstate', () => {
    renderPage(window.location.pathname);
  });
}