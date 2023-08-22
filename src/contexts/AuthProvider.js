import React, { createContext, useEffect, useState } from "react";
import {
  FacebookAuthProvider,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import app from "../configs/firebase.config";

export const AuthContext = createContext();

const googleProvider = new GoogleAuthProvider();
const fbProvider = new FacebookAuthProvider();

const auth = getAuth(app);

const AuthProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(null);
  const [authLoader, setAuthLoader] = useState(false);

  const signInWithGoogle = () => {
    setAuthLoader(true);
    return signInWithPopup(auth, googleProvider);
  };

  const signInWithFb = () => {
    setAuthLoader(true);
    return signInWithPopup(auth, fbProvider);
  };

  const createAccount = (email, password) => {
    setAuthLoader(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const logIn = (email, password) => {
    setAuthLoader(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const updateUserProfile = (userName, profilePic) => {
    setAuthLoader(true);
    return updateProfile(auth.currentUser, {
      displayName: userName,
      photoURL: profilePic,
    });
  };

  const logOut = () => {
    setAuthLoader(true);
    return signOut(auth);
  };

  const forgetPassword = (email) => {
    setAuthLoader(true);
    return sendPasswordResetEmail(auth, email);
  };

  useEffect(() => {
    const unsubscribed = onAuthStateChanged(auth, (user) => {
      setAuthUser(user);
      setAuthLoader(false);
    });

    return () => {
      unsubscribed();
    };
  }, []);

  const authInfo = {
    authUser,
    signInWithFb,
    signInWithGoogle,
    createAccount,
    logIn,
    forgetPassword,
    updateUserProfile,
    logOut,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
