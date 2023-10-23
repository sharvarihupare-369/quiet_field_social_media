import {
  Box,
  Button,
  Container,
  Heading,
  Image,
  Input,
  Text,
  Avatar,
  Grid,
  GridItem,
  Flex,
  HStack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deletePost,
  getPosts,
  getparticularPosts,
} from "../redux/posts/action";
import axios from "axios";
import { BiHeart } from "react-icons/bi";
import { FiDelete, FiEdit } from "react-icons/fi";
import { BsFillCameraFill } from "react-icons/bs";
import Sidebar from "../components/Sidebar";
import { addProfile, getProfile } from "../redux/profile/action";

const Profile = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  
  const userData = JSON.parse(localStorage.getItem("social-token")) || "";
  const token = userData?.token;
  const dispatch = useDispatch();
  const { profileposts } = useSelector((store) => store.postReducer);
  const { getprofile } = useSelector((store) => store.profileReducer);
  const [hoverIcon, setHoverIcon] = useState(false);
  const [profiledata, setProfiledata] = useState({
    username: "",
    bio: "",
    location: "",
    website: "",
    profileImage: "",
  });
  // console.log(hoverIcon);
  // console.log(getprofile)

  useEffect(() => {
    // dispatch(getProfile(userData?.token))
    dispatch(getparticularPosts(userData?.token));
  }, []);

  const handleDelete = (id, token) => {
    dispatch(deletePost(id, token));
    dispatch(getparticularPosts(token));
    dispatch(getPosts());
  };

  useEffect(() => {
    dispatch(getProfile(userData?.token));
  }, []);

  const handleProfileChange = (e) => {
    setProfiledata({ ...profiledata, [e.target.name]: e.target.value });
  };

  const handleAddProfile = (e) => {
    e.preventDefault();
    // console.log(profiledata)
    dispatch(addProfile(profiledata, token));
    dispatch(getProfile(userData?.token));
    setProfiledata({
    username: "",
    bio: "",
    location: "",
    website: "",
    profileImage: "",
    })
  };

  // console.log(getprofile)
  // const imageUrl = `https://drab-erin-cuttlefish-wear.cyclic.app${getprofile?.profileImage}`;
  const imageUrl = `https://socialmediabackend-w824.onrender.com${getprofile?.profileImage}`;
  localStorage.setItem("profileImage",imageUrl)
  return (
    //   <Box>

    <Flex justifyContent={"space-between"}>
      <Sidebar />
      <Box
        w="80%"
        justifyContent={"center"}
        pos={"absolute"}
        right={0}
        p="20px"
      >
        <Flex  gap="50px" alignItems={"center"}>
          <Box
            // onClick={()=>handleChangeProfileImage()}
            pos={"relative"}
            borderRadius={"50%"}
            // border="1px solid red"
            onMouseEnter={() => setHoverIcon(true)}
            onMouseLeave={() => setHoverIcon(false)}
          >
            <Avatar
              _hover={{ opacity: "0.3" }}
              size="2xl"
              name={getprofile.profileImage}
              src={imageUrl}
            />
            {hoverIcon ? (
              <BsFillCameraFill
                style={{
                  color: "rgb(55, 71, 79)",
                  fontSize: "30px",
                  position: "absolute",
                  bottom: "8px",
                  left: "26px",
                  opacity:"0.6"
                }}
              />
            ) : (
              ""
            )}
          </Box>
          <Box>
            <Flex w="100%" justifyContent={"space-between"}>
              <Text textAlign={"left"} fontWeight={600} fontSize={"20px"}>
                {getprofile.username}
              </Text>
              <Button p="0px 20px" borderRadius={"20px"} onClick={onOpen}>
                Profile
              </Button>
            </Flex>
            <HStack m="15px 0px" gap="30px">
              <Text fontWeight={600} fontSize={"18px"}>
                {profileposts?.posts?.length}{" "}
                <span style={{ fontWeight: 400 }}>posts</span>{" "}
              </Text>
              <Text fontWeight={600} fontSize={"18px"}>
                {getprofile?.followers?.length}{" "}
                <span style={{ fontWeight: 400 }}>followers</span>{" "}
              </Text>
              <Text fontWeight={600} fontSize={"18px"}>
                {getprofile?.following?.length}{" "}
                <span style={{ fontWeight: 400 }}>following</span>{" "}
              </Text>
            </HStack>
            <Text textAlign={"left"} fontWeight={600}>
              {userData?.username}
            </Text>
            <Text textAlign={"left"}>{getprofile?.bio}</Text>
          </Box>
        </Flex>

        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Add your profile</ModalHeader>
            <ModalCloseButton />
            <form onSubmit={handleAddProfile}>
              <ModalBody pb={6}>
                <FormControl>
                  <Input
                    type="text"
                    name="username"
                    value={profiledata.username}
                    // onChange={handleProfileChange}
                    onChange={(e) => setProfiledata({ ...profiledata, username: e.target.value })}
                    // onChange={(e)=>setProfiledata.username(e.target.value)}
                    placeholder="Username"
                  />
                </FormControl>

                <FormControl mt={4}>
                  <Input
                    type="text"
                    name="bio"
                    value={profiledata.bio}
                    // onChange={handleProfileChange}
                    onChange={(e) => setProfiledata({ ...profiledata, bio: e.target.value })}
                    // onChange={(e)=>setProfiledata.bio(e.target.value)}
                    placeholder="Bio"
                  />
                </FormControl>

                <FormControl mt={4}>
                  <Input
                    type="text"
                    name="location"
                    value={profiledata.location}
                    // onChange={handleProfileChange}
                    onChange={(e) => setProfiledata({ ...profiledata, location: e.target.value })}
                    // onChange={(e)=>setProfiledata.website(e.target.value)}
                    placeholder="Location"
                  />
                </FormControl>

                <FormControl mt={4}>
                  <Input
                    type="text"
                    name="website"
                    value={profiledata.website}
                    // onChange={handleProfileChange}
                    onChange={(e) => setProfiledata({ ...profiledata, website: e.target.value })}
                    // onChange={(e)=>setProfiledata.website(e.target.value)}
                    placeholder="Website"
                  />
                </FormControl>

                {/* <Input type="file" accept="image/*"  onChange={(e)=>setImage(e.target.files[0])} /> */}
                <FormControl mt={4}>
                  <Input
                    type="file"
                    name="profileImage"
                    accept="profileImage/*"
                    // value={profiledata.profileImage}
                    // onChange={(e)=>setProfiledata.profileImage(e.target.files[0])}
                    onChange={(e) => setProfiledata({ ...profiledata, profileImage: e.target.files[0] })}
                    placeholder="ProfileImage"
                  />
                </FormControl>
              </ModalBody>

              <ModalFooter>
                <Button type="submit" bg="#212121" color={"white"} mr={3}>
                  Add
                </Button>
                {/* <Button onClick={onClose}>Cancel</Button> */}
              </ModalFooter>
            </form>
          </ModalContent>
        </Modal>

        <Box mt="20px">
          <hr />
        </Box>

        <Grid
          w="100%"
          //  border={"1px solid red"}
          m="40px 0px"
          gap="5px"
          gridTemplateColumns={"repeat(3,1fr)"}
        >
          {profileposts?.posts?.map((post) => {
            const imageUrl = `https://socialmediabackend-w824.onrender.com${post?.image}`;
            {
              /* console.log(post) */
            }
            return (
              <Box
                key={post._id}
                boxShadow="rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px"
              >
                <Image h="300px" objectFit={"cover"} w="100%" src={imageUrl} />
                {/* <Text textAlign={"left"} fontWeight={"600"} fontSize={"18px"}>
                  {post?.content}
                </Text> */}
                {/* <Flex gap="10px" mt="10px"> */}
                {/* <Button
                    w="full"
                    colorScheme="red"
                    leftIcon={<BiHeart />}
                  ></Button> */}
                {/* <Button
                    w="full"
                    colorScheme="blue"
                    leftIcon={<FiEdit />}
                  ></Button>
                  <Button
                    w="full"
                    colorScheme="gray"
                    onClick={() => handleDelete(post?._id)}
                    leftIcon={<FiDelete />}
                  ></Button> */}
                {/* </Flex> */}
              </Box>
            );
          })}
        </Grid>
      </Box>
    </Flex>

    //   </Box>
  );
};

export default Profile;
