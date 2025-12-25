import { getApps, initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC7scQ639bXd3q345Bj0qZe4NuXOHjl56M",
  authDomain: "pacificwide-crm-40181.firebaseapp.com",
  databaseURL: "https://pacificwide-crm-40181-default-rtdb.firebaseio.com",
  projectId: "pacificwide-crm-40181",
  storageBucket: "pacificwide-crm-40181.appspot.com",
  messagingSenderId: "169567428909",
  appId: "1:169567428909:web:814d2121d013e0dd1fb3a4",
  measurementId: "G-FTR9QX7V68",
  //   apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  //   authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  //   databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  //   projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  //   storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  //   messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  //   appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase only if it hasn't been initialized yet
const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];

// Initialize Realtime Database
const database = getDatabase(app);

export { database };
