import React, { useEffect, useState } from 'react'
import { createContext } from 'react'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth' 
import { auth, db } from '../firebaseConfig'
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext({});

const AuthProvider = ({children}) => {
    const [user, setUser] = useState('')
    const [loadingAuth, setLoadingAuth] = useState(false)
    const [loading, setLoading] = useState(true); 

    const navigate = useNavigate()

    useEffect(() => {
        async function loadUser(){
          const storageUser = localStorage.getItem('@dataUser')
    
          if(storageUser){
            setUser(JSON.parse(storageUser))
            setLoading(false);
          }
    
    
          setLoading(false);
    
        }
    
        loadUser();
      }, [])

    
   
    
    



    async function signIn(email, senha){
        setLoadingAuth(true)

        await signInWithEmailAndPassword(auth, email, senha)
        .then( async (value) =>{
            let uid = value.user.uid;

            const docRef = doc(db, 'Clientes', uid)
            const docSnap = await getDoc(docRef)

            let data = {
                uid: uid,
                nome: docSnap.data().nome,
                email: value.user.email,
                imagemUrl: docSnap.data().imagemUrl
            }

            setUser(data)
            storageUser(data)
            setLoadingAuth(false)
            navigate('/perfil')
        })

        alert('Logado!!')
    }

    async function signUp(email, senha, nome){
        setLoadingAuth(true)

        await createUserWithEmailAndPassword(auth, email, senha)
        .then( async (value) => {
            let uid = value.user.uid

            await setDoc(doc(db, 'TESTE', uid), {
                nome:nome,
                foto: ''
            })
            .then(() =>{
                let data ={
                    uid:uid,
                    nome:nome,
                    email: value.user.email,
                    foto: ''
                }

                setUser(data)
                storageUser(data)
                setLoadingAuth(false)
                navigate('/perfil')
            })
        })
    }

    function storageUser(data){
        localStorage.setItem('@dataUser', JSON.stringify(data))
    }
    
    async function logOut(){
        await signOut(auth);
        localStorage.removeItem('@dataUser');
        setUser('');
        alert('Você saiu...')
        navigate('/')
    }


  return (
    <AuthContext.Provider value={{signed: !!user, user, signIn, signUp, loadingAuth, loading, logOut, storageUser, setUser}}>
        {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider