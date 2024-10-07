import {
  addDoc,
  getDocs,
  collection,
  query,
  where,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { db, auth } from "../../config/firebase";
import './post.css'
import { Link } from "react-router-dom";



export const Post = (props) => {
  const { post } = props;
  const [user] = useAuthState(auth);

  const [likes, setLikes] = useState(null);

  const likesRef = collection(db, "likes");

  const likesDoc = query(likesRef, where("postId", "==", post.id));

  const getLikes = async () => {
    const data = await getDocs(likesDoc);
    setLikes(
      data.docs.map((doc) => ({ userId: doc.data().userId, likeId: doc.id }))
    );
  };
  const addLike = async () => {
    try {
      const newDoc = await addDoc(likesRef, {
        userId: user?.uid,
        postId: post.id,
      });
      if (user) {
        setLikes((prev) =>
          prev
            ? [...prev, { userId: user.uid, likeId: newDoc.id }]
            : [{ userId: user.uid, likeId: newDoc.id }]
        );
      }
    } catch (err) {
      console.log(err);
    }
  };

  const removeLike = async () => {
    try {
      const likeToDeleteQuery = query(
        likesRef,
        where("postId", "==", post.id),
        where("userId", "==", user?.uid)
      );

      const likeToDeleteData = await getDocs(likeToDeleteQuery);
      const likeId = likeToDeleteData.docs[0].id;
      const likeToDelete = doc(db, "likes", likeId);
      await deleteDoc(likeToDelete);
      if (user) {
        setLikes(
          (prev) => prev && prev.filter((like) => like.likeId !== likeId)
        );
      }
    } catch (err) {
      console.log(err);
    }
  };

  const hasUserLiked = likes?.find((like) => like.userId === user?.uid);

  useEffect(() => {
    getLikes();
  }, []);
  const maxChar = 200;
  const cropText = post.description.length > maxChar ? post.description.slice(0, maxChar) + "..." : post.description

  return (
    <div className="border-b-4 border-secondary shadow-2xl p-12 hover:scale-105 transition-all duration-150 ease-in-out">
      <div className="font-semibold text-lg md:text-3xl py-4 ">
        <h1> {post.title}</h1>
      </div>
      <div className="py-2 text-sm md:text-base opacity-80">
        <p> {cropText}
          <Link className='opacity-100 underline' to={`/blog/${post.title}`}>
            read more
          </Link></p>
      </div>


      <div className="flex justify-between py-5">
        
        <div className="flex ">
          <button onClick={hasUserLiked ? removeLike : addLike} className="flex bg-secondary text-primary px-4 py-1 rounded-lg">
            {hasUserLiked ? <>&#128078;</> : <>&#128077;</>}
            {likes && <p>{likes?.length} </p>}
          </button>
          
        </div>
        <p className="text-sm md:text-lg"> @{post.username} </p>
      </div>
    </div>
  );
};