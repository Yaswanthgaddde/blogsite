
import { signInWithPopup } from "firebase/auth"
import { auth,provider } from "../config/firebase"
import { useNavigate } from "react-router-dom"

import logo from './search.png'


export const Login = () =>{

    const navigate = useNavigate()

    const signInWithGoogle = async() =>{
        const result = await signInWithPopup(auth,provider);
        console.log(result)
        navigate("/")
    }
    return <div className="login">
        <p className="login_para">Sign in with google To continue</p>
        <img onClick={signInWithGoogle} src={logo}  alt="logo"/>
        
    </div>
}