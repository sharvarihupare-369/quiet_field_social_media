import { Box } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts, postLike, postUnLike } from "../redux/posts/action";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
  Text,
  Image,
  Flex,
  Avatar,
  Heading,
  IconButton,
} from "@chakra-ui/react";
import { BiLike, BiChat, BiShare } from "react-icons/bi";
import { getAllUsers } from "../redux/authentication/action";


const Posts = () => {

  let liked = JSON.parse(localStorage.getItem("isLiked")) || false;
  const { posts,isLiked } = useSelector((store) => store.postReducer);
  const { allusers } = useSelector((store) => store.authReducer);
  const dispatch = useDispatch();
  // console.log(allusers)
  const token = localStorage.getItem("social-token") || ""


  const handleLike = async(id) => {
    
    localStorage.setItem("isLiked", JSON.stringify(!liked));
    if(!liked){
     await dispatch(postLike(id,token))
     await dispatch(getPosts());
    }else{
     await dispatch(postUnLike(id,token))
     await dispatch(getPosts());
    }

  }

  useEffect(()=>{
   dispatch(getAllUsers())
  },[token])

  useEffect(() => {
    dispatch(getPosts());
  }, []);

  let name = ""

  return (
    <Box>
    
      {posts.map((post) => {
        {/* console.log(post.author._id) */}
         {
            allusers.map((el)=>{
               if(el._id == post.author._id){
                  name = el.fullname
               }
            })
            {/* console.log(name) */}
         }
        return (
           <Flex  key={post._id} justifyContent={"center"}>
          <Card  mt="20px" maxW="md">

            <CardHeader>
              <Flex spacing="4">
                <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
                  <Avatar name={name} src={name} />

                  <Box>
                    <Heading size='md'>{name}</Heading>
                   {/* <Text>Creator, Chakra UI</Text> */}
                 </Box>
                </Flex>
                {/* <IconButton
                  variant="ghost"
                  colorScheme="gray"
                  aria-label="See menu"
                  icon={<BsThreeDotsVertical />}
                /> */}
              </Flex>
            </CardHeader>
            
            <Image objectFit="cover" src={post.image} alt="postImage" />
            <CardBody>
              <Text fontSize={"20px"}>
                {post.content}
              </Text>
            </CardBody>

            <CardFooter
              justify="space-between"
              flexWrap="wrap"
              sx={{
                "& > button": {
                  minW: "136px",
                },
              }}
            >
              <Button  style={{background:liked ? "red" : "white" }} flex="1" variant="solid" onClick={()=>handleLike(post._id)}  leftIcon={<BiLike  />}>
               {post.likes.length !== 0  ?  post.likes.length : ""} Like
              </Button>
              <Button flex="1" variant="ghost" leftIcon={<BiChat />}>
                Comment
              </Button>
              <Button flex="1" variant="ghost" leftIcon={<BiShare />}>
                Share
              </Button>
            </CardFooter>


          </Card>
           </Flex>
        );
      })}
    </Box>
  );
};

export default Posts;
