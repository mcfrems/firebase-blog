import React from 'react'
import "./AddArticle.css"
import {db, storage, auth} from "../../config/firebaseConfig"
//need some functions from firestore
import {collection, addDoc, Timestamp} from "firebase/firestore"
import { useAuthState } from 'react-firebase-hooks/auth'
import {ref, uploadBytes, getDowloadURL, getDownloadURL} from "firebase/storage"
import {v4} from 'uuid'
import {toast} from 'react-toastify'
import { useNavigate } from 'react-router-dom'


function AddArticle() {
    //activate useNavigate
    let navigate = useNavigate();

    //get user data
    const [user] = useAuthState(auth);

    //create array with topics
    const categories = ["Health", "Food", "Travel", "Technology"]

    //create state to hold all the user data
    //make an object for all the data
    const [formData, setFormData] = React.useState({
        title: "",
        summary: "",
        paragraphOne: "",
        paragraphTwo: "",
        paragraphThree: "",
        category: "",
        imageUrl: "",
    })

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData)
        //create a reference for the image
        const imageRef = ref(storage, `images/${formData.imageUrl.name + v4()}`)
        //upload the image to storage bucket
        uploadBytes(imageRef, formData.imageUrl)
        .then(res =>{
            console.log(res.ref)
            //now get url from this reference
            getDownloadURL(res.ref)
            .then(url =>{
                console.log(url)
                //now I have all data and image url
                //create article reference
                const articleRef = collection(db, "articles")
                //use addDoc to add a document
                addDoc(articleRef, {
                    title: formData.title,
                    summary: formData.summary,
                    paragraphOne: formData.paragraphOne,
                    paragraphTwo: formData.paragraphTwo,
                    paragraphThree: formData.paragraphThree,
                    category: formData.category,
                    imageUrl: url,
                    createdBy: user.displayName,
                    userId: user.uid,
                    createdAt: Timestamp.now().toDate(),
                })
            })
            .then(res =>{
                // alert('article saved')
                toast('article saved successfully!! :)', {type: "success", autoClose: 1500})
                //pause before navigate to homepage
                setTimeout(()=>{
                    navigate('/')
                })
            }, 3000)

        })
        .catch(err =>{
            alert("error")
        })
    }

  return (
    <div className="add-article-container">
        <form className="add-article-form"  onSubmit={handleSubmit}>
            <h2>Create Article</h2>
            <div className="input-group">
                <label htmlFor="title">Title</label>
                <input type="text"  id="title"
                placeholder="Maximum 100 characters"
                maxLength="100"
                onChange={(e)=>setFormData({...formData, title:e.target.value})}
                />
            </div> 
            <div className="input-group">        
                <label htmlFor="summary">Summary</label>
                <textarea id="summary"
                placeholder="Maximum 120 characters"
                maxLength="120"
                onChange={(e)=>setFormData({...formData, summary:e.target.value})}
                />
            </div> 
            <div className="input-group">
                <label htmlFor="paragraphOne">Paragraph One</label>
                <textarea name="paragraphOne" 
                placeholder="Maximum 650 characters"
                maxLength="650"
                onChange={(e)=>setFormData({...formData, paragraphOne:e.target.value})}
                />
            </div>
            <div className="input-group">
                <label htmlFor="paragraphTwo">Paragraph Two</label>
                <textarea id="paragraphTwo"
                placeholder="Maximum 650 characters"
                maxLength="650"
                onChange={(e)=>setFormData({...formData, paragraphTwo:e.target.value})}
                />
            </div>
            <div className="input-group">
                <label htmlFor="paragraphThree">Paragraph Three</label>
                <textarea id="paragraphThree" 
                placeholder="Maximum 650 characters"
                maxLength="650"
                onChange={(e)=>setFormData({...formData, paragraphThree:e.target.value})}
                />
            </div>
            <div className="input-group">
                <label htmlFor="category">Category</label>
                <select name="category"
                    onChange={(e)=>setFormData({...formData, category:e.target.value})}>
                    <option value="">Select Category</option>
                    {
                        categories.map((item, index) => (
                            <option key={index} value={item}>{item}</option>
                        ))
                    }
                </select>
            </div>
            <div className="input-group">
                <label>Upload Image</label>
                <input type="file" name="image" accept="image/*"
                onChange={(e)=>setFormData({...formData, imageUrl:e.target.files[0]})}
                />
            </div>
            <button type="submit">Submit</button>
        </form>
    </div>
  )
}

export default AddArticle