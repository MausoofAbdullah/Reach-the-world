import React from 'react'
import './Followerscard.css'
import { Followers } from '../../data/Followersdata'
// import "./../../App.css"
const Followerscard = () => {
  return (
    <div className='Followerscard' >
      <h3>who is following you</h3>
      {Followers.map((follower,id)=>{
        return(
            <div className='follower'>
                <div>
                    <img src={follower.img} alt="" className="Followerimg" />
                    <div className="name">
                        <span>{follower.name}</span>
                        <span>{follower.username}</span>
                    </div>
                </div>
                <button className='button fc-button'>
                    follow
                </button>
            </div>
        )
      })}
    </div>
  )
}

export default Followerscard
