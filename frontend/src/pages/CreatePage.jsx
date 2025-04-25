import { React, useState } from 'react'
import {
    Box, Button, Container,
    Heading, useColorModeValue, VStack,
    Input, HStack, Stack,
    useToast, Select, Wrap, Text
} from '@chakra-ui/react';
import { useServiceProviderStore } from '../store/serviceProvider';
import { CiTrophy } from 'react-icons/ci';
import { cities, disciplines } from '../../../backend/models/enums';
import ServiceProvider from '../../../backend/models/serviceProvider.model';
import PictureUploader from '../components/PictureUploader.jsx';
import { useNavigate } from 'react-router-dom';

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
    const [selectedDiscipline, setSelectedDiscipline] = useState('');
    const [selectedCity, setSelectedCity] = useState('');
    const [selectedImage, setSelectedImage] = useState('');
    const navigate = useNavigate();

    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    const handleAddServiceProvider = async () => {

        if (!selectedImage || !selectedCity) {
            toast({
                title: "Cannot proceed",
                description: "You have to set all fields to create a service provider profile",
                status: "error",
                isClosable: true
            })
            return;
        }

        const updatedServiceProvider = { ...newServiceProvider, image: selectedImage };

        setNewServiceProvider(updatedServiceProvider);

        const { success, message } = await createServiceProvider(updatedServiceProvider);

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

        await delay(1500);
        navigate('/');
        await delay(1500);

        setNewServiceProvider({
            name: 'New service provider',
            image: '',
            city: '',
            phone: '',
            disciplines: []
        })
    };

    const handleAddDiscipline = async () => {
        if (!selectedDiscipline || newServiceProvider.disciplines.includes(selectedDiscipline)) {
            return;
        }

        const updatedDisciplines = [...newServiceProvider.disciplines, selectedDiscipline];
        const updatedServiceProvider = { ...newServiceProvider, disciplines: updatedDisciplines };

        setNewServiceProvider(updatedServiceProvider);
        setSelectedDiscipline('');
    };

    const handleRemoveDiscipline = async (dicToRemove) => {
        const updatedDisciplines = newServiceProvider.disciplines.filter(
            (s) => s != dicToRemove
        );

        const updatedServiceProvider = { ...newServiceProvider, disciplines: updatedDisciplines };

        setNewServiceProvider(updatedServiceProvider);
    };

    const handleLeaveCitySelection = async () => {
        const updatedServiceProvider = { ...newServiceProvider, city: selectedCity };

        setNewServiceProvider(updatedServiceProvider);
    };

    const baseUrl = import.meta.env.VITE_APP_API_BASE_URL;
    const imageUrl = `${baseUrl}/${'uploads/anonimousUser.jpg'}`;

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
                        //City UI
                        <Box w='100%' border="1px solid" borderColor="gray.300" borderRadius="md" p={2} mb={4}>
                            <HStack align={'center'} spacing={5}>
                                <Text align={'left'} ><b>City</b></Text>
                                <HStack justify={'center'} spacing={4} width={'100%'}>
                                    <Select
                                        placeholder="Select city"
                                        value={ServiceProvider.city}
                                        onChange={(e) => setSelectedCity(e.target.value)}
                                        onMouseLeave={handleLeaveCitySelection}
                                    >
                                        {Object.values(cities).map((disc) => (
                                            <option key={disc} value={disc}>
                                                {disc.charAt(0).toUpperCase() + disc.slice(1).replace('_', ' ')}
                                            </option>
                                        ))}
                                    </Select>
                                </HStack>
                            </HStack>
                        </Box>
                        //Disciplines UI
                        <Box w='100%' border="1px solid" borderColor="gray.300" borderRadius="md" p={2} mb={4}>
                            <VStack align={'center'} spacing={5}>
                                <Text align={'left'} ><b>Disciplines</b></Text>
                                {
                                    newServiceProvider.disciplines.length === 0 &&
                                    (<Text>This service provider has no disciplines yet</Text>)
                                }
                                <Wrap mb={10}>
                                    {
                                        newServiceProvider.disciplines.map((discipline, idDic) => (
                                            <Box p={2} bg='blue.100' borderRadius='sm' key={idDic}>
                                                <HStack>
                                                    <Box mr={2}>
                                                        {discipline}
                                                    </Box>
                                                    <Button
                                                        size="xs"
                                                        colorScheme="red"
                                                        onClick={() => handleRemoveDiscipline(discipline)}>
                                                        X
                                                    </Button>
                                                </HStack>
                                            </Box>
                                        ))
                                    }
                                </Wrap>
                                <HStack spacing={4}>
                                    <Select
                                        placeholder="Select discipline"
                                        value={selectedDiscipline}
                                        onChange={(e) => setSelectedDiscipline(e.target.value)}
                                    >
                                        {Object.values(disciplines).map((disc) => (
                                            <option key={disc} value={disc}>
                                                {disc.charAt(0).toUpperCase() + disc.slice(1).replace('_', ' ')}
                                            </option>
                                        ))}
                                    </Select>
                                    <Button colorScheme="blue" onClick={handleAddDiscipline}>
                                        Add
                                    </Button>
                                </HStack>
                            </VStack>
                        </Box>

                        <PictureUploader serviceProvider={newServiceProvider} setImage={setSelectedImage} imageUrl={imageUrl} />

                        <Button colorScheme='blue' onClick={handleAddServiceProvider} w='full'>
                            Add
                        </Button>
                    </VStack>
                </Box>
            </VStack>
        </Container >
    )
};
