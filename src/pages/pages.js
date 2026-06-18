//*PAGES*****************************************************/
export function route(page) {
  return routes[page]();
}

export const routes = {
  'home': home,
  'pagina': pagina
};

//*HOME*****************************************************/
function home() {
  return `
  <div>
    <h1>HOME</h1>
  </div>
  `;
}
//*PAGINA*****************************************************/
function pagina() {
  return `
  <div>
    <h1>PAGINA</h1>
  </div>
  `;
}