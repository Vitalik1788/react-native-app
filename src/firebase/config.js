import { initializeApp } from 'firebase/app';

import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyD92pkJ-0r4yXSOyTxuhgbOqKwUD8tiiXA',
  authDomain: 'postsfotoblog.firebaseapp.com',
  projectId: 'postsfotoblog',
  storageBucket: 'postsfotoblog.appspot.com',
  messagingSenderId: '959649932711',
  appId: '1:959649932711:web:9e7ee2ccad254672fc8282',
};

const app = initializeApp(firebaseConfig);


export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
