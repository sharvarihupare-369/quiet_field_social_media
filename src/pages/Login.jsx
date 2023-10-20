import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  Center,
  Text,
  Image,
  useToast
} from "@chakra-ui/react";

import React, { useEffect, useState} from "react";
import { FaFacebook, FaGoogle } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import { Carousel } from 'react-responsive-carousel';
import ReactDOM from 'react-dom';
import img1 from '../Assests/appimg4.png'
import phoneImg from '../Assests/home-phones.png'
import { useDispatch, useSelector } from "react-redux";
import { googleLogin, login } from "../redux/authentication/action";

const Login = () => {

    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const toast = useToast()
    const location = useLocation()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const userToken = JSON.parse(localStorage.getItem("social-token")) 
    // console.log(userToken)
    const { loginmsg,errmsg,token,isAuth,username } = useSelector(store=>store.authReducer)

    const handleLogin =  async(e) => {
         e.preventDefault()
         const userDetails = {
            email,
            password
         }
           dispatch(login(userDetails))
           
    }

    useEffect(()=>{
      if(userToken?.token){
        toast({
          title: `${userToken?.username} Logged in Successfully`,
          // description: "We've created your account for you.",
          status: 'success',
          duration: 3000,
          isClosable: true,
          position : "top"
        })
        setTimeout(()=>{
          navigate("/")
        },3000)
        return
      }
    if(errmsg){
      toast({
        title: 'Login failed failed!',
        description: errmsg,
        status: 'error',
        duration: 3000,
        isClosable: true,
        position:"top"
      })
    }      
    },[userToken,errmsg])


  return (
    <Box w="90%" p="10px" m="30px">
      <Flex w="100%" alignItems={"center"}>
        <Box w="40%">
        {/* carousal goes here */}
          <Image w="100%" src={phoneImg} />
        </Box>
        <Box position={"relative"} right={"320px"} bottom={"20px"} w="22%">
        {/* carousal goes here */}
          <Image w="100%" src={img1} />
        </Box>

        <Box w="35%"  >
        <Box boxShadow="rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px" p="20px 50px">

          <Box mt="20px">
            <Heading>Sociout</Heading>
          </Box>
          <Box>
            <form onSubmit={handleLogin}>
              <Box mt="30px">
                <Input
                  value={email}
                  onChange={(e)=>setEmail(e.target.value)}
                  type="email"
                  placeholder="Enter your email"
                  borderRadius={"none"}
                />
              </Box>
              <Box mt="30px">
                <Input
                 value={password}
                  onChange={(e)=>setPassword(e.target.value)}
                  type="password"
                  placeholder="Enter your password"
                  borderRadius={"none"}
                />
              </Box>
              <Button
                w="100%"
                colorScheme="blue"
                mt="30px"
                borderRadius={"10px"}
                type="submit"
              >
                Log in
              </Button>
            </form>
          </Box>
          <Box mt="20px">
            <Heading size="sm">OR</Heading>
          </Box>
          <Center>
            <Button
            //   w={"full"}
            //   maxW={"md"}
             w="100%"
              colorScheme={"facebook"}
              leftIcon={<FaFacebook />}
            >
              <Center>
                <Text>Continue with Facebook</Text>
              </Center>
            </Button>
          </Center>
          <Center mt="10px" mb="10px">
            <Button
            //   w={"full"}
            //   maxW={"md"}
             w="100%"
              // colorScheme={"google"}
              leftIcon={<FaGoogle />}
              // onClick={handleGoogleLogin}
            >
              <Center>
                <Text>Continue with 
                <span style={{color:"#4285F4",marginLeft:"5px"}}>G</span>
                <span style={{color:"#DB4437"}}>o</span>
                <span style={{color:"#F4B400"}}>o</span>
                <span style={{color:"#4285F4"}}>g</span>
                <span style={{color:"#0F9D58"}}>l</span>
                <span style={{color:"#DB4437"}}>e</span>
                </Text>
              </Center>
            </Button>
          </Center>
          {/* <GoogleLoginButton
        onSuccess={handleGoogleLoginSuccess}
        onFailure={handleGoogleLoginFailure}
      /> */}
          <Text >Forgotten your Password?</Text>
        </Box>
        <Box boxShadow="rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px" mt="20px" p="20px 50px">
        <Text >Don't have an account?</Text>
        <Link to="/signup">Sign up</Link>
      </Box>    
        </Box>
      </Flex>
     
    </Box>
  );
};

export default Login;
