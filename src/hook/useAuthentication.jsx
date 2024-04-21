import { useState, useEffect } from "react";
import { 
    getAuth,
    onAuthStateChanged,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut 
} from 'firebase/auth';
import firebaseConfig from "../firebase/firebaseConfig";


const useAuthentication = () => {
    const [usuario, setUsuario] = useState(null);
    const [erro, setErro] = useState(null);
    const [loading, setLoading] = useState(false);
    const auth = getAuth(firebaseConfig);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
           if(user) {
                setUsuario(user);
           }  else {
                setUsuario(null);
           }
        });

        return () => unsubscribe();
    }, [auth]);

    const handleCadastro = async (email, password) => {
        try {
            await createUserWithEmailAndPassword(auth, email, password);
        } catch (error) {
            setErro(error);
        }
    };

    const handleLogin = async (email, password) => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
        } catch (error) {
            setErro(error);
            console.log(error)
        }
    };

    const handleLogout = async () => {
        try {
            await signOut(auth);
            setUsuario(null);
        } catch (error) {
            console.error(error);
        }
    };
   
    return { usuario, erro, handleCadastro, handleLogin, handleLogout };
};

export default useAuthentication;