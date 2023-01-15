import * as PostApi from "../api/PostRequest"
export const getTimelinePosts=(id)=>async(dispatch)=>{
    dispatch({type:"RETREIVING_START"});
        try{
            const{data}=await PostApi.getTimelinePosts(id)
            dispatch({type:"RETREIVING_SUCCESS",data:data})
        }catch(error){
            dispatch({type:"RETREIVING_FAIL"})
            console.log(error)
        }
}

export const addComment=(id,comment) => async(dispatch)=>{
    dispatch({type:"COMMENT_START"})
    console.log(id,comment,'addcomment postaction');
    try {
      
        dispatch({type:"COMMENT_SUCCESS", data:comment,id:id})
       const data= await PostApi.addComment(id,comment);
        console.log(data,'posta action ane');
    } catch (error) {
        dispatch({type:"COMMENT_FAIL"})
        console.log(error)        
    }
}
export const deleteComment=(postId,commentId)=>async(dispatch)=>{
    dispatch({type:"COMMENT_DEL_START"})
    try {
        dispatch({type:"COMMENT_DEL_SUCCESS",data:commentId,id:postId})
        await PostApi.deleteComment(postId,commentId)
    } catch (error) {
        dispatch({type:"COMMENT_DEL_ERROR"})
        console.log(error)
    }
}


export const deletePost=(id,currentUser)=> async(dispatch)=>{
    dispatch({type:"DELETE_STARTED"})
    try {
        console.log(currentUser,'postaction deltepost');
        await PostApi.deletePost(id,currentUser);
        dispatch({type:"DELETE_SUCCESS", id:id})
    } catch (error) {
        dispatch({type:"DELETE_FAIL"})
    }
}   