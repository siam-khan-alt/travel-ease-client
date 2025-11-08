import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";


import { useEffect, useState } from "react";

import { AuthContext } from "./AuthContext";
import { auth } from "../Firebase/Firbase.config";


const googleProvider = new GoogleAuthProvider()

const AuthProvider = ({ children }) => {
  const [users, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const SignUp = (email, password) => {

    return createUserWithEmailAndPassword(auth, email, password);
  };

  const profileUpdate = (displayName, photoURL) => {
    return updateProfile(auth.currentUser, {
      displayName,
      photoURL,
    });
  };

  const Login = (email, password) => {
    setLoading(true)
    return signInWithEmailAndPassword(auth, email, password);
  };
  const Logout = () => {
    setLoading(true);
    return signOut(auth);
  };
  const PasswordReset=(email)=>{
    return sendPasswordResetEmail(auth, email)
  }
  const SignInGoogle=()=>{
    return signInWithPopup(auth, googleProvider)
}


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const authInfo = {
    users,
    loading,
    setLoading,
    setUser,
    SignUp,
    Login,
    Logout,
    profileUpdate,
    PasswordReset,
    SignInGoogle
  };
  return <AuthContext value={authInfo}>{children}</AuthContext>;
};
export default AuthProvider;
