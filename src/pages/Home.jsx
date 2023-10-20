import React from 'react'
import Sidebar from '../components/Sidebar'
import Posts from './Posts'
import { Box, Button, Container, Heading, Input ,Image, Flex} from '@chakra-ui/react'

const Home = () => {
 
  return (
    <>
      
    <Flex >
      <Sidebar/>
      <Posts />
    </Flex>
   
    </>
  )
}

export default Home