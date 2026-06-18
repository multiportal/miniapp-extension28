import { route } from "../pages/pages";

export function load() {
    let app =  document.querySelector('#app');
    if (!app) return;
    let lista = document.querySelector("#lista");
    if (lista) {
      lista.addEventListener("click", (e) => {
        if (e.target && e.target.tagName === "A") {
          let page = e.target.innerHTML.toLowerCase();
          app.innerHTML = route(page);
        }
      });
    }
    //Load route
    app.innerHTML = route('home');
}


