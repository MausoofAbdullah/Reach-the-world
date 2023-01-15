import axios from "axios"

const API= axios.create({baseURL:"http://localhost:5000"})

export const logIn=(FormData)=>API.post("/auth/login",FormData)
export const signup=(FormData)=>API.post("/auth/register",FormData)
export const verifyotp = (userId,otp) => API.post('/auth/verifyotp',{userId:userId,otp:otp})
//export const logout=()=>API.post("/auth/register",FormData)