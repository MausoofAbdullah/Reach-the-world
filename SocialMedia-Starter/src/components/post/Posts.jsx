import React, { useEffect } from 'react'
import './Posts.css'
import Comment from "../../img/comment.png"
import Share from "../../img/share.png"
import Heart from "../../img/like.png"
import NotLike from "../../img/notlike.png"
import {   useDispatch, useSelector } from 'react-redux' 
import { useState } from 'react'
import { likePost } from '../../api/PostRequest'
import { getUser } from '../../api/UserRequest'
import InputEmoji from "react-input-emoji"
import deletButton from '../../img/deleteButton.png'
import reportButton from '../../img/file-earmark-excel.svg'
import PostDeleteModal from '../PostDeleteModal/PostDeleteModal.jsx'
import PostReportModal from "../postReportModal/PostReportModal.jsx"

import { format } from "timeago.js"
import DeleteComment from '../DeleteComment/DeleteComment.jsx'
import commentDelete from "../../img/commentDelete.png"
import { addComment } from '../../actions/postAction'


const Posts = ({data}) => {

 const dispatch=useDispatch()
 const serverPublic=process.env.REACT_APP_PUBLIC_FOLDER

 const {user}=useSelector((state)=>state.authReducer.authData)

  const [liked,setLiked]=useState(data.likes.includes(user._id))
  const [likes,setLikes]=useState(data.likes.length)
  const [postMan, setPostMan] = useState()
  const [postmanImage,setPostmanImage]=useState()

  const [modalOpen, setModalOpen] = useState(false)
  const [showModal,setShowModal] = useState(false)
  const [open, setOpen] = useState(false)
  const [commentString, setCommentString] = useState("")

  //fetching user to get username of posts

  useEffect(() => {
    const fetchUser = async () => {
       const postedUser = await getUser(data.userId)
       console.log(postedUser,"who is he")
       setPostMan(postedUser.data.firstname + " " + postedUser.data.lastname)
       setPostmanImage(postedUser.data.profilePicture)
    }
    fetchUser()
 }, [])

  //everything about comments

  // const [showComment, setShowComment] = useState(false)
  // const [comment, setComment] = useState('')
  // let newComment = data.comments

  const handleLike=()=>{
    likePost(data._id,user._id)
    setLiked((prev)=>!prev)
    liked?setLikes((prev)=>prev-1):setLikes((prev)=>prev+1)
  }

  const handleCommentBox = () => {
    setOpen((prev) => !prev)
 }

 const handleCommentChange = (commentString) => {
    setCommentString(commentString)

 }


  const handleSubmit = async (e) => {
    e.preventDefault();
    const comment = {
       comment: commentString,
       commentedUser: user.firstname + ' ' + user.lastname,
       time: Date(),
       user:user._id
    }

    dispatch(addComment(data._id, comment))
    setOpen(false)

 }
  return (
    <div className='Posts'>
<div  className='postmanImage'>
<img src={process.env.REACT_APP_PUBLIC_FOLDER+postmanImage}   />
<b><h3 style={{color:"firebrick"}}>{postMan} </h3></b> </div>
  <img  src={data.image?process.env.REACT_APP_PUBLIC_FOLDER+data.image:""} alt="" className='' /> 
      

      <div className="postsReact">
        <img src={liked?Heart:NotLike} alt="" style={{cursor:"pointer"}} className="" onClick={handleLike} />
        <img src={Comment}  onClick={handleCommentBox} alt=""  className="" />
        <img src={Share} alt="" className="" />
        {/* {data.userId === user._id &&
               <>
                  <img src={deletButton} onClick={() => setModalOpen((prev) => !prev)} style={{ width: "28px", height: "28px", display: "flex", alignSelf: 'flex-end' }} alt="" />
                  <PostDeleteModal modalOpen={modalOpen} setModalOpen={setModalOpen} id={data._id} currentUser={user._id} />
               </>
            } */}
             {data.userId === user._id ?
               <>
                  <img src={deletButton} onClick={() => setModalOpen((prev) => !prev)} style={{ width: "28px", height: "28px", display: "flex", alignSelf: 'flex-end' }} alt="" />
                  <PostDeleteModal modalOpen={modalOpen} setModalOpen={setModalOpen} id={data._id} currentUser={user._id} />
               </>:
               <>
                <img src={reportButton} onClick={() => setModalOpen((prev) => !prev)} style={{ width: "28px", height: "28px", display: "flex", alignSelf: 'flex-end' }} alt="" />
                  <PostReportModal modalOpen={modalOpen} setModalOpen={setModalOpen} id={data._id} currentUser={user._id} />
               </>
            }
      </div>
      <span style={{color:"var(--gray)",fontsize:'12px'}}>{likes} likes</span>
      <div className="detail">
     

       <div> <span> {data.desc}</span></div>
      </div>
      {open &&
            data.comments?.map((com) => {

               return (
                  <div className="commentDiv">
                     <span><b>{com.commentedUser}</b></span>

                     <span> {com.comment}</span>
                     {com.user===user._id  &&
                     <>
                     <img src={commentDelete} style={{width:"20px",height:"20px",marginLeft:"20px",cursor:"pointer"}}  onClick={()=>setShowModal((prev)=>!prev)} alt="" />
                     
                     <DeleteComment showModal={showModal} setShowModal={setShowModal} postId={data._id} commentId={com._id}  />
                     </>
                     }
                     <div>
                        <span style={{paddingRight:"10px"}}>{format(com.time)}</span>
                     </div>
                        
                  </div>
               )
            })
         }

         {open &&
            <div className='addComment' >
               {/* <span><b>username</b></span> */}
            
               <InputEmoji className="InpEmo" value={commentString} onChange={handleCommentChange} />
               <button className="button commentBtn" onClick={handleSubmit}>comment</button>
            </div>
         }

    </div>
  )
}

export default Posts
