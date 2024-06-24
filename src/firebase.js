import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAIJhlzwTrV_6Tz-tRbavDW6bodS-Rz5IU",
  authDomain: "flashy-c4268.firebaseapp.com",
  projectId: "flashy-c4268",
  storageBucket: "flashy-c4268.appspot.com",
  messagingSenderId: "630180827834",
  appId: "1:630180827834:web:114ceb4aafe5368ff76883",
  measurementId: "G-6E1E07WC4L"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;
