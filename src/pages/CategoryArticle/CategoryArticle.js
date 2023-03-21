import React from 'react'
import "./CategoryArticle.css"
import { useParams } from 'react-router-dom'
import {db} from "../../config/firebaseConfig"
//need some functions from firestore
import {collection, getDocs, query, where} from "firebase/firestore"
import ArticleCard from '../../components/ArticleCard/ArticleCard';

function CategoryArticle() {
    //grab the parameter in the url
    const {categoryName} = useParams();
    //when the page loads show only articles of this category
    
    //create state to hold articles
    const [articles, setArticles] = React.useState([])
    
    React.useEffect(
        ()=>{
            //make a reference to articles collections
            const articleRef = collection(db, "articles")

            //set up query to filter the data
            //want data where category == categroy Name
            const  q = query(articleRef, where("category", "==", categoryName))
            //retrieve documents from this collection
            getDocs(q, articleRef)
            .then(res => {
                const articles = res.docs.map(item => (
                    {
                        id: item.id,
                        ...item.data()
                    }
                ))
                console.log(articles)
                //store in state
                setArticles(articles)
            }) 
            .catch(err => console.log(err))
        },[categoryName]
    )

  return (
    <div className="category-articles">
        {
            articles.length === 0?
            <p>No {categoryName} articles</p>
            :
            articles?.map(item => <ArticleCard article={item}/>)

        }
        CategoryArticle{categoryName}

    </div>
  )
}

export default CategoryArticle