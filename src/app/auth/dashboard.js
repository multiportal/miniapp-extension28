import { getData, createData, putData, deleteData, getDataById } from "../services/firebase";

export function dashboard() {
  const tab = "productos";

  const btnBorrar = () => {
    document.addEventListener("click", (e) => {
      const btn = e.target.closest(".delete-btn");
      if (!btn) return;
      Swal.fire({
        title: "Esta seguro eliminar?",
        text: "¡Este cambio sera irreversible!",
        icon: "warning",
        showCancelButton: true,
        cancelButtonColor: "#d33",
        cancelButtonText: "Cancelar",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Aceptar",
      }).then((result) => {
        if (result.isConfirmed) {
          const fila = btn.closest("tr");
          const key = fila.getAttribute("key");
          console.log("Eliminar:", key);
          deleteData(tab, key);
          setTimeout(() => {
            products();
          }, 1000);
          Swal.fire({
            title: "¡Borrado!",
            text: "Tu registro ha sido borrado",
            icon: "success",
          });
        }
      });
    });
  };

  const btnEditar = () => {
    document.addEventListener("click", async (e) => {
      const btn = e.target.closest(".edit-btn");
      if (!btn) return;
      const fila = btn.closest("tr");
      const key = fila.getAttribute("key");
      console.log("Editar:", key);
      localStorage.setItem("Mode", "edit");
      localStorage.setItem("Key", key);
      const item = await getDataById(tab, key);
      console.log(item);
      document.querySelector("#Id").value = item.Id;
      document.querySelector("#nombre").value = item.nombre;
      document.querySelector("#precio").value = item.precio;
      document.querySelector("#desc").value = item.desc;
    });
  };

  const btnGuardar = async (e) => {
    e.preventDefault();
    const mode = localStorage.getItem("Mode");
    if (!mode) return;
    console.log("Mode:", mode);
    const Id = document.querySelector("#Id").value;
    const nombre = document.querySelector("#nombre").value;
    const precio = document.querySelector("#precio").value;
    const desc = document.querySelector("#desc").value;
    const body = {
      Id,
      nombre,
      precio,
      desc,
    }; console.log(body);
    if (mode == "add") {
      createData(tab, body);
    } else {
      const key = localStorage.getItem("Key");
      if (!key) return;
      putData(tab, key, body);
    }
    const form = document.querySelector("form#save-form");
    form.reset();
    setTimeout(() => { products(); }, 1000);
  };

  const products = async () => {
    let html = "";
    const data = await getData(tab);
    console.log(data);
    const productList = document.querySelector("#product-list");
    localStorage.removeItem("Key");
    localStorage.setItem("Mode", "add");
    if (!data) {
      document.querySelector("#Id").value = 1;
      productList.innerHTML = '<tr><td colspan="5"><p>No hay productos disponibles.</p></td></tr>';
      return;
    }
    //Cards
    for (const item of data) {
      var { Id, key, nombre, precio, desc } = item;
      //if (visible) {
      html += `
        <tr key="${key}">
          <th scope="row">${Id}</th>
          <td>${nombre}</td>
          <td>${precio}</td>
          <td>${desc}</td>
          <td>
            <button type="button" class="btn btn-primary mb-3 edit-btn">
              <i class="bi bi-pencil"></i>
            </button>
            <button type="button" class="btn btn-danger mb-3 delete-btn">
              <i class="bi bi-trash"></i>
            </button>
          </td>
        </tr>
      `;
      //}
    }
    productList.innerHTML = html;
    document.querySelector("#Id").value = Number(Id) + 1;
  };

  setTimeout(() => {
    products();
  }, 1000);

  setTimeout(() => {
    btnBorrar();
    btnEditar();
    const form = document.querySelector("#save-form");
    if (!form) return;
    form.addEventListener("submit", btnGuardar);
  }, 0);
  return `
 <div class="container">
   <div class="row">
     <h1>DASHBOARD</h1>
     <div class="col-md-4">
      <form id="save-form">
        <input type="text" class="form-control" id="Id" value="1">
        <div class="mb-3">
          <label for="nombre" class="form-label">Nombre*</label>
          <input type="text" class="form-control" id="nombre" required>
        </div>
        <div class="mb-3">
          <label for="precio" class="form-label">Precio*</label>
          <input type="text" class="form-control" id="precio" required>
        </div>
        <div class="mb-3">
          <label for="desc" class="form-label">Descripción</label>
          <input type="text" class="form-control" id="desc">
        </div>
        <button type="submit" class="btn btn-primary">Guardar</button>
        <button type="button" class="btn btn-danger" id="cancel">Cancelar</button>
      </form>
     </div>
     <div class="col-md-8" style="overflow-y: auto; height: 500px;">
        <table class="table">
          <thead class="table-dark">
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Nombre</th>
              <th scope="col">Precio</th>
              <th scope="col">Descripción</th>
              <th scope="col">Acción</th>
            </tr>
          </thead>
          <tbody id="product-list">  
          </tbody>
        </table>
     </div>
   </div>
 </div>
 `;
}
