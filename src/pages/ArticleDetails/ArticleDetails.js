import React from 'react'
import "./ArticleDetails.css"
import { useParams } from 'react-router-dom'
import {db, auth} from "../../config/firebaseConfig"
//need some functions from firestore
import {getDoc, doc} from "firebase/firestore"
import Likes from '../../components/Likes/Likes';
import Comments from '../../components/Comments/Comments'

function ArticleDetails() {
    //this page show detials about a specific article
    //the articleId is in the url
    //get the id
    const {articleId} = useParams();

    //create state for the article information
    const [article, setArticle] = React.useState("")

    //show data when the page loads
    React.useEffect(
        ()=>{
            //set up reference to a signle document
            const docRef = doc(db, 'articles', articleId)
            //now get document
            getDoc(docRef)
            .then(res =>{
                console.log(res.data())
                setArticle(res.data())

            })
            .catch(err => console.log(err))

        },[]
    )

  return (
    <div className="details-container">
        <h1>{article?.title}</h1>
        <h2>{article?.summary}</h2>
        <div className="details-info-container">
            <p>Category: {article?.category}</p>
            <p><span className="article-span">Author:</span>{article?.createBy?.toUpperCase()}</p>
            <p><span className="article-span published">Published:</span> {article?.createdAt?.toDate().toDateString()}</p>
            <Likes articleId={articleId}/>
        </div>
        <div className="details-content">
            <img className="details-img" src={article?.imageUrl} />
            <p className="article-description">{article?.paragraphOne}</p>
            <p className="article-description">{article?.paragraphTwo}</p>
            <p className="article-description">{article?.paragraphThree}</p>
        </div>
        <Comments articleId={articleId}/>

    </div> 
  )
}

export default ArticleDetails