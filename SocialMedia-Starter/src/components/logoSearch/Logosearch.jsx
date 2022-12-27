import React from 'react'
import Logo from '../../img/logonew.png'
import {UilSearch} from "@iconscout/react-unicons"
import "./Logosearch.css"

const Logosearch = () => {
  return (
    <div className='Logosearch'>
      <img src={Logo} alt="" />
      <div className="Search">
        <input type="text" placeholder='#Explore'/>
        <div className="S-icon">
            <UilSearch/>
        </div>
      </div>
    </div>
  )
}

export default Logosearch
