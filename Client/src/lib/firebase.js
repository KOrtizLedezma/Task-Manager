// components/Firebase/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_REACT_APP_authDomain,
  projectId: process.env.NEXT_PUBLIC_REACT_APP_projectId,
  storageBucket: process.env.NEXT_PUBLIC_REACT_APP_storageBucket,
  messagingSenderId: process.env.NEXT_PUBLIC_REACT_APP_messagingSenderId,
  appId: process.env.NEXT_PUBLIC_REACT_APP_appId,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
