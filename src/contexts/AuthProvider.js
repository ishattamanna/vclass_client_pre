import React, { createContext, useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import app from "../configs/firebase.config";

export const AuthContext = createContext();

const googleProvider = new GoogleAuthProvider();

const auth = getAuth(app);

const AuthProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(null);
  const [authLoader, setAuthLoader] = useState(false);

  const signInWithGoogle = () => {
    setAuthLoader(true);
    return signInWithPopup(auth, googleProvider);
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
    return signOut(auth);
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
    signInWithGoogle,
    createAccount,
    logIn,
    updateUserProfile,
    logOut,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
