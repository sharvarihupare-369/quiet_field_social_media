import React, { useEffect, useState } from 'react'
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
  import { FaFacebook } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
  import { useDispatch, useSelector } from "react-redux";
import { signup } from '../redux/authentication/action';

const Signup = () => {
    const dispatch = useDispatch()
    const { signupmsg,errmsg } = useSelector(store=>store.authReducer)
    const toast = useToast()
    const navigate = useNavigate()
    const [formdata,setFormdata] = useState({
        fullname:"",
        age:"",
        email:"",
        password:""
    })


    const handleChange = (e) => {
        const {value,name} = e.target;
        setFormdata({...formdata,[name] : value})
    }

    const handleSignup = (e) => {
        e.preventDefault()
        dispatch(signup(formdata))
    }


    useEffect(()=>{
      if(signupmsg){
        toast({
          title: signupmsg,
          description: "We've created your account for you.",
          status: 'success',
          duration: 3000,
          isClosable: true,
          position : "top"
        })
        setTimeout(()=>{
          navigate("/login")
        })
        return
      }
    if(errmsg){
      toast({
        title: 'Registration failed!',
        description: errmsg,
        status: 'error',
        duration: 3000,
        isClosable: true,
        position:"top"
      })
    }      
    },[signupmsg,errmsg])

  return (
    <Flex justifyContent={"center"} alignItems={"center"} mt="50px">

    <Box w="35%"  >
    <Box boxShadow="rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px" p="20px 50px">

      <Box mt="20px">
        <Heading>Sociout</Heading>
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
      <Box>
        <form onSubmit={handleSignup}>
        <Box mt="30px">
            <Input
             value={formdata.fullname}
             onChange={(e)=>handleChange(e)}
              name="fullname"
              type="text" 
              placeholder="FullName"
              borderRadius={"none"}
            />
          </Box>
         
          <Box mt="30px">
            <Input
             value={formdata.age}
             onChange={(e)=>handleChange(e)}
              name="age"
              type="text"
              placeholder="Age"
              borderRadius={"none"}
            />
          </Box>
          <Box mt="30px">
            <Input
              value={formdata.email}
              name="email"
              onChange={(e)=>handleChange(e)}
              type="email"
              placeholder="Email"
              borderRadius={"none"}
            />
          </Box>
          <Box mt="30px">
            <Input
            name="password"
             value={formdata.password}
              onChange={(e)=>handleChange(e)}
              type="password"
              placeholder="Password"
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
     
     
     
    </Box>
    <Box boxShadow="rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px" mt="20px" p="20px 50px">
    <Text >Already Registred?</Text>
    <Link to="/login">Login</Link>
  </Box>    
    </Box>
    </Flex>
  )
}

export default Signup