import React, { useState } from 'react'
import Home from '../../img/home.png'
import Noti from '../../img/noti.png'
import Comment from '../../img/comment.png'
import { UilSetting } from '@iconscout/react-unicons'
import './Rightside.css'
import Trendcard from '../trendcard/Trendcard'
import Sharemodal from '../sharemodal/Sharemodal'
import { Link } from 'react-router-dom'

const Rightside = () => {
  const [modalOpened, setModalOpened] = useState(false);
  return (
    <div className='Rightside'>
        <div className="navIcons">
           <Link to="../home">
            <img src={Home} alt="" className="" />
           </Link>
            <UilSetting/>
            <img src={Noti} alt="" className="" />
            <Link to="../chat">

            <img src={Comment} alt="" className="" />
            </Link>
        </div>
        <Trendcard/>
        <button className='button r-button'  onClick={() => {
              setModalOpened(true);
            }}
          >
            share
        </button>
          <Sharemodal modalOpened={modalOpened}
          setModalOpened={setModalOpened} />
    </div>
  )
}

export default Rightside
