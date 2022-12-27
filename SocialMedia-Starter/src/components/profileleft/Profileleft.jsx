import React from 'react'
import Followerscard from '../followersCard/Followerscard'
import Infocard from '../infocard/Infocard'
import Logosearch from '../logoSearch/Logosearch'
import "./Profileleft.css"

const Profileleft = () => {
  return (
    <div className='Profileside' >
      <Logosearch/>
      <Infocard/>
      <Followerscard/>
    </div>
  )
}

export default Profileleft
