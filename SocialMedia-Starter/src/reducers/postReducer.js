const postReducer = (
  state = { posts: [], loading: false, error: false, uploading: false },
  action,
) => {
  switch (action.type) {
    case "UPLOAD_START":
      return { ...state, uploading: true, error: false };
    case "UPLOAD_SUCCESS":
      return {
        ...state,
        posts: [action.data, ...state.posts],
        uploading: false,
        error: false,
      };
    case "UPLOAD_FAIL":
      return { ...state, uploading: false, error: true };


    // belongs to Post.jsx
    case "RETREIVING_START":
      return { ...state, loading: true, error: false };
    case "RETREIVING_SUCCESS":
      return { ...state, posts: action.data, loading: false, error: false };
    case "RETREIVING_FAIL":
      return { ...state, loading: false, error: true };
       //this is for adding comments

    case "COMMENT_START":
      return{ ...state, loading: true, error:false};
    case "COMMENT_SUCCESS":
      return{ ...state, ...([...state.posts.filter((post)=>post._id===action.id)])[0].comments.push(action.data),loading:false,error:false};
    case "COMMENT_FAIL":
      return{ ...state, loading:false, error:true};
      
       //this is for deleting comments
      case "DELETE_STARTED":
        return{...state, loading:true, error:false}
      case "DELETE_SUCCESS":
        return{...state,posts:state.posts.filter((post)=>post._id !== action.id), loading:false,error: false}
      case "DELETE_FAIL":
        return{...state, loading:false, error:true}
      case "COMMENT_DEL_START":
        return{...state,loading:true,error:false}
      case "COMMENT_DEL_SUCCESS":
        return{...state,loading:false,error:false}
      case "COMMENT_DEL_ERROR":
        return{...state,loading:false,error:true}
  
    
    default:
      return state;
  }
};
export default postReducer