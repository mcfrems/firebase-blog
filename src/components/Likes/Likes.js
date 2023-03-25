import React from 'react'
import "./Likes.css"
import { FaHeart, FaRegHeart} from "react-icons/fa";

function Likes({articleId}) {
    //create state for likes
    const [isLiked, setisLiked] = React.useState(false)
    
    const handleLike= () => {
        console.log('like')
    }
  return (
    <div>
        {
            isLiked?
            <FaHeart />
            :
            <FaRegHeart onClick={handleLike}/>
        }
    </div>
  )
}

export default Likes