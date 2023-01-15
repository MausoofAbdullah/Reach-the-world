import axios from 'axios';

const API=axios.create({baseURL:"http://localhost:5000"})

export const adminGettingUser=()=>API.get("/admin/user-list")
export const adminBlockUser=(userId)=>API.post("/admin/block-user",userId)
export const adminUnBlockUser=(userId)=>API.post("/admin/unblock-user",userId)
