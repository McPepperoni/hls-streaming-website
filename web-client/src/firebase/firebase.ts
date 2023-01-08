// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, query, collection, getDocs } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDwXOnmM4ahSzsbyYtFAlucM9Yc8blq8wM",
  authDomain: "video-8ce64.firebaseapp.com",
  projectId: "video-8ce64",
  storageBucket: "video-8ce64.appspot.com",
  messagingSenderId: "98674754408",
  appId: "1:98674754408:web:9b4a683459333f92c64cdd",
  measurementId: "G-3N42MM8H4Q",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const firestore = getFirestore(app);

export const getCollection = async () => {
  const q = query(collection(firestore, "Media"));

  const querySnapshot = await getDocs(q);

  return querySnapshot;
};
