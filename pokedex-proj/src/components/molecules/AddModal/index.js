import React, { useState } from "react";
import PButton from "../../atoms/PButton";
import { collection, doc, getDoc, getDocs, deleteDoc, setDoc, addDoc } from 'firebase/firestore'
import { db } from '../../../http/firebase'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Input,
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    useToast
  } from '@chakra-ui/react'

  
export default function AddModal(props) {
    const toast = useToast()

    const { onClose } = useDisclosure()
    const [formPoke, setFormPoke] = useState({
        pokemonName:'',
        pokemonType:[] // Need create function to slice in delimiter if more than one type has been input
    })

    const handleChange = (e) => {
        const {name, value} = e.target
        setFormPoke({
            ...formPoke,
            [name]: value
        })
    }

    // Add task to firestore
    const addPokemon = async (col_param, doc_param) => {
        try {
            // Add data to database
            const docRef = await addDoc(collection(db, col_param), doc_param)
            // Update pokemon state
            props.setPokemonFirestore(prevTodo => [doc_param, ...prevTodo])
            
            toast({
                title: 'Pokemon Added.',
                description: "We've added the pokemon.",
                status: 'success',
                duration: 5000,
                isClosable: true,
              })
        } catch (error) {
            toast({
                title: 'Pokemon not added',
                description: `${error}`,
                status: 'error',
                duration: 5000,
                isClosable: true,
              })
        }
    }
    
    const handleSubmit = (e) => {
        debugger
        if (!formPoke.pokemonName && !formPoke.pokemonType) {
            return
        }
        e.preventDefault()
        addPokemon(props.col, formPoke)
        // getData()
    }

    return (
        <Modal isOpen={props.isOpen} onClose={props.onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Pokémon</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={handleSubmit}>
            <ModalBody>
                    <FormControl>
                        <FormLabel>Name</FormLabel>
                        <Input name='pokemonName' onChange={handleChange} variant='flushed' placeholder='Enter pokémon name' value={formPoke.pokemonName}/>
                        <FormLabel>Type</FormLabel>
                        <Input name='pokemonType' onChange={handleChange} variant='flushed' placeholder='Enter type' value={formPoke.pokemonType}/>
                    </FormControl>
            </ModalBody>

            <ModalFooter>
                <PButton type='submit' colorScheme='blue' mr={3}>
                    Add
                </PButton>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    )
}