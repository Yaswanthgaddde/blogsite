import { useForm } from "react-hook-form"
import *as yup from 'yup'
import {yupResolver} from '@hookform/resolvers/yup'
import {addDoc,collection} from 'firebase/firestore'
import { auth, db } from "../../config/firebase"
import { useAuthState } from "react-firebase-hooks/auth"
import { useNavigate } from "react-router-dom"
import './form.css'

export const CreateForm = () =>{

    const navigate = useNavigate()

    const [user] = useAuthState(auth)
    const schema = yup.object().shape({
        title: yup.string().required('You Must Add a Title'),
        description: yup.string().required('You Must Add a Descriptiopn'),

    });
    const {register, handleSubmit, formState: {errors}} = useForm({
        resolver: yupResolver(schema)
    })


    const postsRef = collection(db, "posts");
    const onCreatePost = async (data) =>{
       await addDoc(postsRef,{
        ...data,
        username: user?.displayName,
        userId: user?.uid,
       })
       navigate('/')
    }

    return  <form className="border-b-4 border-t-4 border-secondary flex-row items-center justify-center w-[90%] md:w-[40%] px-5 md:px-24 py-5 shadow-xl" onSubmit={handleSubmit(onCreatePost)} >
        <h1 className="text-center py-8 md:py-14 font-semibold text-2xl underline">Create your post !</h1>
        <input className="w-[100%] rounded-sm border-b-2" placeholder="Title..." {...register('title')} />
        <p>{errors.title?.message}</p>
        <textarea className="border-b-2 w-[100%] my-4" placeholder="Description..." {...register('description')} rows="5" cols="50"/>
        <p>{errors.description?.message}</p>
        <input className="text-primary bg-orange px-4 py-2 rounded-md opacity-90 hover:opacity-100" type="submit" value="Publish" />
        </form>
}