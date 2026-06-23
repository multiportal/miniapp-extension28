
export function productos() {
    const products = async () => {
        let html = '';
        const productList = document.querySelector('#product-list');
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