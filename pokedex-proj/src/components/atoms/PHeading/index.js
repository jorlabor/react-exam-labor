import React from 'react'
import { Heading } from '@chakra-ui/react'

export default function PHeading(props) {
    return (
        <Heading className={props.name} size={props.size} m={props.margin}>{props.children}</Heading>
    )
}