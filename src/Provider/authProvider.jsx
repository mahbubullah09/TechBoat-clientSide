import { createContext, useEffect, useState } from "react";
import { auth } from "../config/firebase.config";
import { GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";



export const AuthContext = createContext(null);

const googleProvider = new GoogleAuthProvider();



const AuthProvider = ({children}) => {
    const [user, setUser] = useState({})
    const [loading, setLoading] = useState(true);


    const googleLogin = () =>{
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    }
    


//singup
    const createUser = (email,password) => {
        setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password)    
}

//singin

const login = (email,password) => {
    setLoading(true);
   return signInWithEmailAndPassword(auth, email, password)
}

const handleUpdateProfile = (name, photo) => {
    setLoading(true);
    return updateProfile(auth.currentUser, {
        displayName: name, photoURL: photo
    })
}

const logOut = () =>{
    setLoading(true);
    return signOut(auth)
}

//observer

useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
        setUser(user)
        setLoading(false);

      
      });
      return () =>{
        unsubscribe()
      }
      
},[])

    const authentication = {
        googleLogin,
        user,
        createUser,
        login,
        logOut,
        loading,
        handleUpdateProfile
    }



    return (
        <AuthContext.Provider value={authentication}>

            {children}

        </AuthContext.Provider>
)};

export default AuthProvider;