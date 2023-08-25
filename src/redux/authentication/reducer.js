import { AUTH_LOGIN_FAILURE, AUTH_LOGIN_REQUEST, AUTH_LOGIN_SUCCESS, AUTH_SIGNUP_FAILURE, AUTH_SIGNUP_REQUEST, AUTH_SIGNUP_SUCCESS, GET_ALL_USERS } from "./actionTypes"

const initialState = {
    isLoading : false,
    isError : false,
    isAuth : false,
    token : "",
    signupmsg:"",
    errmsg : "",
    loginmsg:"",
    username:"",
    allusers :[]
}

export const reducer = (state=initialState,{type,payload}) => {
      switch(type){
        case AUTH_SIGNUP_REQUEST : {
          return {
            ...state,
            isLoading : true,
            isError : false,
            isAuth : false
          }
        }
        case AUTH_SIGNUP_SUCCESS : {
          return {
            ...state,
            isLoading : false,
            isError : false,
            isAuth : false,
            signupmsg : payload
          }
        }
        case AUTH_SIGNUP_FAILURE : {
          return {
            ...state,
            isLoading : true,
            isError : true,
            isAuth : false,
            errmsg : payload
          }
        }
        case AUTH_LOGIN_REQUEST : {
          return {
            ...state,
            isLoading : true,
            isError : false,
            isAuth : false
          }
        }
        case AUTH_LOGIN_SUCCESS : {
          console.log(payload)
          return {
            ...state,
            isLoading:false,
            isError : false,
            token:payload.token,
            loginmsg : payload.msg,
            username : payload.name,
            isAuth : true
          }
        }
        case AUTH_LOGIN_FAILURE : {
          return {
            ...state,
            isError : true,
            errmsg : payload,
            isLoading : false,
            isAuth : false
          }
        }
        case GET_ALL_USERS : {
          return {
            ...state,
            isLoading : false,
            isError : false,
            allusers : payload
          }
        }
        default : {
            return state
        }
      }
}
