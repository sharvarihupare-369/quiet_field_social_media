import { ADD_SUCCESS_PROFILE, ADD_SUCCESS_PROFILEPIC, DELETE_SUCCESS_PROFILE, GET_ALL_SUCCESS_PROFILE, GET_FAILURE_PROFILE,  GET_REQUEST_PROFILE, GET_SUCCESS_PROFILE, UPDATE_SUCCESS_PROFILE, UPDATE_SUCCESS_PROFILEPIC } from "./actionTypes"

const initialState = {
    isLoading : false,
    isError : false,
    getprofile : {},
    allusersProfile : [],
    isProfileAdded : false,
    isProfileDeleted : false,
    isAddedPic : false,
    isUpdatePic : false,
    isUpdatedProfile : false,
}

export const reducer = (state=initialState,{type,payload}) => {
      switch(type){
        case GET_REQUEST_PROFILE : {
            return {
                ...state,
                isLoading : true,
                isError : false,
                isProfileAdded : false,
                isProfileDeleted : false,
                isUpdatePic : false,
                isUpdatedProfile : false,
                isAddedPic : false,
            }
        }

        case GET_FAILURE_PROFILE : {
            return {
                ...state,
                isLoading : false,
                isError : true,
                isProfileAdded : false,
                isProfileDeleted : false
            }
        }
        
        case  GET_SUCCESS_PROFILE: {
            // console.log(payload)
            return {
                ...state,
                isLoading : false,
                isError : false,
                getprofile : payload
            }
        }

        case  GET_ALL_SUCCESS_PROFILE: {
            // console.log(payload)
            return {
                ...state,
                isLoading : false,
                isError : false,
                allusersProfile : payload
            }
        }
     
        case ADD_SUCCESS_PROFILE : {
            return {
                ...state,
                isLoading : false,
                isError : false,
                isProfileAdded : true
            }
        }
     
        case DELETE_SUCCESS_PROFILE : {
            return {
                ...state,
                isLoading : false,
                isError : false,
                isProfileDeleted : true
            }
        }

        case UPDATE_SUCCESS_PROFILEPIC : {
            return {
                ...state,
                isLoading :false,
                isError:false,
                isUpdatePic : true,
            }
        }
        case UPDATE_SUCCESS_PROFILE : {
            return {
                ...state,
                isLoading:false,
                isUpdatedProfile : true
            }
        }

        case ADD_SUCCESS_PROFILEPIC : {
            return  {
              ...state,
              isLoading : false,
              isAddedPic : false,
            }
        }
       
        default : {
            return state
        }
      }
}
