import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD0vEsMS-1OktvpNEKbIQu2MsEDwzlEgco",
  authDomain: "domzz-pizza-webapp.firebaseapp.com",
  projectId: "domzz-pizza-webapp",
  storageBucket: "domzz-pizza-webapp.appspot.com",
  messagingSenderId: "1060803435611",
  appId: "1:1060803435611:web:e41b263f6632f70682f37e",
  measurementId: "G-NC851PE2JN",
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
