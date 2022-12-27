import React from 'react'
import Cover from '../../img/covernew.jpg'
 import Profile from '../../img/profileImgnew.png'
 import './Profilecard.css'

const Profilecard = () => {
    const ProfilePage=true
  return (
    <div className='Profilecard'>
        <div className="Profileimages">
            <img src={Cover} alt=""  />
            <img src={Profile} alt=""  />
        </div>
        <div className="Profilename">
            {/* <span>Xdjfdkfj</span> */}
            <span>dfdfdf</span>
            <span>qweew</span>
        </div>
        <div className="Followstatus">
            <hr/>
           <div>
           <div className="Follow">
                <span>4342</span>
                <span>Followings</span>
            </div>
            <div className="vl"></div>
                <div className="Follow">
                <span>4</span>
                <span>Followers</span> 
                </div>
                {ProfilePage && (
                    <>
                    <div className="vl">

                    </div>
                    <div className="Follow">
                        <span>3</span>
                        <span>posts</span>
                    </div>
                    </>
                )}
           </div>
      <hr/>
        </div>
        {ProfilePage ? "":<span>My Profile </span>}
            
       
     
    </div>
  )
}

export default Profilecard
