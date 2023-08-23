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
import { FaFacebook } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import { Carousel } from 'react-responsive-carousel';
import ReactDOM from 'react-dom';
import img1 from '../Assests/appimg4.png'
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/authentication/action";

const Login = () => {

    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const toast = useToast()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { loginmsg,errmsg,token,isAuth } = useSelector(store=>store.authReducer)
    const handleLogin = (e) => {
         e.preventDefault()
         const userDetails = {
            email,
            password
         }
         dispatch(login(userDetails))
    }

    

    useEffect(()=>{
      if(token){
        toast({
          title: loginmsg,
          description: "We've created your account for you.",
          status: 'success',
          duration: 3000,
          isClosable: true,
          position : "top"
        })
        localStorage.setItem("social-token",token)
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
    },[token,errmsg])


  return (
    <Box w="90%" p="10px" m="30px">
      <Flex w="100%" justifyContent={"space-around"} alignItems={"center"}>
        <Box w="20%">{/* carousal goes here */}
        {/* <Carousel w="50%" style={{ backgroundImage: 'url("https://static.cdninstagram.com/images/instagram/xig/homepage/phones/home-phones.png?__makehaste_cache_breaker=HOgRclNOosk")', backgroundSize: 'cover', backgroundPosition: 'center' }}>
                <div>
                    <img src="https://www.instagram.com/images/instagram/xig/homepage/screenshots/screenshot1.png?__d=www" />
                    <p className="legend">Legend 1</p>
                </div>
                <div>
                    <img src="assets/2.jpeg" />
                    <p className="legend">Legend 2</p>
                </div>
                <div>
                    <img src="assets/3.jpeg" />
                    <p className="legend">Legend 3</p>
                </div>
            </Carousel> */}
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
          <Center p={8}>
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
