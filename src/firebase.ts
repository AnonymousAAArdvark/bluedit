import firebase from "firebase";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDkSeUCVCAV6vm8RHcZktW-PSCSr7wbZ2s",
  authDomain: "bluedit-f6740.firebaseapp.com",
  projectId: "bluedit-f6740",
  storageBucket: "bluedit-f6740.appspot.com",
  messagingSenderId: "366553261215",
  appId: "1:366553261215:web:f8253c79044bb812652eaa",
  measurementId: "G-0GZZDRF0RX"
};

firebase.initializeApp(firebaseConfig);

export default firebase;

export const LINKPREVIEW_API_KEY = "a2b96b3b34071b49ca77b92133f16abe";