import axios from "axios"

const API= axios.create({baseURL:"http://localhost:5000"})

export const logIn=(FormData)=>API.post("/auth/login",FormData)
export const signup=(FormData)=>API.post("/auth/register",FormData)

//export const forgot=(FormData)=>API.post("/auth/forgotPassword",FormData)
export const reset=(resetEmail)=>API.post("/auth/sendpasswordlink",{username:resetEmail})


export const newpassword=(id,token)=>API.get(`/auth/newpassword/${id}/${token}`)
export const changepassword=(id,token,password)=>API.post(`auth/${id}/${token}`,{password:password})

export const verifyotp = (userId,otp) => API.post('/auth/verifyotp',{userId:userId,otp:otp})
//export const logout=()=>API.post("/auth/register",FormData)