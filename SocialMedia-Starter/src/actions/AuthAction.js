import * as AuthApi from "../api/Authrequest"
export const logIn= (FormData)=>async(dispatch)=>{
    dispatch({type:"AUTH_START"})
    try {
        const {data} =await AuthApi.logIn(FormData)
        dispatch({type:"AUTH_SUCCESS",data:data})
        
    } catch (error) {
        console.log(error)
        dispatch({type:"AUTH_FAIL"})
    }
}
export const signup= (FormData)=>async(dispatch)=>{
    dispatch({type:"AUTH_START"})
    try {
        const {data} =await AuthApi.signup(FormData)
        dispatch({type:"AUTH_SUCCESS",data:data})
        
    } catch (error) {
        console.log(error)
        dispatch({type:"AUTH_FAIL"})
    }
}

export const logout=()=>async(dispatch)=>{
    dispatch({type:"LOG_OUT"})
}