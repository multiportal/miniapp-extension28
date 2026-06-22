import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js";
import { auth } from "../services/firebase.js";
import { showMessage } from "../functions.js";

async function btnGuardar(e) {
  e.preventDefault();
  console.log('Validación de Datos');
  let u = document.getElementById('username').value;
  let p = document.getElementById('password').value;
  console.log('Usuario:', u, 'Password:', p);
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, u, p); 
    console.log('Usuario registrado:', userCredential.user);
    const form = document.querySelector("#register-form");
    if (form) form.reset();
    showMessage("Registro exitoso", "Exito");
  } catch (error) {
    console.error('Error al registrarse:', error);
    if (error.code === 'auth/email-already-in-use') {
      showMessage("Email ya registrado", "Error")
    } else if (error.code === 'auth/invalid-email') {
      showMessage("Email invalido", "Error")
    } else if (error.code === 'auth/weak-password') {
      showMessage("Password débil", "Error")
    } else if (error.code) {
      showMessage("Hubo un error, intenta de nuevo", "Error")
    }
  }
}

export function register() {
  setTimeout(() => {
    const form = document.querySelector("#register-form");
    if (!form) return;
    form.addEventListener("submit", btnGuardar);
  }, 0);
  return `
<div class="container">
  <div class="row">
    <div class="col-md-6 offset-md-3">
      <h1>REGISTRO</h1>
      <form id="register-form">
        <div class="mb-3">
          <label for="username" class="form-label">Email</label>
          <input type="username" class="form-control" id="username" required>
        </div>
        <div class="mb-3">
          <label for="password" class="form-label">Password</label>
          <input type="password" class="form-control" id="password" required>
        </div>
        <button type="submit" class="btn btn-primary">Aceptar</button>
      </form>
      <div class="barLogin">
        <a href="/">Inicio</a> | <a href="/login">Login</a> | <a href="/forget">Recuperar Contraseña</a>
      </div>
    </div>
  </div>
</div>
`;
}