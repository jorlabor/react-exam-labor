import React, { useEffect, useState } from 'react'
import { collection, doc, getDoc, getDocs, deleteDoc, setDoc, addDoc } from 'firebase/firestore'
import { db } from '../../http/firebase'
import { Container,Flex, IconButton, useDisclosure } from '@chakra-ui/react'
import PImage from '../../components/atoms/PImage';
import PText from '../../components/atoms/PText';


export default function Profile(props) {
    const axios = require('axios');
    const [pokemon, setPokemon] = useState([])

    async function getAllPokemon() {
        try {
            const response = await axios.get('https://pokeapi.co/api/v2/pokemon/');
            const pokemonData = response.data.results
            const detail = pokemonData.map( pokemon => axios.get(pokemon.url))
            const responseDetail = await Promise.all(detail)
            const pokemonDetail = responseDetail.map(item=>item.data)
            setPokemon(pokemonDetail)
            
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getAllPokemon()
    },[])

    console.log(pokemon)

    return (
        <Container>
            <Flex direction='column'>
                <PImage src={pokemon[0].sprites.other["official-artwork"].front_default} bgColor='#f2f2f2'/>
                <Flex direction='column'>
                    <PText size='sm' color='#313131'>#{pokemon[0].id}</PText>
                    <PText size='2xl' textTransform='capitalize'>{pokemon[0].name}</PText>
                    <Flex gap={2}>
                        {pokemon[0].types[0].type.name}
                    </Flex>
                </Flex>
            </Flex>
        </Container>
    )
}