import React from 'react'
import Sidebar from '../components/Sidebar'
import Posts from './Posts'
import { Box } from '@chakra-ui/react'

const Home = () => {
  return (
    <Box 

    >
      <Sidebar/>
      <Posts/>
    </Box>
  )
}

export default Home