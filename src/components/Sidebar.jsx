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
} from "@chakra-ui/react";
import {
  FiHome,
  FiTrendingUp,
  FiCompass,
  FiStar,
  FiSettings,
  FiMenu,
} from "react-icons/fi";
import { CgProfile } from "react-icons/cg";
import { AiOutlinePlus } from "react-icons/ai";
import React, { useState } from "react";
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
  const [postImg,setPostImg] = useState("")
  const [caption,setCaption] = useState("")

  const handleCreate = (e) => {
    e.preventDefault()
    const postdetails = {
       image : postImg,
       content : caption
    }
    console.log(postdetails)
  }
  return (
    <Box
      //  bg={useColorModeValue('white', 'gray.900')}
      bg="#212121"
      color="white"
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
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
          <form onSubmit={handleCreate}>
          <ModalHeader>Create Post!</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>

            <FormControl>
              <FormLabel>Post</FormLabel>
              <Input type='file' value={postImg}  onChange={(e)=>setPostImg(e.target.value)} />
            </FormControl>
            {/* <form action="/profile" method="post" >
              <input type="file" name="avatar" />
            </form> */}

            <FormControl mt={4}>
              <FormLabel>Caption</FormLabel>
              <Input type="text" value={caption}  onChange={(e)=>setCaption(e.target.value)} placeholder="caption" />
            </FormControl>

          </ModalBody>

          <ModalFooter>
            <Button type="submit" colorScheme="blue" mr={3}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
          </form>
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
    </Box>
  );
};
export default Sidebar;
