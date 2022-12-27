import React from 'react'
import { Postdata } from '../../data/Postdata'
import Posts from '../post/Posts'
import './Post.css'

const Post = () => {
  return (
    <div className='Post'>
      {Postdata.map((post,id)=>{
        return <Posts data={post} id={id} />
      })}
    </div>
  )
}

export default Post
