import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { TokenContext } from '../../context/Token.context'

export default function ProtectedRoutes({children}) {

    let {token} = useContext(TokenContext)

    if(token){
        return children
    }else{
       return <Navigate to={'/login'} />
    }




}
