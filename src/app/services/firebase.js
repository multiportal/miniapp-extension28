import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import { getAuth, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore.js";
import { getDatabase, ref, set, onValue, child, get } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js";
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
    const tabRef = ref(db, tab + '/');
    onValue(tabRef, (snapshot) => {
      const data = snapshot.val(); //console.log(data);
      data ?
        resolve(Object.entries(data).map(([key, item]) => ({ key, ...item }))) :
        resolve(null);
    }, (error) => {
      reject(error);
    });
  });
}

//APP
const loggedOutLinks = document.querySelectorAll(".logged-out");
const loggedInLinks = document.querySelectorAll(".logged-in");

export const loginCheck = (user) => {
  console.log('loginCheck');
  if (user) {
    loggedInLinks.forEach((link) => (link.style.display = "block"));
    loggedOutLinks.forEach((link) => (link.style.display = "none"));
  } else {
    loggedInLinks.forEach((link) => (link.style.display = "none"));
    loggedOutLinks.forEach((link) => (link.style.display = "block"));
  }
};

/*export const loginCheck = (user) => {
  console.log('loginCheck');
  const btnLogout = document.querySelector('#logout-1');
  const btnRegis = document.querySelector('#btnRegis');
  const btnLogin = document.querySelector('#btnLogin');
  const formRegis = document.querySelector('.registro-page');
  const formLogin = document.querySelector('.login-page');
  const dash = document.querySelector('.dashboard');

  if (user) {
    formLogin.style.display = 'none';
    formRegis.style.display = 'none';
    dash.style.display = 'block';
    //if(btnLogout){btnLogout.style.display = "block";}
  } else {
    formLogin.style.display = 'block';
    //formRegis.style.display = 'block';
    dash.style.display = 'none';
    //if(btnLogout){btnLogout.style.display = "none";}
    if (btnRegis) {
      btnRegis.addEventListener('click', () => {
        formRegis.style.display = 'block';
        formLogin.style.display = 'none';
      });
    }
    if (btnLogin) {
      btnLogin.addEventListener('click', () => {
        formRegis.style.display = 'none';
        formLogin.style.display = 'block';
      });
    }
  }
};*/

export function saveUser(user) {
  console.log('saveUser');
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
      showMessage('Bienvenido', 'Información')
    }
    if (mod == 'dashboard' && !user) {
      history.pushState({}, "", '/noauth');
      renderPage('noauth');
    }
  });
}