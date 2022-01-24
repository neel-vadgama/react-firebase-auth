import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-firebase-auth-domain",
  projectId: "your-projectId",
  storageBucket: "your-storage-bucket",
  messagingSenderId: "your-message-senderId",
  appId: "your-appId",
  measurementId: "your-measurementId",
};

export const app = initializeApp(firebaseConfig);
