import React from 'react'
import "./ArticleDetails.css"
import { useParams } from 'react-router-dom'
import {db, auth} from "../../config/firebaseConfig"
//need some functions from firestore
import {getDoc, doc} from "firebase/firestore"

function ArticleDetails() {
    //this page show detials about a specific article
    //the articleId is in the url
    //get the id
    const {articleId} = useParams();

    //show data when the page loads
    React.useEffect(
        ()=>{
            //set up reference to a signle document
            const docRef = doc(db, 'articles', articleId)
            //now get document
            getDoc(docRef)
            .then(res =>{
                console.log(res.data())

            })
            .catch(err => console.log(err))

        },[]
    )

  return (
    <div>ArticleDetails {articleId}</div> 
  )
}

export default ArticleDetails