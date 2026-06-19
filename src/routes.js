import { home } from "./pages/home.js";
import { productos } from "./pages/productos.js";

//*ROUTES*****************************************************/
export function route(page) {
  return routes[page]();
}

export const routes = {
  'home': home,
  'productos': productos
};
