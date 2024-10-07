import { Link, useParams } from "react-router-dom"
import { collection,getDocs } from "firebase/firestore";
import { useEffect,useState } from "react";
import { db,auth } from "../../config/firebase";
import back from './back.png'


export const PostPage = ()=>{
    let {id} = useParams();
    const [postsList, setPostsList]  = useState(null)
    const postsRef = collection(db, 'posts')
    const getPosts = async() =>{
        const data = await getDocs(postsRef)
        setPostsList(data.docs.map((doc)=>({...doc.data(), id: doc.id })))
    }
    useEffect(()=>{
        getPosts();
    }, [])

 let postData = postsList?.find((post)=>post.title===id)




 return<div>
 <div className="hidden md:fixed md:top-2 md:left-32">
 <Link className='' to={`/`}>
 <img className="w-16" src={back} />
        </Link>
 </div>
 <div className="px-0 md:px-32 py-16">
 <h1 className="text-center font-semibold text-2xl md:text-5xl">{postData?.title}</h1>
 <p className="px-5 md:px-16 py-8 leading-relaxed indent-5 md:indent-16">{postData?.description}</p>
 <p className="text-end px-5 md:px-16">@{postData?.username}</p>
 </div>
 </div>
}