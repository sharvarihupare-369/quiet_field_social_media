import { Box } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../redux/posts/action";
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
  const { posts } = useSelector((store) => store.postReducer);
  // const { token } = useSelector((store) => store.authReducer);
  const dispatch = useDispatch();
  // console.log(posts)
  const token = localStorage.getItem("social-token") || ""

  useEffect(()=>{
   getAllUsers(token)
  },[token])

  useEffect(() => {
    dispatch(getPosts());
  }, []);

  return (
    <Box>
      {posts.map((post) => {
        {/* console.log(post.author._id) */}
        return (
           <Flex key={post._id} justifyContent={"center"}>
          <Card maxW="md">

            <CardHeader>
              <Flex spacing="4">
                <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
                  <Avatar name='Segun Adebayo' src='https://bit.ly/sage-adebayo' />

                  <Box>
                    <Heading size='sm'>{post.author.username}</Heading>
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
              <Button flex="1" variant="ghost" leftIcon={<BiLike />}>
                Like
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
