import axios from "axios"
import { GET_FAILURE, GET_REQUEST, GET_SUCCESS } from "./actionTypes"

export const getPosts = () => (dispatch) => {
     dispatch({type:GET_REQUEST})
     axios.get('https://socialmediabackend-w824.onrender.com/posts').then((res)=>{
        // console.log(res.data.posts)
        dispatch({type:GET_SUCCESS,payload:res.data.posts})
     }).catch((err)=>{
        // console.log(err)
        dispatch({type:GET_FAILURE})
     })
}