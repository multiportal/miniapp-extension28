//import { variables } from "../app/functions.js";
import { prefix } from '../app/functions.js';
import { getData } from '../app/services/firebase.js';

export function productos() {
    const products = async () => {
        let html = '';
        const data = await getData('productos'); console.log(data);
        const productList = document.querySelector('#product-list');
        if (!data) {
            productList.innerHTML = '<p>No hay productos disponibles.</p>';
            return;
        }
        //Cards
        for (const item of data) {
            var { Id, key, nombre, precio, desc } = item;
            //if (visible) {
                html += `
                <div class="card mb-3" key="${key}">
                    <div class="card-body">
                        <h5 class="card-title mb-0">${nombre}</h5>
                        <p class="card-text">${desc}</p>
                        <a href="/productos/item" class="btn btn-primary">Ver más</a>
                    </div>
                </div>
                `;
            //}
        }
        productList.innerHTML = html;
    };

    setTimeout(() => { products(); }, 1000);

    return `
  <div class="container">
    <div class="row">
      <h1>PRODUCTOS</h1>
      <p>Esta es la página de productos.</p>
      <div class="col-md-12" id="product-list">Cargando...</div>
    </div>
  </div>
  `;
}