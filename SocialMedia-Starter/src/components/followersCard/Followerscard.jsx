import React, { useState } from 'react'
import './Followerscard.css'
// import { Followers } from '../../data/Followersdata'
import User from '../user/User'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { getAllUser } from '../../api/UserRequest'
// import "./../../App.css"
const Followerscard = () => {
  const [persons,setPersons]=useState([])
  const {user}=useSelector((state)=>state.authReducer.authData)

  useEffect(()=>{
    const fetchPersons=async()=>{
      const {data}=await getAllUser()
      setPersons(data)
      console.log(data,"friends")
    }
    fetchPersons()
  },[])
  return (
    <div className='Followerscard' >
      <h3>People you may know</h3>
      {persons.map((person,id)=>{
        if(person._id !==user._id){
          
          return(
              <User person={person} key={id}/>
          )
        }
      })}
    </div>
  )
}

export default Followerscard
