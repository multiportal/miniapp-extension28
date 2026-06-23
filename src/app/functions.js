import { renderPage, navigate } from "../routes.js";
import { sesionActiva } from "./services/firebase.js";

/* ==========================
   CONSTANTES 
========================== */
export const app = document.querySelector("#app");
export const prefix = 'venta_'

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
  //
  const { mod, ext, id } = urlVariables(path);

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
    path,
    mod,
    ext,
    id
  };
}

/* ==========================
   PARAMETROS URL
========================== */
export function urlVariables(path) {
  const vars = path.split('/'); //console.log(vars);
  var mod = vars[1] === '' ? 'home' : vars[1];
  var ext = vars[2] === '' || vars[2] === undefined ? '' : vars[2];
  var id = vars[3] === '' || vars[3] === undefined ? '' : vars[3];
  const url_var = { mod, ext, id };
  return url_var;
}

/* ==========================
   EVENTOS LINKS
========================== */
export function loadNavigate() {
  document.addEventListener("click", (event) => {
    const link = event.target.closest("a");
    if (!link) return;
    const ruta = link.getAttribute("href"); //console.log("Ruta:", ruta);
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

/* ==========================
   MENSAJES / ALERTAS
========================== */
function closeMessage() {
  const btnClose = document.querySelector('.btn-close');
  if (btnClose) {
    btnClose.addEventListener('click', closeAlert);
  }
}

function closeAlert() {
  const alert = document.querySelector('#liveToast');
  if (alert) {
    alert.classList.remove('show');
    alert.classList.add('hide');
  }
}

export function showMessage(msj, type) {
  const alert = document.querySelector('#liveToast');
  if (!alert) return;
  alert.classList.remove('hide');
  alert.classList.add('show');
  alert.innerHTML = `
  <div class="toast-header ${type === 'Exito' ? 'bg-success text-white' : type === 'Error' ? 'bg-danger text-white' : 'bg-secondary text-white'}">
    <strong class="me-auto">${type}</strong>
    <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
  </div>
  <div class="toast-body">
    ${type}: ${msj}
  </div>
  `;
  closeMessage();
  setTimeout(closeAlert, 3000);
}

export function alertMessage(msj, type) {
  let alert = document.querySelector('#alert');
  let errTypeAlert = type == 'success' ? type : type == 'warning' ? type : type == 'info' ? type : 'danger'; //(type=='error')?'danger':(type=='warning')?type:(type=='success')?type:'info';
  if (alert) {
    alert.innerHTML = `<div class="alert alert-${errTypeAlert}" role="alert">
        ${type}: ${msj}</div>`;
  }
}

export const toggleEye = () => {
  const password = document.getElementById('password');
  const togglePassword = document.getElementById('togglePassword');
  const icon = togglePassword.querySelector('i');

  togglePassword.addEventListener('click', () => {
    const isPassword = password.type === 'password';
    password.type = isPassword ? 'text' : 'password';
    icon.classList.toggle('bi-eye');
    icon.classList.toggle('bi-eye-slash');
  });
};