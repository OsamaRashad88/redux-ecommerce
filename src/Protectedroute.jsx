import React, { useContext } from 'react'
import { logincontext } from './Logincontext'
import Login from './Login'
import { Navigate } from 'react-router-dom'

export default function Protectedroute(props) {
    const {logged}=useContext(logincontext)
  return (
    <>{logged ? props.children : <Navigate to='/login' />} </>
  )
}
