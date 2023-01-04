import React from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { followUser, getUser, unfollowUser } from '../../actions/userAction'


const User = ({person}) => {
    const dispatch=useDispatch()
    const {user}=useSelector((state)=>state.authReducer.authData)
    const [following,setFollowing]=useState(person.followers.includes(user._id))
  const serverPublic=process.env.REACT_APP_PUBLIC_FOLDER
  const handleFollow=()=>{
        following?
        dispatch(unfollowUser(person._id,user)):
        dispatch(followUser(person._id,user))
        setFollowing((prev)=>!prev)
  }
  
  const setUser = ()=>{
    dispatch(getUser(person._id))
    
  }
  return (
    
      <div className='follower'>
                <div>
                    <img src={serverPublic + person.profilePicture?serverPublic+person.profilePicture:serverPublic+"defaultProfile.jpeg"} alt="" className="Followerimg" />
                    <div className="name">
                <Link onClick={setUser} style={{textDecoration:"none", color : "inherit"}} to={`/profile/${person._id}`}>
                {person.firstname}
                </Link>
                        <span>{person.username.split("@",1)}</span>
                    </div>
                </div>
                <button className={following? "button fc-button unfollowButton" : 'button fc-button'} onClick={handleFollow}>
                    {following?"unfollow":"Follow"}
                </button>
            </div>
    
  )
}

export default User
