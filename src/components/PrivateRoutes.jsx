import React from 'react'
import { Navigate, useLoaderData, useLocation } from 'react-router-dom'

const PrivateRoutes = ({children}) => {
  const location = useLocation()
  const token = localStorage.getItem("social-token") || ""
  return token ? children : <Navigate state={location.pathname} replace={true} to="/login"  />
}

export default PrivateRoutes