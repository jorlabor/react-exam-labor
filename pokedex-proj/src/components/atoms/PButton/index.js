import React from 'react'
import { Button } from '@chakra-ui/react'

export default function PButton(props) {
    return (
        <Button>{props.children}</Button>
    )
}