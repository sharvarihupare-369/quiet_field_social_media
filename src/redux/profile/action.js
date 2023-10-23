import axios from "axios"
import { ADD_SUCCESS_PROFILE, GET_FAILURE_PROFILE, GET_REQUEST_PROFILE, GET_SUCCESS_PROFILE } from "./actionTypes"

export const getProfile = (token) => (dispatch) => {
   dispatch({type:GET_REQUEST_PROFILE})
   axios.get("https://socialmediabackend-w824.onrender.com/profile/myProfile",{
      headers : {
         'Authorization' : `Bearer ${token}`
      }
   }).then((res)=>{
      // console.log(res.data.profile)
      dispatch({type:GET_SUCCESS_PROFILE,payload:res.data.profile})
   }).catch((err)=>{
      // console.log(err)
      dispatch({type:GET_FAILURE_PROFILE})
   })
}


export const addProfile = (payload,token) => (dispatch) => {
   dispatch({type:GET_REQUEST_PROFILE})
   axios.post("https://socialmediabackend-w824.onrender.com/profile/addProfile",payload,{
      headers : {
         'Authorization' : `Bearer ${token}`,
         'Content-Type': 'multipart/form-data'
      }
   }).then((res)=>{
      console.log(res)
      dispatch({type:ADD_SUCCESS_PROFILE})
   }).catch((err)=>{
      console.log(err)
      dispatch({type:GET_FAILURE_PROFILE})
   })
 }
 