import React from 'react'
import { Input } from '@chakra-ui/react'

export default function PInput(props) {
    return (
        <Input 
        placeholder={props.placeholder} 
        borderRadius={props.borderRadius}/>
    )
} 