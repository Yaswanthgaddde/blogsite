import {getDocs, collection} from 'firebase/firestore'
import { db } from '../../config/firebase'
import { useEffect, useState } from 'react'
import { Post } from './post'
import './post.css'

export const Main =() =>{
    const [postsList, setPostsList]  = useState(null)
    const postsRef = collection(db, 'posts')
    const getPosts = async() =>{
        const data = await getDocs(postsRef)
        setPostsList(data.docs.map((doc)=>({...doc.data(), id: doc.id })))
    }
    useEffect(()=>{
        getPosts();
    }, [])

 return <div className='px-5 md:px-36 py-16 gap-10 grid grid-cols-1 md:grid-cols-2'>
 {postsList?.map((post)=> <Post post={post}/>)}
    </div>
}