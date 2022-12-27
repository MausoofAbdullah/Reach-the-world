import React from 'react'
import './Posts.css'
import Comment from "../../img/comment.png"
import Share from "../../img/share.png"
import Heart from "../../img/like.png"
import NotLike from "../../img/notlike.png"

const Posts = ({data}) => {
  return (
    <div className='Posts'>
      <img  src={data.img} alt="" />

      <div className="postsReact">
        <img src={data.liked?Heart:NotLike} alt="" className="" />
        <img src={Comment} alt="" className="" />
        <img src={Share} alt="" className="" />
      </div>
      <span style={{color:"var(--gray)",fontsize:'12px'}}>{data.likes} likes</span>
      <div className="detail">
        <span><b>{data.name}</b></span>
        <span> {data.desc}</span>
      </div>

    </div>
  )
}

export default Posts
