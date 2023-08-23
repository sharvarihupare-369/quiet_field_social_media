import { GET_REQUEST, GET_SUCCESS } from "./actionTypes"

const initialState = {
    isLoading : false,
    isError : false,
    posts : []
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
        case GET_REQUEST : {
            return {
                ...state,
                isLoading : false,
                isError : true
            }
        }
        default : {
            return state
        }
      }
}
