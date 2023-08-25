import axios from "axios"
import { GET_FAILURE, GET_REQUEST, GET_SUCCESS, POST_LIKE, POST_UNLIKE } from "./actionTypes"

export const getPosts = () => (dispatch) => {
     dispatch({type:GET_REQUEST})
     axios.get('https://socialmediabackend-w824.onrender.com/posts').then((res)=>{
        console.log(res.data.posts)
        dispatch({type:GET_SUCCESS,payload:res.data.posts})
     }).catch((err)=>{
        // console.log(err)
        dispatch({type:GET_FAILURE})
     })
}

export const postLike = (id,token) => (dispatch) => {
   dispatch({type:GET_REQUEST})
  return axios.post(`https://socialmediabackend-w824.onrender.com/posts/like/${id}`,null,{
      headers : {
         'Authorization' : `Bearer ${token}`
      }
   }).then((res)=>{
      console.log(res)
      dispatch({type:POST_LIKE,payload:res.data.msg})
   }).catch((err)=>{
      console.log(err)
      dispatch({type:GET_FAILURE})
   })
}

export const postUnLike = (id,token) => (dispatch) => {
   dispatch({type:GET_REQUEST})
  return axios.post(`https://socialmediabackend-w824.onrender.com/posts/unlike/${id}`,null,{
      headers : {
         'Authorization' : `Bearer ${token}`
      }
   }).then((res)=>{
      console.log(res)
      dispatch({type:POST_UNLIKE})
   }).catch((err)=>{
      console.log(err)
      dispatch({type:GET_FAILURE})
   })
}