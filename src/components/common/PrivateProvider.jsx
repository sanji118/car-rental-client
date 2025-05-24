import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const PrivateProvider = ({children}) => {
    const {user, loading} = useAuth()
    if(loading){
        return <span className="loading loading-spinner loading-md"></span>
    }
    if(user){
        return children;
    }
  return (
    <Navigate to='/login'></Navigate>
  )
}

export default PrivateProvider