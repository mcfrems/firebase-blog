import React from 'react'
import "./Comments.css"
import { auth, db } from '../../config/firebaseConfig'
import {useAuthState} from "react-firebase-hooks/auth"
import {collection, getDocs, query, addDoc, where, onSnapshot, deleteDoc, doc } from "firebase/firestore"

function Comments({articleId}) {
        //get user data
        const [user] = useAuthState(auth);

        //create state for the new comment
         const [newComment, setNewComment] = React.useState("")

         //create state for comments
         const [comments, setComments] = React.useState([])

        //showing all comments for the article when page loads
         React.useEffect(
            ()=>{
                //create reference to comments
                const commentsRef = collection(db, "comments")
        //         //get the comments
        //         getDocs(commentsRef)
        //         .then(res => {
        //             //convert to array
        //             const comments = res.docs.map(item => (
        //                 {
        //                     id: item.id,
        //                     ...item.data()
        //                 }
        //             ))
        //             //store in state
        //             setComments(comments)
        //         })
        //         .catch(err => console.log(err))

        //filter to only get comments for this article
                const q = query(commentsRef,
                    where ("articleId", "==", articleId))

                onSnapshot(q, (snapshot)=>{
                    //convert to array

                    const comments = snapshot.docs.map(item => (
                        {
                            id: item.id,
                            ...item.data()
                        }
                    ))
                    //save to state
                    setComments(comments)
                })
            }, []
         )


        const addNewComment = (e) =>{
            e.preventDefault();
            console.log(newComment);
            //add a new document to comments collection, collection will be created the first time
            //fields will be articleId, newComment, user info
            //create a reference to comments collection
            const commentsRef = collection(db, "comments")
            //add a document with the data
            addDoc(commentsRef, {
                userId: user?.uid,
                articleId: articleId,
                content: newComment,
                username: user?.displayName
            })
            .then(res =>{
                alert("comment added")
                setNewComment("")
            })
            .catch(err => console.log(err))
        }

        const deleteComment = (id) => {
            //needs the id of the comment to delete
            console.log(id)
            //delete this document
            deleteDoc(doc(db, "comments", id))
            .then(res=>{
                alert("comment deleted")
            })
            .catch(err => console.log(err))
        }
  return (
    <div>
        <div className="comments-container">
            {
                comments.map(item=>
                    <div key={item.id} className="comment">
                        <p><span>{item.username}</span>{item.content}</p>
                        {
                            //each comment has uid, compare with userId of the comment to see if I can delete
                            user?.uid === item.userId?
                            <button onClick={()=>deleteComment(item.id)}>Delete</button>
                            :
                            null
                        }
                    </div>
                )
            }
        </div>
        {
            user?
            <form onSubmit={addNewComment}> 
                <input type="text" placeholder="add comment" onChange={e => setNewComment(e.target.value)} value={newComment}/>
            </form>
            :
            <p>Please login to commment</p>
        } 
    </div>
  )
}

export default Comments