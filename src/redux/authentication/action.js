import axios from "axios"
import { AUTH_LOGIN_FAILURE, AUTH_LOGIN_REQUEST, AUTH_LOGIN_SUCCESS, AUTH_SIGNUP_REQUEST, AUTH_SIGNUP_SUCCESS, GET_ALL_USERS } from "./actionTypes"


export const getAllUsers = (token) => (dispatch) => {
  dispatch({type:AUTH_SIGNUP_REQUEST})
  axios.get('https://socialmediabackend-w824.onrender.com/users/',{
     headers : {
      'Authorization' : `Bearer ${token}`
     }
     
  }).then((res)=>{
    console.log(res)
    dispatch({type:GET_ALL_USERS,payload:res.data})
  }).catch((err)=>{
    console.log(err)
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
        console.log(res)
        dispatch({type:AUTH_LOGIN_SUCCESS,payload:res.data})
      }).catch((err)=>{
        console.log(err)
        dispatch({type:AUTH_LOGIN_FAILURE,payload:err.response.data})
      })
}

export const logout = () => (dispatch) => {
    
}