import { signOut } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js";
import { auth } from "../services/firebase";

export function logout() {
  const closeSesion = async () => {
    await signOut(auth);
    console.log('Cerrando sesión...');
    setTimeout(() => {
      window.location.href = '/';
    }, 3000);
  }
  closeSesion();
  return `
 <div class="container">
   <div class="row">
     <h1>LOGOUT</h1>
     <p>Cerrando sesión...</p>
   </div>
 </div>
 `;
}