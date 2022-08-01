import React, { useEffect, useState } from 'react'
import { collection, doc, getDoc, getDocs, deleteDoc, setDoc, addDoc } from 'firebase/firestore'
import { db } from '../../http/firebase'
import PInput from '../../components/atoms/PInput'
import PHeading from '../../components/atoms/PHeading'
import Card from '../../components/molecules/Card'
import { Container,Flex } from '@chakra-ui/react'

export default function Home() {
    // axios setup
    const axios = require('axios');

    const colorType = {
        grass : 'green',
        poison: 'violet',
        fire: 'orange',
        flying: 'gray',
        water: 'blue',
        bug: 'green'
    }
    
    const [pokemon, setPokemon] = useState([])

    /**
     * Function to get all pokemon data
     *
     */
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

    // Useeffect to get pokemon data at the first of the render
    useEffect(() => {
        getAllPokemon()
    },[])

    const pokemonCards = pokemon.map(poke => 
        <Card 
            key={poke.id} 
            id={poke.id} 
            src={poke.sprites.other["official-artwork"].front_default}
            name={poke.name}
            types={poke.types}
            colorType={colorType}
        />
    )
        
    return (
        <Container padding={5} bgColor='red'>
            <Flex direction='column' alignItems='center' bgColor='white' borderRadius={6}>
                <PHeading name='title' size='4xl' margin='5'>Pokédex</PHeading>
                <PInput placeholder='Search Pokémon' borderRadius='3'/>
            </Flex>
            <Flex padding={5} bgColor='white' direction='column'>
                {pokemonCards}
            </Flex>
        </Container>
    )
}