import { createContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import auth from "../firebase.init";
import axios from "axios";

export const AuthContext = createContext(null);

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] =useState(true);
  const [token, setToken] = useState(null);


  const setUserAndToken = async (firebaseUser) =>{
    if(!firebaseUser?.email) return;
    const res = await axios.post('http://localhost:5000/jwt', {
      email: firebaseUser.email
    });

    const jwtToken = res.data.token;
    localStorage.setItem('token', jwtToken);
    setToken(jwtToken);

    setUser({
      userEmail: firebaseUser.email,
      userName : firebaseUser.displayName || firebaseUser.email.split('@')[0]
    });
  }

  const createUser = (email, password) =>{
    setLoading(true);
    return(
      createUserWithEmailAndPassword(auth, email, password)
    )
  }

  const signIn = (email, password) =>{
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password)
  }

  const signInWithGoogle = () =>{
    setLoading(true);
    return signInWithPopup(auth, googleProvider)
  }

  const signOutUser =()=>{
    setLoading(true);
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    return signOut(auth);
  }

  useEffect(()=>{
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) =>{
      if(currentUser){
        await setUserAndToken(currentUser);
      }else{
        setUser(null);
        setToken(null);
        localStorage.removeItem('token');
      }
      setLoading(false);
    })
    return()=>{
      unsubscribe()
    }
  }, [])

  const authInfo = {
    user, 
    token,
    loading,
    createUser,
    signInWithGoogle,
    signIn,
    signOutUser
  }

  return(
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider;