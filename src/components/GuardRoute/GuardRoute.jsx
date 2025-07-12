import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { TokenContext } from '../../context/Token.context'

export default function GuardRoute({children}) {

    const {token} = useContext(TokenContext)
    

    if(token){
        return <Navigate to={'/home'}/>
    }else{
        return children
    }
}
