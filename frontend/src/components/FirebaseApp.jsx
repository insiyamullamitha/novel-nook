import { initializeApp } from "firebase/app";
import {
  getAuth,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth";
import { getFirestore, collection, getDocs } from "firebase/firestore/lite";

const firebaseConfig = {
  apiKey: "AIzaSyDVSww84U27TAnGpgcaW2Pn57OvVj7t0Kk",
  authDomain: "novel-nook-f5ae2.firebaseapp.com",
  projectId: "novel-nook-f5ae2",
  storageBucket: "novel-nook-f5ae2.appspot.com",
  messagingSenderId: "495214507943",
  appId: "1:495214507943:web:015f11178a798725bfa882",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

setPersistence(auth, browserLocalPersistence);

const db = getFirestore(app);

export const getBooks = async () => {
  const booksCol = collection(db, "Book");
  const bookSnapshot = await getDocs(booksCol);
  const bookList = bookSnapshot.docs.map((doc) => doc.data());
  return bookList;
};

export { auth };
export default app;
