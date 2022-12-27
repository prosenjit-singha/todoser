import {
  getAuth,
  signOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
const googleProvider = new GoogleAuthProvider();

import { app } from "./config";

export const auth = getAuth(app);

export const logInWithGoogle = () => signInWithPopup(auth, googleProvider);

export const logIn = (user: { email: string; password: string }) =>
  signInWithEmailAndPassword(auth, user.email, user.password);

export const register = (user: { email: string; password: string }) =>
  createUserWithEmailAndPassword(auth, user.email, user.password);

export const logOut = () => signOut(auth);
