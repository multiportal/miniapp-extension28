import { home } from "./pages/home.js";
import { pagina } from "./pages/pagina.js";

//*ROUTES*****************************************************/
export function route(page) {
  return routes[page]();
}

export const routes = {
  'home': home,
  'pagina': pagina
};
