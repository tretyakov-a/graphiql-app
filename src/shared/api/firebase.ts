import { FirebaseError, initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from 'firebase/auth';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { i18n } from '../localization';

const firebaseConfig = {
  apiKey: 'AIzaSyCJJXfp3jNsO8HrilW4qDMSvvFWKyIZrew',
  authDomain: 'fir-auth-graph.firebaseapp.com',
  projectId: 'fir-auth-graph',
  storageBucket: 'fir-auth-graph.appspot.com',
  messagingSenderId: '733512772498',
  appId: '1:733512772498:web:27714fa3c330f55745af4b',
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const logInWithEmailAndPassword = async (email: string, password: string) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    const { code } = err as FirebaseError;
    toast(i18n.t(`errors.${code}`), { type: 'error' });
  }
};
const registerWithEmailAndPassword = async (name: string, email: string, password: string) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, 'users'), {
      uid: user.uid,
      name,
      authProvider: 'local',
      email,
    });
  } catch (err) {
    const { code } = err as FirebaseError;
    toast(i18n.t(`errors.${code}`), { type: 'error' });
  }
};
const sendPasswordReset = async (email: string) => {
  await sendPasswordResetEmail(auth, email);
  toast('Password reset link sent!', { type: 'success' });
};
const logout = () => {
  signOut(auth);
};

export {
  auth,
  db,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordReset,
  logout,
};
