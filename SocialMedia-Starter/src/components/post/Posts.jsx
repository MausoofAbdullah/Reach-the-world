import React from 'react'
import './Posts.css'
import Comment from "../../img/comment.png"
import Share from "../../img/share.png"
import Heart from "../../img/like.png"
import NotLike from "../../img/notlike.png"
import { useSelector } from 'react-redux' 
import { useState } from 'react'
import { likePost } from '../../api/PostRequest'


const Posts = ({data}) => {
  const {user}=useSelector((state)=>state.authReducer.authData)

  const [liked,setLiked]=useState(data.likes.includes(user._id))
  const [likes,setLikes]=useState(data.likes.length)

  const handleLike=()=>{
    likePost(data._id,user._id)
    setLiked((prev)=>!prev)
    liked?setLikes((prev)=>prev-1):setLikes((prev)=>prev+1)
  }
  return (
    <div className='Posts'>
      <img  src={data.image?process.env.REACT_APP_PUBLIC_FOLDER+data.image:""} alt="" /> 
      

      <div className="postsReact">
        <img src={liked?Heart:NotLike} alt="" style={{cursor:"pointer"}} className="" onClick={handleLike} />
        <img src={Comment} alt="" className="" />
        <img src={Share} alt="" className="" />
      </div>
      <span style={{color:"var(--gray)",fontsize:'12px'}}>{likes} likes</span>
      <div className="detail">
        <span><b>{data.name}</b></span>
        <span> {data.desc}</span>
      </div>

    </div>
  )
}

export default Posts
