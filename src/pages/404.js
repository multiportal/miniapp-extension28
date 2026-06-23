//import { variables } from "../app/functions.js";

export function notFound() {
  return `
  <div class="container">
    <div class="row text-center">
      <div class="col-12">
        <h1>Error 404</h1>
        <p>La página que buscas no existe.</p>
        <a href="/" class="col-2 btn btn-primary">Volver</a>
      </div>
    </div>
  </div>
  `;
}