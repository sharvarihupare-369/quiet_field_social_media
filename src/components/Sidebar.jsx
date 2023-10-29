// import { Box, Flex, Heading,Text } from '@chakra-ui/react'
import {
  IconButton,
  Box,
  CloseButton,
  Flex,
  Icon,
  useColorModeValue,
  Text,
  Drawer,
  DrawerContent,
  useDisclosure,
  BoxProps,
  FlexProps,
  Button,
  Input,
  FormControl,
  FormLabel,
  useEditable,
  Toast,
  useToast,
} from "@chakra-ui/react";
import {
  FiHome,
  FiTrendingUp,
  FiCompass,
  FiStar,
  FiSettings,
  FiMenu,
  FiLogOut,
} from "react-icons/fi";
import { CgProfile } from "react-icons/cg";
import { AiOutlinePlus } from "react-icons/ai";
import React, { useEffect, useState } from "react";
import { IconType } from "react-icons";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { addnewPost, getPosts } from "../redux/posts/action";
import axios from "axios";


const LinkItems = [
  { name: "Home", icon: FiHome, href: "/" },
  { name: "Create", icon: AiOutlinePlus },
  { name: "Trending", icon: FiTrendingUp },
  { name: "Explore", icon: FiCompass },
  { name: "Favourites", icon: FiStar },
  { name: "Profile", icon: CgProfile, href: "/profile" },
];

const Sidebar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast()
  const [image, setImage] = useState("")
  const [caption,setCaption] = useState("")
  const [file,setFile] = useState()
  const [logout,setLogout] = useState(false)
  const dispatch = useDispatch()
  // const [selectedImage, setSelectedImage] = useState(null);
  const token = JSON.parse(localStorage.getItem("social-token")) || ""
  // console.log(token)
  const { isAdded } = useSelector((store) => store.postReducer);
  const { isLoggedOut } = useSelector((store) => store.authReducer);

  const handleUpload = () => {
    const formData = new FormData()
    formData.append('image',image)
    formData.append('content',caption)
    // const formData = {
    //   image,
    //   content : caption
    // }
    // console.log(formData)
    dispatch(addnewPost(formData,token?.token))
    setCaption("")
    setImage("")
    // onClose()
    
  }

  useEffect(()=>{
    dispatch(getPosts())
  },[isAdded])

  const handleLogout = () => {
    if(token?.token){
      // dispatch(logout(token?.token))
      localStorage.removeItem("social-token")
      toast({
        title: `User is Loggedout Successfully`,
        status: 'success',
        duration: 3000,
        position : "top",
        isClosable: true,
      })
      // dispatch(logout())
     setTimeout(()=>{
      window.location.reload()
     },4000)
    }else{
      toast({
        title: `Something went wrong`,
        status: 'error',
        duration: 3000,
        position : "top",
        isClosable: true,
      })
    }
  }


  // useEffect(()=>{
  //   if(logout){
  //     getPosts()
  //     return
  //   }
  // },[logout])

  return (
    <Box
      //  bg={useColorModeValue('white', 'gray.900')}
      bg="#212121"
      color="white"
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      // w={{ base: "full", md: 60 }}
      w="20%"
      pos="fixed"
      zIndex={"overlay"}
      h="100vh"
    >
      <Flex justifyContent={"center"} alignItems={"center"}>
        <Text fontSize={"2xl"} mt="10px" fontWeight={"bold"}>
          Sociout
        </Text>
      </Flex>

      <Box
        as="a"
        href="/"
        style={{ textDecoration: "none" }}
        _focus={{ boxShadow: "none" }}
      >
        <Flex
          align="center"
          p="4"
          mx="4"
          borderRadius="lg"
          role="group"
          cursor="pointer"
          _hover={{
            bg: "cyan.400",
            color: "white",
          }}
        >
          <IconButton
            mr="4"
            fontSize="16"
            _groupHover={
              {
                // color: 'white',
              }
            }
            icon={<FiHome />}
          />
          Home
        </Flex>
      </Box>
      <Box
        as="a"
        onClick={onOpen}
        style={{ textDecoration: "none" }}
        _focus={{ boxShadow: "none" }}
      >
        <Flex
          align="center"
          p="4"
          mx="4"
          borderRadius="lg"
          role="group"
          cursor="pointer"
          _hover={{
            bg: "cyan.400",
            color: "white",
          }}
        >
          <IconButton
            mr="4"
            fontSize="16"
            _groupHover={
              {
                // color: 'white',
              }
            }
            icon={<AiOutlinePlus />}
          />
          Create
        </Flex>
      </Box>

      <Modal p="20px" isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create Post!</ModalHeader>
          <ModalCloseButton />
          {/* <form onSubmit={handleCreate} > */}
          <ModalBody pb={6}>

            <FormControl>
              <FormLabel>Post</FormLabel>
           
              <Input type="file" accept="image/*"  onChange={(e)=>setImage(e.target.files[0])} />
              {/* <Input type="file" accept='.jpg,.png,.jpeg,.avif' onChange={(e)=>setImage(e.target.files[0])} /> */}
            </FormControl>
           
            <FormControl mt={4}>
              <FormLabel>Caption</FormLabel>
              <Input type="text" value={caption}  onChange={(e)=>setCaption(e.target.value)} placeholder="caption" />
            </FormControl>

          </ModalBody>
          <ModalFooter>
            <Button onClick={handleUpload} colorScheme="blue" mr={3}>
              Upload
            </Button>
            {/* <Button  onClick={onClose}>Cancel</Button> */}
          </ModalFooter>
       
        </ModalContent>
      </Modal>

      <Box
        as="a"
        href="/profile"
        style={{ textDecoration: "none" }}
        _focus={{ boxShadow: "none" }}
      >
        <Flex
          align="center"
          p="4"
          mx="4"
          borderRadius="lg"
          role="group"
          cursor="pointer"
          _hover={{
            bg: "cyan.400",
            color: "white",
          }}
        >
          <IconButton
            mr="4"
            fontSize="16"
            _groupHover={
              {
                // color: 'white',
              }
            }
            icon={<CgProfile />}
          />
          Profile
        </Flex>
        

        
      </Box>

      <Box
      onClick={handleLogout}
        as="a"
        // href="/"
        style={{ textDecoration: "none" }}
        _focus={{ boxShadow: "none" }}
      >
        <Flex
          align="center"
          p="4"
          mx="4"
          borderRadius="lg"
          role="group"
          cursor="pointer"
          _hover={{
            bg: "cyan.400",
            color: "white",
          }}
        >
          <IconButton
            mr="4"
            fontSize="16"
            
            icon={<FiLogOut />}
          />
          Logout
        </Flex>
      </Box>
        {/* <Button mt="330px" w="90%" >Logout</Button> */}
    </Box>
  );
};
export default Sidebar;
