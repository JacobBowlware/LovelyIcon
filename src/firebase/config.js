import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBFHR_xBNW6kmO3EgUAL38niCS40w5oZfU",
    authDomain: "lovelyicon-f3ad1.firebaseapp.com",
    projectId: "lovelyicon-f3ad1",
    storageBucket: "lovelyicon-f3ad1.appspot.com",
    messagingSenderId: "437050328354",
    appId: "1:437050328354:web:b184755ae5d055b4a7517b",
    measurementId: "G-GG6HVE9N49"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };