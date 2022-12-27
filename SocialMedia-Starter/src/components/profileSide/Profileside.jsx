import React from 'react'
import Followerscard from '../followersCard/Followerscard'
import Logosearch from '../logoSearch/Logosearch'
import Profilecard from '../profileCard/Profilecard'
import "./Profileside.css"

const Profileside = () => {
  return (
    <div className='Profileside'>
      <Logosearch/>
      <Profilecard/>
      <Followerscard/>
    </div>
  )
}

export default Profileside
