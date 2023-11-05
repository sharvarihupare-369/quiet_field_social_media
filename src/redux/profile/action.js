import axios from "axios"
import { ADD_SUCCESS_PROFILE, ADD_SUCCESS_PROFILEPIC, GET_ALL_SUCCESS_PROFILE, GET_FAILURE_PROFILE, GET_REQUEST_PROFILE, GET_SUCCESS_PROFILE, UPDATE_SUCCESS_PROFILE, UPDATE_SUCCESS_PROFILEPIC } from "./actionTypes"

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

export const allProfiles = () => (dispatch) => {
   dispatch({type:GET_REQUEST_PROFILE})
   axios.get("https://socialmediabackend-w824.onrender.com/profile/allProfiles").then((res)=>{
      // console.log(res.data.profiles)
      dispatch({type:GET_ALL_SUCCESS_PROFILE ,payload:res.data.profiles})
   }).catch((err)=>{
      // console.log(err)
      dispatch({type:GET_FAILURE_PROFILE})
   })
}


export const addProfile = (payload,token) => (dispatch) => {
   dispatch({type:GET_REQUEST_PROFILE})
   return axios.post("https://socialmediabackend-w824.onrender.com/profile/addProfile",payload,{
      headers : {
         'Authorization' : `Bearer ${token}`,
         'Content-Type': 'multipart/form-data'
      }
   }).then((res)=>{
      // console.log(res)
      dispatch({type:ADD_SUCCESS_PROFILE})
   }).catch((err)=>{
      // console.log(err)
      dispatch({type:GET_FAILURE_PROFILE})
   })
 }

 export const updateProfile = (payload,token,id) => (dispatch) => {
   dispatch({type:GET_REQUEST_PROFILE})
  return axios.put(`https://socialmediabackend-w824.onrender.com/profile/updateProfile/${id}`,payload,{
      headers: {
         'Authorization' : `Bearer ${token}`,
         'Content-Type': 'multipart/form-data'
      }
   }).then((res)=>{
         console.log(res)
         dispatch({type:UPDATE_SUCCESS_PROFILE})
      }).catch((err)=>{
           console.log(err)
      dispatch({type:GET_FAILURE_PROFILE})
      })
   
 }

 
 export const addProfilePic = (payload,token) => (dispatch) => {
   dispatch({type:GET_REQUEST_PROFILE})
   axios.post("https://socialmediabackend-w824.onrender.com/profile/addProfilePic",payload,{
      headers : {
         'Authorization' : `Bearer ${token}`,
         'Content-Type': 'multipart/form-data'
      }
   }).then((res)=>{
      // console.log(res)
      dispatch({type:ADD_SUCCESS_PROFILEPIC})
   }).catch((err)=>{
      // console.log(err)
      dispatch({type:GET_FAILURE_PROFILE})
   })
 }
 
  export const updateProfilePic = (payload,token) => (dispatch) => {
   dispatch({type:GET_REQUEST_PROFILE})
   axios.patch("https://socialmediabackend-w824.onrender.com/profile/updateProfilePic",payload,{
      headers : {
         'Authorization' : `Bearer ${token}`,
         'Content-Type': 'multipart/form-data'
      }
   }).then((res)=>{
      // console.log(res)
      dispatch({type:UPDATE_SUCCESS_PROFILEPIC})
   }).catch((err)=>{
      // console.log(err)
      dispatch({type:GET_FAILURE_PROFILE})
   })
 }