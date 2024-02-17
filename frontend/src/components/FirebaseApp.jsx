import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDVSww84U27TAnGpgcaW2Pn57OvVj7t0Kk",
  authDomain: "novel-nook-f5ae2.firebaseapp.com",
  projectId: "novel-nook-f5ae2",
  storageBucket: "novel-nook-f5ae2.appspot.com",
  messagingSenderId: "495214507943",
  appId: "1:495214507943:web:015f11178a798725bfa882",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
