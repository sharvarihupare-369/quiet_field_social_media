import axios from "axios"
import { AUTH_LOGIN_FAILURE, AUTH_LOGIN_REQUEST, AUTH_LOGIN_SUCCESS, AUTH_LOGOUT_FAILURE, AUTH_LOGOUT_REQUEST, AUTH_LOGOUT_SUCCESS, AUTH_SIGNUP_REQUEST, AUTH_SIGNUP_SUCCESS, GET_ALL_USERS } from "./actionTypes"
// https://socialmediabackend-w824.onrender.com/users/
// https://social-media-backend-ten-tau.vercel.app/users
export const getAllUsers = () => (dispatch) => {
  dispatch({type:AUTH_SIGNUP_REQUEST})
  axios.get('https://socialmediabackend-w824.onrender.com/users/').then((res)=>{
    // console.log(res)
    dispatch({type:GET_ALL_USERS,payload:res.data})
  }).catch((err)=>{
    // console.log(err) 
    dispatch({type:AUTH_LOGIN_FAILURE})
  })
}

export const signup = (signupdata) => (dispatch) => {
    dispatch({type:AUTH_SIGNUP_REQUEST})
    axios.post(`https://socialmediabackend-w824.onrender.com/users/register`,signupdata).then((res)=>{
      // console.log(res)
      dispatch({type:AUTH_SIGNUP_SUCCESS, payload:res.data.msg})
    }).catch((err)=>{
      // console.log(err)
      dispatch({type:AUTH_LOGIN_FAILURE,payload:err.response.data.errmsg})
    })
}

export const login = (loginDetails) => (dispatch) => {
      dispatch({type:AUTH_LOGIN_REQUEST})
      axios.post(`https://socialmediabackend-w824.onrender.com/users/login`,loginDetails).then((res)=>{
        // console.log(res)
        if(res.data){
          localStorage.setItem("social-token",JSON.stringify({token:res.data.token,username:res.data.name}))
        }
       
        dispatch({type:AUTH_LOGIN_SUCCESS,payload:res.data})
      }).catch((err)=>{
        // console.log(err)
        dispatch({type:AUTH_LOGIN_FAILURE,payload:err.response.data})
      })
}



export const logout = (token) => (dispatch) => {
  dispatch({type:AUTH_LOGOUT_REQUEST})
  axios.get("https://socialmediabackend-w824.onrender.com/users/logout",null,{
    headers : {
       'Authorization' : `Bearer ${token}`
    }}).then((res)=>{
    dispatch({type:AUTH_LOGOUT_SUCCESS})
  }).catch((err)=>{
    dispatch({type:AUTH_LOGOUT_FAILURE})
  })
}