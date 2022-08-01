import React from 'react'
import PImage from '../../atoms/PImage'
import PText from '../../atoms/PText'
import { Flex, Box } from '@chakra-ui/react'

export default function Card(props) {
    // console.log(props.types)
    const selectColor = (type) => {
        switch(type) {
            case 'poison':
                return props.colorType.poison
            case 'fire':
                return props.colorType.fire
            case 'grass':
                return props.colorType.grass
            case 'water':
                return props.colorType.water
            case 'bug':
                return props.colorType.bug
            case 'flying':
                return props.colorType.flying
            default:
                return props.colorType.flying
        }
    }

    const type = props.types.map((type, i) => <Box key={i} p='1' bgColor={selectColor(type.type.name)} borderRadius={8} color='white'>{type.type.name}</Box>)
    
    return (
        
        <Flex padding={1} bgColor='white' basis='100%' direction='column'>
            <PImage src={props.src} bgColor='#f2f2f2'/>
            <Flex direction='column'>
                <PText size='sm' color='#313131'>#{props.id}</PText>
                <PText size='2xl'>{props.name}</PText>
                <Flex gap={2}>
                    {type}
                </Flex>
            </Flex>
        </Flex>
    )
}