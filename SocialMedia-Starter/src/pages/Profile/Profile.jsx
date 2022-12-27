import React from 'react'
import Postside from '../../components/postSide/Postside'
import Profilecard from '../../components/profileCard/Profilecard'
import Profileleft from '../../components/profileleft/Profileleft'
import Rightside from '../../components/right/Rightside'
import "./Profile.css"

const Profile = () => {
  return (
    <div className='Profile'>
      <Profileleft />
      <div className="profile-center">
        <Profilecard/>
        <Postside/>
      </div>
        <div>
        <Rightside/>
        </div>
    </div>
  )
}

export default Profile
