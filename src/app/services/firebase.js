import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import { getAuth, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore.js";
import { getDatabase, ref, set, push, child, remove, onValue, get, update } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js";
import { prefix, variables, showMessage } from "../functions";
import { renderPage } from "../../routes";
// TODO: Add SDKs for Firebase products that you want to use
console.log('Firebase SDK');
// Your web app's Firebase configuration
/*var firebaseConfig = {
  apiKey: "AIzaSyDeX81H_K8AsV2KjQgEbwxte6yVdSYqFXk",
  authDomain: "vcardapp-js.firebaseapp.com",
  databaseURL: "https://vcardapp-js.firebaseio.com",
  projectId: "vcardapp-js",
  storageBucket: "vcardapp-js.appspot.com",
  messagingSenderId: "420720513571",
  appId: "1:420720513571:web:f072eeda6cd3cfa1429796",
  measurementId: "G-LDPZ4BZ1GV",
};*/

const firebaseConfig = {
  apiKey: "AIzaSyAOEuKTZEPTnUdjwzNpjVJdWAnz45umM-w",
  authDomain: "ventaapp-45918.firebaseapp.com",
  projectId: "ventaapp-45918",
  storageBucket: "ventaapp-45918.firebasestorage.app",
  messagingSenderId: "216887757045",
  appId: "1:216887757045:web:3434c08f0ade7e33819dbc",
  measurementId: "G-B6S3HZQW7N"
};

// Initialize Firebase
export const App = initializeApp(firebaseConfig);
export const auth = getAuth(App);
export const db = getDatabase(App);//Realtime Database
export const fs = getFirestore(App);//FireStore

//CRUD FUNCTIONS
export function getData(tab) {
  return new Promise((resolve, reject) => {
    const tabRef = ref(db, `${prefix}${tab}/`);
    onValue(tabRef, (snapshot) => {
      const data = snapshot.val(); //console.log(data);
      data ? resolve(Object.entries(data).map(([key, item]) => ({ key, ...item }))) : resolve(null);
    }, (error) => {
      reject(error);
    });
  });
}

export function postData(tab, body) {
  set(ref(db, `${prefix}${tab}/`), body);
}

export async function createData(tab, body) {
  const newRef = push(ref(db, `${prefix}${tab}/`));
  await set(newRef, body);
  showMessage("Se agrego correctamente", "Exito");
  return newRef.key;
}

export async function putData(tab, id, body) {
  await update(ref(db, `${prefix}${tab}/${id}`), body);
  showMessage("Se actualizo correctamente", "Exito");
}

export async function deleteData(tab, id) {
  await remove(ref(db, `${prefix}${tab}/${id}`));
  showMessage("Se elimino correctamente", "Exito");
}

export async function getDataById(tab, id) {
  const snapshot = await get(child(ref(db), `${prefix}${tab}/${id}`));
  if (!snapshot.exists()) { return null; }
  return {
    key: snapshot.key,
    ...snapshot.val()
  };
}

//APP
const loggedOutLinks = document.querySelectorAll(".logged-out");
const loggedInLinks = document.querySelectorAll(".logged-in");

export const loginCheck = (user) => {
  if (user) {
    loggedInLinks.forEach((link) => (link.style.display = "block"));
    loggedOutLinks.forEach((link) => (link.style.display = "none"));
  } else {
    loggedInLinks.forEach((link) => (link.style.display = "none"));
    loggedOutLinks.forEach((link) => (link.style.display = "block"));
  }
};

export function saveUser(user) {
  //console.log('saveUser');
  var u = {
    uid: user.uid,
    usuario: user.displayName,
    email: user.email,
    foto: user.photoURL
  };
  set(ref(db, prefix + "signup/" + user.uid), u);
}

export function getUserSesion(user) {
  const foto = document.querySelector("#photo");
  const nom = document.querySelector("#nombre_session");
  const mail = document.querySelector("#email_session");
  const uid = document.querySelector("#id_code_google");
  const tabRef = ref(db, prefix + 'signup/');
  onValue(tabRef, (snapshot) => {
    const data = snapshot.val(); //console.log(data);
    for (let key in data) {
      const u = data[key];
      if (u.uid == user.uid) {
        console.log(u);
        const f = (u.foto == null) ? page_url + 'bloques/files/images/photos/sinfoto.png' : u.foto;
        foto.innerHTML = '<img src="' + f + '" class="img-fluid rounded-circle">';
        nom.innerHTML = (u.usuario == null) ? u.email : u.usuario;
        mail.innerHTML = u.email;
        uid.innerHTML = u.uid;
      }
    }
  });
}

export function sesionActiva(v) {
  const { mod } = v;
  onAuthStateChanged(auth, async (user) => {
    console.log(mod, 'sesion activa:', user);
    if (user) {
      loginCheck(user);
      if (mod == 'dashboard') {
        try {
          saveUser(user);
        } catch (error) {
          console.log(error);
        }
      }
    } else {
      loginCheck(user);
    }
    if (mod == 'dashboard' && user) {
      showMessage('Bienvenido', 'Información');
    }
    if (mod == 'dashboard' && !user) {
      history.pushState({}, "", '/noauth');
      renderPage('noauth');
    }
  });
}