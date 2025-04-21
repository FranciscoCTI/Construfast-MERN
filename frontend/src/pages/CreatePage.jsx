import { React, useState } from 'react'
import { Box, Button, Container, Heading, useColorModeValue, VStack, Input, HStack, Stack, useToast } from '@chakra-ui/react';
import { useServiceProviderStore } from '../store/serviceProvider';
import { CiTrophy } from 'react-icons/ci';

export const CreatePage = () => {
    const [newServiceProvider, setNewServiceProvider] = useState({
        name: 'New service provider',
        image: '',
        city: '',
        phone: '',
        disciplines: []
    });

    const toast = useToast();
    const { createServiceProvider } = useServiceProviderStore();

    const handleAddServiceProvider = async () => {
        const { success, message } = await createServiceProvider(newServiceProvider);

        if (!success) {
            toast({
                title: "Error",
                description: message,
                status: "error",
                isClosable: true
            })
        }
        else {
            toast({
                title: "Success",
                description: message,
                status: "success",
                isClosable: true
            })
        }

        setNewServiceProvider({
            name: 'New service provider',
            image: '',
            city: '',
            phone: '',
            disciplines: []
        })
    };

    return (
        <Container maxW={"container.sm"}>
            <VStack spacing={8}>
                <Heading as={"h1"} size={"2xl"} textAlign={"center"} mb={8}>
                    Create a new service provider
                </Heading>
                <Box
                    w={"container.sm"} bg={useColorModeValue("white", "gray.1000")}
                    p={3} rounded={"lg"} shadow={"md"}
                >
                    <VStack spacing={3}>
                        <Input placeholder='Service provider name'
                            name='name'
                            value={newServiceProvider.name}
                            onChange={(e) => setNewServiceProvider({ ...newServiceProvider, name: e.target.value })}
                        />
                        <Input placeholder='Phone'
                            name='name'
                            type='number'
                            value={newServiceProvider.phone}
                            onChange={(e) => setNewServiceProvider({ ...newServiceProvider, phone: e.target.value })}
                        />
                        <Input placeholder='City'
                            name='name'
                            value={newServiceProvider.city}
                            onChange={(e) => setNewServiceProvider({ ...newServiceProvider, city: e.target.value })}
                        />
                        <Input placeholder='Image'
                            name='name'
                            value={newServiceProvider.image}
                            onChange={(e) => setNewServiceProvider({ ...newServiceProvider, image: e.target.value })}
                            w={'full'}
                        />
                        <Button colorScheme='blue' onClick={handleAddServiceProvider} w='full'>
                            Add
                        </Button>
                    </VStack>
                </Box>
            </VStack>
        </Container >
    )

};
