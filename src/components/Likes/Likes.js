import React from 'react'
import "./Likes.css"
import { FaHeart, FaRegHeart} from "react-icons/fa";
import { db, auth } from '../../config/firebaseConfig'
import {useAuthState} from "react-firebase-hooks/auth"
//need some functions from firestore
import {collection, addDoc, getDocs, query, where, deleteDoc, doc} from "firebase/firestore"

function Likes({articleId}) {
    //get user data
    const [user] = useAuthState(auth);

    //create state for likes
    const [isLiked, setisLiked] = React.useState(false)

    //when page loads we need to find out if this user has liked this article so we can set isLiked appropro
    React.useEffect(
        ()=>{
            //answer this question, did this user like this article?
            const likesRef = collection (db, "likes")
            //make sure there is a user
            if (user){
                const  q = query(likesRef, 
                    where("articleId", "==", articleId),
                    where("userId", "==", user?.uid))
                    //see if there is a match
                    getDocs(q, likesRef)
                    .then(res => {
                        //match if size > 0
                        if(res.size > 0)
                            //means this user likes this article
                            setisLiked(true)
                    })
                    .catch(err => console.log(err))
            }
        }, []
    )
    
    const handleLike= () => {
        console.log('like')
        //should only work if user is logged in
        if (user){
            //create reference to likes collection
            const likesRef= collection(db, "likes")
            //add a document with articleId and userId
            addDoc(likesRef, {
                userId: user?.uid, 
                articleId: articleId
            })
            .then(res =>{
                //see that it is liked
                setisLiked(true)

            })
            .catch(err => console.log(err))
        }
    }

    const handleUnlike = () =>{
        console.log("unlike")
        //make sure user is logged in
        if (user){
            console.log("userid", user.uid)
            console.log("articleId", articleId)
            //need to find the document in likes with this user id and article id
            //and get it's document id
            const likesRef = collection (db, "likes")
            //set up a query to find this specific document
            const  q = query(likesRef, 
                where("articleId", "==", articleId),
                where("userId", "==", user?.uid))

                //now get the match 
                getDocs(q, likesRef)
                .then(res =>{
                    console.log(res.size)
                    console.log(res.docs[0].id)
                    //this is the id of the record to delete
                    //now delete this doc from the collection
                    const likesId = res.docs[0].id
                    deleteDoc(doc(db, "likes", likesId))
                    .then(res =>{
                        //show as "unliked"
                        setisLiked(false)
                        
                    })
                    .catch(err => console.log(err))
                })
                .catch(err => console.log(err))
        }
    }
  return (
    <div>
        {
            isLiked?
            <FaHeart onClick={handleUnlike}/>
            :
            <FaRegHeart onClick={handleLike}/>
        }
    </div>
  )
}

export default Likes