import React from 'react'
import { Image } from '@chakra-ui/react'

export default function PImage(props) {
    return (
        <Image src={props.src} bgColor={props.bgColor} onClick={props.onClick}/>
    )
}