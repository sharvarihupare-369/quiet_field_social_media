import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './Home'
import Signup from './Signup'
import Posts from './Posts'
import Login from './Login'

const MainRoutes = () => {
  return (
    <Routes>
    <Route path='/' element={<Home/>} />
    <Route path='/signup' element={<Signup/>} />
    <Route path='/login' element={<Login/>} />
    {/* <Route path='/posts' element={<Posts/>} /> */}
    <Route path='*'element={<h1>Page Not Found!</h1>} />
   </Routes>
  )
}

export default MainRoutes