import { createContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import auth from "../firebase.init";
import axios from "axios";
import { toast } from "react-toastify";

export const AuthContext = createContext(null);

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] =useState(true);


  const createUser = async (email, password) => {
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      return userCredential;
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };

  const signIn = (email, password) =>{
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password)
  }

  const signInWithGoogle = () =>{
    setLoading(true);
    return signInWithPopup(auth, googleProvider)
  }

  const signOutUser = () => {
        setLoading(true);
        return signOut(auth);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
        setUser(currentUser);
        
        console.log('state captured', currentUser?.email);

        if (currentUser?.email) {
          const user = { email: currentUser.email };

          axios.post('https://car-rental-server-eta.vercel.app/jwt', user, { withCredentials: true })
          .then(res => {
            console.log('login token', res.data);
          })
          .catch(err => {
            console.error('JWT request failed', err);
          })
          .finally(() => {
            setLoading(false);
          });
          }else {
            axios.post('https://car-rental-server-eta.vercel.app/logout', {}, {
                withCredentials: true
            })
            .then(res => {
              console.log('login token', res.data);
            })
            .catch(err => {
              console.error('JWT request failed', err);
            })
            .finally(() => {
              setLoading(false);
            });
        }  
    })

    return () => {
        unsubscribe();
    }
  }, [])

  const authInfo = {
    user,
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