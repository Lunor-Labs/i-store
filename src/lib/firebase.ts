import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBo4aUA22asQf9qu-i1tkQTKlTFaveR2Yc",
  authDomain: "i-store-9dbb0.firebaseapp.com",
  projectId: "i-store-9dbb0",
  storageBucket: "i-store-9dbb0.firebasestorage.app",
  messagingSenderId: "172420815861",
  appId: "1:172420815861:web:1025a3012e0a09375f5ebc",
  measurementId: "G-S2Q74H1B8N"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;