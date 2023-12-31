import { ADD_POST, DELETE_POST, GET_FAILURE, GET_PROFILE_POSTS, GET_REQUEST, GET_SUCCESS, POST_LIKE } from "./actionTypes"

const initialState = {
    isLoading : false,
    isError : false,
    posts : [],
    postlikemsg : "",
    isLiked:false,
    isAdded : false,
    profileposts : [],
    isDeleted : false
}

export const reducer = (state=initialState,{type,payload}) => {
      switch(type){
        case GET_REQUEST : {
            return {
                ...state,
                isLoading : true,
                isError : false,
                isAdded: false,
                isDeleted : false
            }
        }

        case GET_FAILURE : {
            return {
                ...state,
                isLoading : false,
                isError : true,
                isLiked:false,
                isAdded: false,
                isDeleted : false
            }
        }
        
        case GET_SUCCESS : {
            return {
                ...state,
                isLoading : false,
                isError : false,
                posts : payload
            }
        }
     
        case ADD_POST : {
            return {
                ...state,
                isLoading : false,
                isError : false,
                isLiked:false,
                isAdded: true
            }
        }
        case GET_PROFILE_POSTS : {
            return {
                ...state,
                isLoading : false,
                isError : false,
                profileposts : payload
            }
        }


        case DELETE_POST : {
            return {
                ...state,
                isLoading : false,
                isError : false,
                isDeleted : true
            }
        }
       
        default : {
            return state
        }
      }
}
