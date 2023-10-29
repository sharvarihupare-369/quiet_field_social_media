import axios from "axios"
import { ADD_POST, DELETE_POST, GET_FAILURE, GET_PROFILE_POSTS, GET_REQUEST, GET_SUCCESS, POST_LIKE, POST_UNLIKE } from "./actionTypes"

export const getPosts = () => (dispatch) => {
     dispatch({type:GET_REQUEST})
   //   axios.get('https://socialmediabackend-w824.onrender.com/posts').then((res)=>{
     axios.get('https://rose-zealous-quail.cyclic.app/posts').then((res)=>{
      //   console.log(res.data.posts)
        dispatch({type:GET_SUCCESS,payload:res.data.posts})
     }).catch((err)=>{
        // console.log(err)
        dispatch({type:GET_FAILURE})
     })
}


export const addnewPost = (payload,token) => (dispatch) => {
   dispatch({type:GET_REQUEST})
   // axios.post("https://socialmediabackend-w824.onrender.com/posts/addPost",payload,{
   axios.post("https://rose-zealous-quail.cyclic.app/posts/addPost",payload,{
      headers : {
         'Authorization' : `Bearer ${token}`,
         'Content-Type': 'multipart/form-data' 
      }
   }).then((res)=>{
      console.log(res)
      dispatch({type:ADD_POST})
   }).catch((err)=>{
        console.log(err)
        dispatch({type:GET_FAILURE})
   })
}

export const postLike = (id,token) => (dispatch) => {
   dispatch({type:GET_REQUEST})
//   return axios.post(`https://socialmediabackend-w824.onrender.com/posts/like/${id}`,null,{
  return axios.post(`https://rose-zealous-quail.cyclic.app/posts/like/${id}`,null,{
      headers : {
         'Authorization' : `Bearer ${token}`
      }
   }).then((res)=>{
      // console.log(res)
      dispatch({type:POST_LIKE,payload:res.data.msg})
   }).catch((err)=>{
      // console.log(err)
      dispatch({type:GET_FAILURE})
   })
}

export const postUnLike = (id,token) => (dispatch) => {
   dispatch({type:GET_REQUEST})
//   return axios.post(`https://socialmediabackend-w824.onrender.com/posts/unlike/${id}`,null,{
  return axios.post(`https://rose-zealous-quail.cyclic.app/posts/unlike/${id}`,null,{
      headers : {
         'Authorization' : `Bearer ${token}`
      }
   }).then((res)=>{
      // console.log(res)
      dispatch({type:POST_UNLIKE})
   }).catch((err)=>{
      // console.log(err)
      dispatch({type:GET_FAILURE})
   })
}


export const getparticularPosts = (token) => (dispatch) => {
   // console.log(token)
   dispatch({type:GET_REQUEST})
   // axios.get("https://socialmediabackend-w824.onrender.com/posts/user",{
   axios.get("https://rose-zealous-quail.cyclic.app/posts/user",{
      headers : {
         'Authorization' : `Bearer ${token}`
      }}).then((res)=>{
      // console.log(res)
      dispatch({type:GET_PROFILE_POSTS,payload:res.data})
   }).catch((err)=>{
      // console.log(err)
      dispatch({type:GET_FAILURE})
   })
}

export const deletePost = (id,token) => (dispatch) => {
   dispatch({type:GET_REQUEST})
   // axios.delete(`https://socialmediabackend-w824.onrender.com/posts/delete/${id}`,{
   axios.delete(`https://rose-zealous-quail.cyclic.app/posts/delete/${id}`,{
      headers : {
         'Authorization' : `Bearer ${token}`
      }}).then((res)=>{
         if (res.data.msg === "Post is deleted!") {
            dispatch({ type: DELETE_POST });
          } else {
            dispatch({ type: GET_FAILURE, payload: 'Failed to delete post' });
          }
      // console.log(res)
      // dispatch({type:DELETE_POST})
   }).catch((err)=>{
      console.log(err)
      dispatch({type:GET_FAILURE})
   })
}