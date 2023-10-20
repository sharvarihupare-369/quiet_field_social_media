import axios from "axios"
import { ADD_COMMENT, ADD_COMMENT_REPLY, GET_COMMENT, GET_COMMENT_REPLY, GET_FAILURE, GET_REQUEST } from "./actionTypes"

export const getComments = (postId) => (dispatch) => {
    dispatch({type:GET_REQUEST})
    axios.get(`https://drab-erin-cuttlefish-wear.cyclic.app/posts/${postId}/comments`).then((res)=>{
      //  console.log(res.data.comments)
       dispatch({type:GET_COMMENT,payload:res.data.comments})
    }).catch((err)=>{
      //  console.log(err)
       dispatch({type:GET_FAILURE})
    })
}


export const addnewComment = (postId,payload,token) => (dispatch) => {
    dispatch({type:GET_REQUEST})
   return axios.post(`https://drab-erin-cuttlefish-wear.cyclic.app/posts/${postId}`,payload,{
       headers : {
          'Authorization' : `Bearer ${token}`
       }
    }).then((res)=>{
       console.log(res)
       dispatch({type:ADD_COMMENT})
    }).catch((err)=>{
         // console.log(err)
         dispatch({type:GET_FAILURE})
    })
 }
 


 export const postReplies = (postId,commentId,payload,token) => (dispatch) => {
   dispatch({type:GET_REQUEST})
   axios.post(`https://drab-erin-cuttlefish-wear.cyclic.app/posts/${postId}/${commentId}/replies`,payload,{
      headers : {
         'Authorization' : `Bearer ${token}`
      }
   }).then((res)=>{
      console.log(res)
      dispatch({type:ADD_COMMENT_REPLY})
   }).catch((err)=>{
        console.log(err)
        dispatch({type:GET_FAILURE})
   })
 }