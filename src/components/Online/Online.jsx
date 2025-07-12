import React from 'react'
import useOnline from '../../hooks/useOnline'

export default function Online({children}) {

    const {online} = useOnline()

    if(online){
        return children
    }
}
