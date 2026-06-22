import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js";
import { auth } from "../services/firebase.js";
import { showMessage } from "../functions.js";

async function btnGuardar(e) {
  e.preventDefault();
  console.log('Validación de Datos');
  let u = document.getElementById('username').value;
  let p = document.getElementById('password').value;
  console.log('Usuario:', u, 'Password:', p);
  try {
    const userCredential = await signInWithEmailAndPassword(auth, u, p);
    console.log('Usuario inició sesión:', userCredential.user);
    const form = document.querySelector("#login-form");
    if (form) form.reset();
    setTimeout(() => {
      window.location.href = '/dashboard';
    }, 500);
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    if (error.code === 'auth/wrong-password') {
      showMessage("Contraseña incorrecta", "Error")
    } else if (error.code === 'auth/user-not-found') {
      showMessage("Email no encontrado", "Error")
    } else if (error.code) {
      showMessage("Hubo un error, intenta de nuevo", "Error")
    }
  }
}

export function login() {
  setTimeout(() => {
    const form = document.querySelector('form#login-form');
    if (!form) return;
    form.addEventListener('submit', btnGuardar);
  }, 0);
  return `
<div class="container">
  <div class="row">
    <div class="col-md-6 offset-md-3">
      <h1>LOGIN</h1>
      <form id="login-form">
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
      <div>
        <a href="/">Inicio</a> | <a href="/registro">Registrarse</a> | <a href="/forget">Recuperar Contraseña</a>
      </div>
    </div>
  </div>
</div>
 `;
}