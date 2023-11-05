import { Box, Divider, Input, useDisclosure } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
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
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import {  BiHeart } from "react-icons/bi";
import {  BsReply } from "react-icons/bs";
import { getAllUsers } from "../redux/authentication/action";
import {
  addnewComment,
  getComments,
  postReplies,
} from "../redux/comments/action";
import { FaRegComment } from "react-icons/fa";
import { AddIcon } from "@chakra-ui/icons";
import { allProfiles } from "../redux/profile/action";

const Posts = () => {
  const dispatch = useDispatch();
  const token = JSON.parse(localStorage.getItem("social-token")) || "";
  const { posts, isLiked } = useSelector((store) => store.postReducer);
  const { comments, isCommentAdded } = useSelector(
    (store) => store.commentReducer
  );
  const { isOpen, onOpen, onClose } = useDisclosure();
  let liked =
    JSON.parse(localStorage.getItem("isLiked")) ||
    new Array(posts?.length).fill(false);
  const [likedArr, setLikedArr] = useState(liked);
  const { allusers } = useSelector((store) => store.authReducer);
  const { allusersProfile } = useSelector((store) => store.profileReducer);
  const [replyInput, setReplyInput] = useState(false);
  const [replyContent, setReplyContent] = useState("");
  const [reply,setReply] = useState(false)
  const [openModal, setOpenModal] = useState(false);
  const [singlePost, setSinglePost] = useState({});
  const [newComment, setNewComment] = useState("");
  const [replyId,setReplyId] = useState(null)
  const [profileimage,setProfileimage] = useState("")
  const profileImage = localStorage.getItem("profileImage") || ""
  // console.log(profileImage)


  // console.log(allusersProfile)
  // console.log(posts)

  useEffect(()=>{
    posts?.map((el)=>{
      allusersProfile?.map((element)=>{
        if(element.user == el.author._id){
          setProfileimage(element.profileImage)
        } 
      })
    })
  
  },[])
  // console.log(profileimage)

  const handleLike = async (id, i) => {
    const updatedLiked = [...liked];
    if (!liked[i]) {
      await dispatch(postLike(id, token?.token));
      updatedLiked[i] = true;
    } else {
      // liked[i] = !liked[i]
      await dispatch(postUnLike(id, token?.token));
      updatedLiked[i] = false;
      //  liked[i] = !liked[i]
      //  localStorage.setItem("isLiked", JSON.stringify(liked));
      //  await dispatch(getPosts());
    }
    setLikedArr(updatedLiked);

    localStorage.setItem("isLiked", JSON.stringify(updatedLiked));
    await dispatch(getPosts());
  };

  

  useEffect(() => {
    dispatch(getAllUsers());
  }, [token?.token]);

  useEffect(()=>{
    dispatch(allProfiles())
  },[])

  useEffect(() => {
    dispatch(getPosts());
  }, []);

  let name = "";
  let singlePostName = ""

  const handleComments = (id) => {
    onOpen();
    const postID = posts?.find((el) => el._id === id);
    setSinglePost(postID);

    dispatch(getComments(id))
  };

  const handleAddComment = (postId, e) => {
    e.preventDefault();
    if (newComment) {
      dispatch(addnewComment(postId, { content: newComment }, token?.token));
      setNewComment("");
      
    }
  };

  useEffect(()=>{
    if(isCommentAdded){
      dispatch(getComments(singlePost?._id));
    }
  },[dispatch,isCommentAdded])

  const handleAddReply = (e,postId, commentId) => {
    e.preventDefault()
    dispatch(
      postReplies(postId, commentId, { content: replyContent }, token?.token)
    );
  };

  const handleReplyStatus = (id) => {
    setReply(!reply)
    setReplyId(id)
  }

  return (
    
    <Flex w="80%"  justifyContent={"center"} pos={"absolute"} right={0}>
    <Box>
      
      {posts
        ?.map((post, ind) => {
          {
            /* console.log(post) */
          }
          {
            allusers.map((el) => {
              if (el._id == post.author._id) {
                name = el.fullname;
              }
            });
          }

          {/* const imageUrl = `https://drab-erin-cuttlefish-wear.cyclic.app${post?.image}`; */}
          const imageUrl = `https://socialmediabackend-w824.onrender.com${post?.image}`;
          const profileImageUrl = `https://socialmediabackend-w824.onrender.com${profileimage}`;
          {/* const imageUrl = `https://rose-zealous-quail.cyclic.app${post?.image}`; */}
          return (
            <Flex key={post._id} justifyContent={"center"}>
              <Card mt="20px" maxW="md">
                <CardHeader>
                  <Flex spacing="4">
                    <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
                      <Avatar objectFit={"contain"} name={name} src={profileImage} />

                      <Box>
                        <Heading size="md">{name}</Heading>
                      </Box>
                    </Flex>
                  </Flex>
                </CardHeader>

                <Image objectFit="cover" src={imageUrl} alt="postImage" />
                <CardBody>
                  <Text textAlign={"left"} fontWeight={"600"} fontSize={"20px"}>
                    {post.content}
                  </Text>
                </CardBody>

                <CardFooter
                display={"flex"}
                gap="10px"

                  // justify="space-between"
                  // flexWrap="wrap"
                  // sx={{
                  //   "& > button": {
                  //     minW: "136px",
                  //   },
                  // }}
                >
                  <Button
                    colorScheme={likedArr[ind] ? "red" : "gray"}
                    onClick={() => handleLike(post._id, ind)}
                    variant="ghost"
                    // leftIcon={}
                    _active={'none'}
                    _hover={'none'}
                  >
                    {/* {post?.likes?.length !== 0 ? post?.likes?.length : ""}{" "}
                    {post?.likes?.length === 1 ? "Like" : "Likes"} */}
                    <BiHeart style={{fontSize:"27px"}} />
                  </Button>
                  <Button
                    // w="10px"
                    onClick={() => handleComments(post?._id)}
                    // onClick={onOpen}
                    variant="ghost"
                    // leftIcon={}
                    _active={'none'}
                    _hover={'none'}
                  ><FaRegComment style={{fontSize:"21px"}}  /></Button>

                  <Modal
                    style={{ height: "500px" }}
                    size="6xl"
                    isOpen={isOpen}
                    onClose={onClose}
                  >
                    <ModalOverlay />
                    <ModalContent>
                      <ModalCloseButton />
                      <ModalBody>
                        <Flex>
                          <Box p="20px 0px" h="500px" w="50%">
                            <Image
                              h="100%"
                              w="100%"
                              src={`https://socialmediabackend-w824.onrender.com${singlePost?.image}`}
                            />
                          </Box>

                          <Box w="1px" p="0 10px">
                            <Divider
                              colorScheme="whiteAlpha"
                              orientation="vertical"
                            />
                          </Box>

                          <Box p="20px 0px" w="50%">
                            <Box
                              h="100%"
                              display={"flex"}
                              flexDirection={"column"}
                              justifyContent={"space-between"}
                            >
                            {
                                allusers?.map((el)=>{
                                  {/* console.log(el) */}
                                  {/* console.log(singlePost) */}
                                  if (el._id == singlePost?.author?._id) {
                                   singlePostName = el.fullname;
                                  }
                                })
                            }
                              <Box>
                                <Flex alignItems={"center"} gap="5px">
                                  <Avatar  name={singlePostName}  src={profileImageUrl} />
                                  <Text>{singlePostName}</Text>
                                </Flex>
                                <Box mt="6px">
                                  <hr />
                                </Box>
                              </Box>

                              <Box overflowY={"scroll"} h={"350px"} mt="10px">
                                {singlePost?.comments?.map((el) => {
                                  {
                                    /* console.log(el) */
                                  }
                                  return (
                                    <Box key={el._id}>
                                      <Flex m="5px" alignItems={"center"}>
                                        <Avatar
                                          mr="5px"
                                          size={"sm"}
                                          name={el.name}
                                       
                                        />

                                        <Text
                                          fontWeight={600}
                                          textTransform={"lowercase"}
                                          fontSize={"15px"}
                                        >
                                          {el.name.split(" ")[0]}
                                        </Text>
                                        <Text ml="3px" textAlign={"left"}>
                                          {el.content}
                                        </Text>
                                      </Flex>
                                      <Box
                                      onClick={()=>handleReplyStatus(el?._id)}
                                        cursor={"pointer"}
                                        w="22%"
                                        textAlign={"center"}
                                      >
                                        <Text  fontSize={"12px"} color={"gray"}>
                                          Reply
                                        </Text>
                                      </Box>
                                    </Box>
                                  );
                                })}
                              </Box>

                              <Box>
                                <Box>
                                  <hr />
                                </Box>
                                
                                 {
                                    reply ? <form onSubmit={(e)=>handleAddReply(e,post?._id,replyId)}>
                                    <Flex  mt="5px" alignItems={"center"}>
                                    <Input
                                      type="text"
                                      value={replyContent}
                                      onChange={(e) =>
                                        setReplyContent(e.target.value)
                                      }
                                      variant={"unstyled"}
                                      _placeholder={{
                                        color: "gray",
                                      }}
                                      placeholder="Add a reply..."
                                    />
                                    <Button type="submit">
                                      <BsReply style={{fontSize:"20px"}} />
                                    </Button>
                                  </Flex>
                                    </form> :
                                  <form
                                  onSubmit={(e) =>
                                    handleAddComment(singlePost?._id, e)
                                  }
                                >
                                  <Flex  mt="5px" alignItems={"center"}>
                                    <Input
                                      type="text"
                                      value={newComment}
                                      onChange={(e) =>
                                        setNewComment(e.target.value)
                                      }
                                      variant={"unstyled"}
                                      _placeholder={{
                                        color: "gray",
                                      }}
                                      placeholder="Add a comment..."
                                    />
                                    <Button type="submit">
                                      <AddIcon />
                                    </Button>
                                  </Flex>
                                </form>
                                 }
                              </Box>
                            </Box>
                          </Box>
                        </Flex>
                      </ModalBody>
                    </ModalContent>
                  </Modal>

                  
                </CardFooter>
              </Card>
            </Flex>
          );
        })
        .reverse()}
        
    </Box>
    </Flex>
  );
};

export default Posts;
