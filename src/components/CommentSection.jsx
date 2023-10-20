import { Box ,Button,Flex,Input,List,Text, UnorderedList} from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addnewComment, getComments } from '../redux/comments/action'
import { AddIcon } from '@chakra-ui/icons'

const CommentSection = ({postId}) => {
    const dispatch = useDispatch()
    const userData = JSON.parse(localStorage.getItem("social-token"))
    const {comments} = useSelector(store=>store.commentReducer)
    const [newComment,setNewComment] =useState("")

    useEffect(()=>{
       dispatch(getComments(postId))
    },[dispatch,postId])
  
    const handleAddComment = () => {
       if(newComment){
        dispatch(addnewComment(postId,{content:newComment},userData?.token));
        dispatch(getComments(postId))
        setNewComment("")
       }
    }

  return (
   <Box>
    {/* <Text fontWeight={600} textAlign={"left"} m="10px 0">Comments</Text> */}
    <UnorderedList>
        {
            comments?.map((comment)=>(   
                
                 <List key={comment?.id}>
                   {comment?.content}
                </List>
            ))
        }
    </UnorderedList>
    <Box>
       <Flex  align={"center"}  gap="10px"  >
       <Input focusBorderColor='#212121' border={"none"} variant={"flushed"} outline={"none"} type='text' placeholder='Add a Comment...'  value={newComment} onChange={(e)=>setNewComment(e.target.value)} />
        <AddIcon  onClick={handleAddComment}/>
       </Flex>
    </Box>
   </Box>
  )
}

export default CommentSection