import React, { createContext, useEffect, useState } from 'react';
import { auth } from '../firebase.config';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';




export const AuthContext = createContext();

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {



  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(true);



  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  }

 




  const signInWithEmailAndPasswordFunc = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };
  const signInWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  const signOutUser = () => {
    setLoading(true);     
    return signOut(auth);
  }

  const sendPassResetEmailFunc = (email) => {
    setLoading(true); 
    return sendPasswordResetEmail(auth, email);

  }

  

  useEffect(() => {

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);

  })
      return () => {
        unsubscribe();
      }
  },[])


  
  const authInfo = {
    user, createUser, signInWithEmailAndPasswordFunc, signInWithGoogle, signOutUser, loading, setUser, setLoading, sendPassResetEmailFunc
  }

  return (
    <AuthContext value={authInfo}>
      {children}
    </AuthContext>
  );
};

export default AuthProvider;