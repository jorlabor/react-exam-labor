import React from 'react'
import { Text } from '@chakra-ui/react'
export default function PText(props) {
    return (
        <Text fontSize={props.size} color={props.color}>{props.children}</Text>
    )
}