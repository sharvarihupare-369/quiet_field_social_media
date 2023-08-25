import { GET_FAILURE, GET_REQUEST, GET_SUCCESS, POST_LIKE } from "./actionTypes"

const initialState = {
    isLoading : false,
    isError : false,
    posts : [],
    postlikemsg : "",
    isLiked:false
}

export const reducer = (state=initialState,{type,payload}) => {
      switch(type){
        case GET_REQUEST : {
            return {
                ...state,
                isLoading : true,
                isError : false
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
        case GET_FAILURE : {
            return {
                ...state,
                isLoading : false,
                isError : true,
                isLiked:false
            }
        }
      
        default : {
            return state
        }
      }
}
