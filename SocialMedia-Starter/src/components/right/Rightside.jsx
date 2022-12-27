import React, { useState } from 'react'
import Home from '../../img/home.png'
import Noti from '../../img/noti.png'
import Comment from '../../img/comment.png'
import { UilSetting } from '@iconscout/react-unicons'
import './Rightside.css'
import Trendcard from '../trendcard/Trendcard'
import Sharemodal from '../sharemodal/Sharemodal'

const Rightside = () => {
  const [modalOpened, setModalOpened] = useState(false);
  return (
    <div className='Rightside'>
        <div className="navIcons">
            <img src={Home} alt="" className="" />
            <UilSetting/>
            <img src={Noti} alt="" className="" />
            <img src={Comment} alt="" className="" />
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
