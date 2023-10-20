import { ADD_COMMENT, ADD_COMMENT_REPLY, DELETE_COMMENT, GET_COMMENT, GET_COMMENT_REPLY, GET_FAILURE, GET_REQUEST } from "./actionTypes"

const initialState = {
    isLoading : false,
    isError : false,
    comments : [],
    isDeleted : false,
    isCommentAdded : false,
    commentreplies : []
}

export const reducer = (state=initialState,{type,payload}) => {
      switch(type){
        case GET_REQUEST : {
            return {
                ...state,
                isLoading : true,
                isError : false,
                isDeleted : false,
                isCommentAdded : false
            }
        }

        case GET_FAILURE : {
            return {
                ...state,
                isLoading : false,
                isError : true,
                isDeleted : false,
                isCommentAdded : false
            }
        }
        
        case  GET_COMMENT: {
            return {
                ...state,
                isLoading : false,
                isError : false,
                comments : payload
            }
        }
     
        case ADD_COMMENT : {
            return {
                ...state,
                isLoading : false,
                isError : false,
                isCommentAdded : true
            }
        }
     
        case DELETE_COMMENT : {
            return {
                ...state,
                isLoading : false,
                isError : false,
                isDeleted : true
            }
        }

        case GET_COMMENT_REPLY : {
            return {
                ...state,
                isLoading : false,
                isError : false,
                commentreplies : payload
            }
        }

        case ADD_COMMENT_REPLY : {
            return {
                ...state,
                isLoading : false,
                isError : false
            }
        }
       
        default : {
            return state
        }
      }
}
