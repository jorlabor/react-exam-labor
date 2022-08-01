import React from 'react'
import { Button } from '@chakra-ui/react'

export default function PButton(props) {
    return (
        <Button type={props.type} onClick={props.onClose} mr={props.mr} colorScheme={props.colorScheme}>{props.children}</Button>
    )
}