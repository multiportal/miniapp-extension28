import { route } from "../pages/pages";

const renderPage = (path = '/home') => {
  const page = path.slice(1).toLowerCase() || 'home';
  app.innerHTML = route(page);
};

export function load() {
  let app = document.querySelector('#app');
  let lista = document.querySelector("#lista");
  if (!app || !lista) return;

  //Handle navigation clicks
  lista.addEventListener("click", (e) => {
    e.preventDefault();
    if (e.target && e.target.tagName === "A") {
      const ruta = e.target.getAttribute("href"); console.log(ruta);
      history.pushState(null, null, ruta);
      renderPage(ruta);
    }
  });

  //Load route
  renderPage(window.location.pathname);

  //Handle back/forward navigation
  window.addEventListener('popstate', () => {
    renderPage(window.location.pathname);
  });
}


