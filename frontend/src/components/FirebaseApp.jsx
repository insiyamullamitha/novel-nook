import { initializeApp } from "firebase/app";
import {
  getAuth,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  getDocs,
  getDoc,
  setDoc,
  addDoc,
  doc,
  where,
  query as firestoreQuery,
  updateDoc,
} from "firebase/firestore/lite";
import { ref, getDownloadURL, getStorage } from "firebase/storage";
import toast from "react-hot-toast";

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

export const getBook = async (bookTitle) => {
  const booksCol = collection(db, "Book");
  const bookSnapshot = await getDocs(booksCol);
  const bookList = bookSnapshot.docs.map((doc) => doc.data());
  const book = bookList.find((book) => book.Title === bookTitle);
  return book;
};

export const getImageFile = async (imagePath) => {
  const imageRef = ref(getStorage(app), "book_images/" + imagePath + ".png");
  try {
    const url = await getDownloadURL(imageRef);
    return url;
  } catch (error) {
    console.error("Error getting image", error);
    return null;
  }
};

export const saveUserDataToFirestore = async (uid, fullName, email) => {
  try {
    const userDocRef = doc(db, "User", uid);
    await setDoc(userDocRef, {
      fullName,
      email,
    });
    console.log("User data saved to firestore");
  } catch (error) {
    console.error("Error saving user data to firestore", error);
  }
};

export const saveOrderToFirestore = async (uid, order) => {
  console.log(order);
  try {
    const orderDocRef = collection(db, "Order");
    await addDoc(orderDocRef, order);
    console.log("Order saved to firestore");
  } catch (error) {
    console.error("Error saving order to firestore", error);
  }
};

export const getOrders = async (uid) => {
  try {
    const ordersCol = collection(db, "Order");
    const orderSnapshot = await getDocs(ordersCol);
    const orderList = orderSnapshot.docs.map((doc) => doc.data());
    const userOrders = orderList.filter((order) => order.user === uid);
    return userOrders;
  } catch (error) {
    console.error("Error getting orders", error);
    throw error;
  }
};

export const saveBookReviewToFirestore = async (bookTitle, review, rating) => {
  const booksCol = collection(db, "Book");
  const bookQuery = firestoreQuery(booksCol, where("Title", "==", bookTitle));

  try {
    const bookSnapshot = await getDocs(bookQuery);

    if (!bookSnapshot.empty) {
      const bookDocRef = doc(db, "Book", bookSnapshot.docs[0].id);
      const currentReviews = bookSnapshot.docs[0].data().Reviews || [];
      const updatedReviews = [...currentReviews, { rating, review: review }];

      const rawOverallRating =
        updatedReviews.reduce((sum, review) => sum + review.rating, 0) /
        updatedReviews.length;

      const overallRating = Math.round(rawOverallRating * 2) / 2;

      await updateDoc(bookDocRef, {
        Reviews: updatedReviews,
        OverallRating: overallRating,
      });
    } else {
      console.error("Error saving review to firestore: Book not found");
      toast.error("Error saving review");
    }
  } catch (error) {
    console.error("Error saving review to firestore", error);
    toast.error("Error saving review");
  }
};

export const getBookReviews = async (bookTitle) => {
  const booksCol = collection(db, "Book");
  const query = firestoreQuery(booksCol, where("Title", "==", bookTitle));

  try {
    const bookSnapshot = await getDocs(query);

    if (!bookSnapshot.empty) {
      const bookData = bookSnapshot.docs[0].data();
      return bookData.Reviews || [];
    } else {
      console.error("Error getting reviews from firestore: Book not found");
      return [];
    }
  } catch (error) {
    console.error("Error getting reviews from firestore", error);
    return [];
  }
};

export const getBookRating = async (bookTitle) => {
  const booksCol = collection(db, "Book");
  const bookQuery = firestoreQuery(booksCol, where("Title", "==", bookTitle));
  try {
    const bookSnapshot = await getDocs(bookQuery);
    if (!bookSnapshot.empty) {
      const bookData = bookSnapshot.docs[0].data();
      return bookData.OverallRating || 0;
    } else {
      console.error("Error getting rating from firestore: Book not found");
      return 0;
    }
  } catch (error) {
    console.error("Error getting rating from firestore", error);
    return 0;
  }
};

export const getUserWishlist = async (uid) => {
  const booksCol = collection(db, "Book");
  const bookSnapshot = await getDocs(booksCol);
  const bookList = bookSnapshot.docs.map((doc) => doc.data());

  const userCol = collection(db, "User");
  const userSnapshot = await getDocs(userCol);
  const userWishlist = userSnapshot.docs[0].data().Wishlist || {};
  const wishlistBooks = Object.values(userWishlist);

  const likedBooks = bookList.filter((book) =>
    wishlistBooks.includes(book.Title)
  );

  return likedBooks;
};

export const addToWishlist = async (uid, bookTitle) => {
  const userDocRef = doc(db, "User", uid);
  try {
    const userSnapshot = await getDoc(userDocRef);
    if (userSnapshot.exists()) {
      const userWishlist = userSnapshot.data()?.Wishlist || [];
      if (userWishlist.includes(bookTitle)) {
        toast.error("Book already in wishlist");
        return;
      }
      const updatedWishlist = [...userWishlist, bookTitle];

      await updateDoc(userDocRef, {
        Wishlist: updatedWishlist,
      });
    } else {
      console.error("User document not found");
    }
  } catch (error) {
    console.error("Error adding to wishlist", error);
  }
};

export const checkIfInWishlist = async (uid, bookTitle) => {
  const userDocRef = doc(db, "User", uid);
  try {
    const userSnapshot = await getDoc(userDocRef);
    if (userSnapshot.exists()) {
      const userWishlist = userSnapshot.data()?.Wishlist || [];
      return userWishlist.includes(bookTitle);
    } else {
      console.error("User document not found");
      return false;
    }
  } catch (error) {
    console.error("Error checking wishlist", error);
    return false;
  }
};

export const deleteFromWishlist = async (uid, bookTitle) => {
  const userDocRef = doc(db, "User", uid);
  try {
    const userSnapshot = await getDoc(userDocRef);
    if (userSnapshot.exists()) {
      const userWishlist = userSnapshot.data()?.Wishlist || [];
      const updatedWishlist = userWishlist.filter(
        (title) => title !== bookTitle
      );

      await updateDoc(userDocRef, {
        Wishlist: updatedWishlist,
      });
    } else {
      console.error("User document not found");
    }
  } catch (error) {
    console.error("Error deleting from wishlist", error);
  }
};

export { auth, db };
export default app;
