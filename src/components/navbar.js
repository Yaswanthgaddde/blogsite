import { Link } from "react-router-dom"
import { auth } from "../config/firebase"
import {useAuthState} from 'react-firebase-hooks/auth'
import { signOut } from "firebase/auth"
import logout from './logout.png'

export const Navbar=()=>{

    const [ user ] = useAuthState(auth);
    const signUserOut = async ()=>{
        await signOut(auth);
    }

    return <div className="px-0 md:px-40 py-5 items-center justify-center md:justify-end space-x-8 flex">
    <Link className="font-semibold underline" to='/' >Home</Link>
    {!user ? (
        <Link className="font-semibold" to="/login" >Login</Link>
    ):(
        <Link className="font-semibold" to="/createpost" >Createpost</Link>
    )}
    
 

    <div className="flex items-center">
    {
        user && (
            <>
        <p className="font-semibold">{user?.displayName}</p>
        <img className="w-10 rounded-full" src={user?.photoURL} />
       {/* <button className="font-semibold" onClick={signUserOut} >Sign Out</button>*/}
            </>
        )
    }

    </div>

    </div>
}