import React, { useEffect, useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Home from './Home'
import Signup from './Signup'
import Posts from './Posts'
import Login from './Login'
import Profile from './Profile'
import axios from 'axios'
import PrivateRoutes from '../components/PrivateRoutes'

const MainRoutes = () => {
  return (
    <Routes>
    <Route  path='/' element={
      <PrivateRoutes>
       <Home/> 
      </PrivateRoutes>
     } />
    <Route path='/signup' element={<Signup/>} />
    <Route  path='/login' element={<Login />} />
    <Route path='/posts' element={<Posts/>} />
    <Route path='/profile' element={<Profile/>} />
    <Route path='*'element={<h1>Page Not Found!</h1>} />
   </Routes>
  )
}

export default MainRoutes