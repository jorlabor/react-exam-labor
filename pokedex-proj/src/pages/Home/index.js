import React, { useEffect, useState } from 'react'
import { collection, doc, getDoc, getDocs, deleteDoc, setDoc, addDoc } from 'firebase/firestore'
import { db } from '../../http/firebase'
import PInput from '../../components/atoms/PInput'
import PHeading from '../../components/atoms/PHeading'
import Card from '../../components/molecules/Card'
import { Container,Flex, IconButton, useDisclosure } from '@chakra-ui/react'
import { AddIcon } from '@chakra-ui/icons'
import AddModal from '../../components/molecules/AddModal'
import { useNavigate } from 'react-router-dom'
import Profile from '../Profile'

export default function Home() {
    // axios setup
    const axios = require('axios');

    // firestore collection name
    const col = 'pokemon'

    const navigate = useNavigate()

    const colorType = {
        grass : 'lightgreen',
        poison: 'purple',
        fire: 'orange',
        flying: 'violet',
        water: 'blue',
        bug: 'green',
        fairy: 'pink',
        ice: 'cyan',
        steel : 'silver',
        normal: 'gray'
    }
    
    const [pokemon, setPokemon] = useState([]) // store data from api
    const [pokemonFirestore, setPokemonFirestore] = useState([]) // store data from firestore
    // console.log(pokemon)
    const { isOpen, onOpen, onClose } = useDisclosure()

    // To select current pokemon selection
    const [currentId, setCurrentId] = useState((pokemon[0] && pokemon[0].id) || "")

    /**
     * Function to get all pokemon data from API
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

    // Get all pokemon data from firestore
    const getPokemonFirestore = async () => {
        const querySnapshot = await getDocs(collection(db,col))
        const pokemons = []
        querySnapshot.forEach((doc) => {
            pokemons.push({
                id: doc.id,
                ...doc.data(),
            })
        })
        setPokemonFirestore(pokemons)
    }

    const toPokeProfile = () => {
        debugger
        navigate('/pokeProfile', {state: {pokemon, pokemonFirestore}})
    }
    // Useeffect to get pokemon data at the first of the render
    useEffect(() => {
        getAllPokemon()
        getPokemonFirestore()
    },[])

    const pokemonCards = pokemon.map(poke => 
        <Card 
            poke={poke}
            cardName='pokemonCard'
            key={poke.id} 
            id={poke.id} 
            src={poke.sprites.other["official-artwork"].front_default}
            name={poke.name}
            types={poke.types}
            colorType={colorType}
            toPokeProfile={toPokeProfile}
        />
    )

    const firestoreCards = pokemonFirestore.map(poke => 
        <Card 
            poke={poke}
            cardName='firestoreCard'
            key={poke.id} 
            id={poke.id} 
            src='./images/cat.jpg'
            name={poke.pokemonName}
            types={poke.pokemonType}
            colorType={colorType}
            toPokeProfile={toPokeProfile}
        />
    )
    
    return (
        <Container padding={5} bgColor='red'>
            <AddModal isOpen={isOpen} onClose={onClose} col={col} pokemonFirestore={pokemonFirestore} setPokemonFirestore={setPokemonFirestore}/>
            <Flex direction='column' alignItems='center' bgColor='white' borderRadius={6}>
                <PHeading name='title' size='4xl' margin='5'>Pokédex</PHeading>
                <Flex gap='3'>
                    <PInput placeholder='Search Pokémon' borderRadius='3'/>
                    <IconButton aria-label='Add Pokemon' onClick={onOpen} icon={<AddIcon />} />
                </Flex>
            </Flex>
            <Flex padding={5} bgColor='white' direction='column'>
                {pokemonCards}
                {firestoreCards}
            </Flex>
        </Container>
    )
}