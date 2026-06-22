import { signOut } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js";
import { auth } from "../services/firebase.js";
import { renderPage } from "../../routes.js";

export function logout() {
  const closeSesion = async () => {
    await signOut(auth);
    console.log('Cerrando sesión...');
    history.pushState({}, "", '/');
    renderPage('');
  }
  setTimeout(closeSesion, 3000);
  return `
 <div class="container">
    <div class="row text-center">
      <div class="col-12">
        <h1>LOGOUT</h1>
        <p>Cerrando sesión...</p>
      </div>
    </div>
  </div>
 `;
}