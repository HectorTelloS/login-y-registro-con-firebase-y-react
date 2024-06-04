// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAOA2MhfTANu2COHY7G6qyO27YbHzLKffY",
    authDomain: "login-con-firebase-y-react.firebaseapp.com",
    projectId: "login-con-firebase-y-react",
    storageBucket: "login-con-firebase-y-react.appspot.com",
    messagingSenderId: "703203798914",
    appId: "1:703203798914:web:21c1f403bdc8860ad6e99b"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)