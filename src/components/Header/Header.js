import React from 'react'
import './Header.css';
import { Link } from 'react-router-dom';
import { FaHome } from "react-icons/fa";
import { auth } from '../../config/firebaseConfig'
import {useAuthState} from "react-firebase-hooks/auth"
import {signOut} from "firebase/auth"
import { useNavigate } from 'react-router-dom';


function Header() {

    let navigate = useNavigate()

    //create array with topics
    const categories = ["Health", "Food", "Travel", "Technology"]

    //get user data
    const [user] = useAuthState(auth);
    console.log(user)

  return (
    <div className="header-container">
        <FaHome onClick={()=>navigate('/')}/>
        <div className="categories-container">
            {
                categories.map(item => <Link to={`/category/${item}`} className="nav-link">{item}</Link>)
            }
        </div>
        {
          user?
          <div>
            <span className="username">
              {user.displayName}
            </span>
            <button className="auth-link" onClick={()=>signOut(auth)}> Logout </button>
          </div>
          :
          <Link to="/auth" className="auth-link">Signup</Link>
        }
    </div>
  )
}

export default Header