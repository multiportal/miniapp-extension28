import { sesionActiva } from "../services/firebase";

export function dashboard() {
  //sesionActiva();
 return `
 <div class="container">
   <div class="row">
     <h1>DASHBOARD</h1>
     <p>Esta es la página del dashboard.</p>
   </div>
 </div>
 `;    
}