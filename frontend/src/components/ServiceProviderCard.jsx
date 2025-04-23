import { EditIcon, DeleteIcon } from '@chakra-ui/icons';
import {
    Box, Container, Heading, HStack, VStack,
    IconButton, Text, useColorModeValue, Image,
    useToast, Modal, useDisclosure, ModalOverlay,
    ModalContent, ModalHeader, ModalCloseButton,
    ModalBody, Input, ModalFooter, Button, Select, Wrap,
    Stack
} from '@chakra-ui/react';
import { useServiceProviderStore } from '../store/serviceProvider';
import { useState } from 'react';
import { disciplines } from '../../../backend/models/enums.js';

export const ServiceProviderCard = ({ serviceProvider }) => {

    const [updatedServiceProvider, setUpdatedServiceProvider] = useState(serviceProvider);
    const textColor = useColorModeValue('gray.600', 'gray.200');
    const bg = useColorModeValue('white', 'gray.500');
    const { removeServiceProvider, editServiceProvider } = useServiceProviderStore();
    const toast = useToast();
    const { isOpen, onOpen, onClose } = useDisclosure();

    const [selectedDiscipline, setSelectedDiscipline] = useState('');

    const handleDeleteServiceProvider = async (id) => {
        const { success, message } = await removeServiceProvider(id)
        if (!success) {
            toast({
                title: 'Error',
                description: message,
                status: 'error',
                duration: 3000,
                isClosable: true
            })
        }
        else {
            toast({
                title: "Success",
                description: message,
                status: "success",
                duration: 3000,
                isClosable: true,
            })
        }
    }

    const handleUpdateServiceProvider = async (pid, updatedServiceProvider) => {
        const { success, message } = await editServiceProvider(pid, updatedServiceProvider);
        onClose();
        if (!success) {
            toast({
                title: 'Error',
                description: message,
                status: 'error',
                duration: 3000,
                isClosable: true
            })
        }
        else {
            toast({
                title: "Success",
                description: message,
                status: "success",
                duration: 3000,
                isClosable: true,
            })
        }
    };

    const handleRemoveDiscipline = async (dicToRemove) => {
        const updatedDisciplines = serviceProvider.disciplines.filter(
            (s) => s != dicToRemove
        );

        const updatedProvider = { ...serviceProvider, disciplines: updatedDisciplines };

        setUpdatedServiceProvider(updatedProvider);

        const res = await fetch(`/api/serviceProviders/${serviceProvider._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedProvider)
        });

        const data = await res.json();

        if (data.success) {
            useServiceProviderStore.getState().fetchServiceProviders();
        } else {
            console.error("Failed to update services", data.message);
        }
    };

    const handleAddDiscipline = async () => {
        if (!selectedDiscipline || serviceProvider.disciplines.includes(selectedDiscipline)) {
            return;
        }

        const updatedDisciplines = [...serviceProvider.disciplines, selectedDiscipline];
        const updatedServiceProvider = { ...serviceProvider, disciplines: updatedDisciplines };

        setUpdatedServiceProvider(updatedServiceProvider);
        setSelectedDiscipline('');

        const res = await fetch(`/api/serviceProviders/${serviceProvider._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedServiceProvider)
        });

        const data = await res.json();
        if (data.success) {
            useServiceProviderStore.getState().fetchServiceProviders();
        }
        else {
            console.error('Failed to add discipline', data.message);
        }
    };

    return (
        <Box shadow='lg'
            rounded='lg'
            overflow='hidden'
            transition='all 0.1s'
            _hover={{ transform: "translateY(-20px)", shadow: 'x1' }}
            bg={bg}
        >
            <Image src={serviceProvider.image} alt={serviceProvider.name} h={48} w='full' objectFit='cover' />
            <Box p={4}>
                <Heading as='h3' size='md' mb={2}>
                    {serviceProvider.name}
                </Heading>

                <VStack align={'start'}>
                    <HStack textAlign='left'>
                        <Text textAlign='left' fontWeight='bold' fontSize='s' color={textColor} mb={0}>
                            Phone:
                        </Text>
                        <Text fontSize='s' color={textColor} mb={0}>
                            {serviceProvider.phone}
                        </Text>
                    </HStack>
                    <HStack textAlign='left'>
                        <Text textAlign='left' fontWeight='bold' fontSize='s' color={textColor} mb={0}>
                            City:
                        </Text>
                        <Text fontSize='s' color={textColor} mb={0}>
                            {serviceProvider.city}
                        </Text>
                    </HStack>
                </VStack>

                <HStack spacing={2} mt={5}>
                    <IconButton icon={<EditIcon />} onClick={onOpen} colorScheme='blue' />
                    <IconButton icon={<DeleteIcon />} onClick={() => handleDeleteServiceProvider(serviceProvider._id)} colorScheme='red' />
                </HStack>
            </Box>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Update service provider</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <VStack spacing={4}>
                            <Input placeholder='Service provider Name'
                                name='name'
                                value={updatedServiceProvider.name}
                                onChange={e => setUpdatedServiceProvider({ ...updatedServiceProvider, name: e.target.value })}
                            />
                            <Input placeholder='Phone'
                                name='name'
                                type='number'
                                value={updatedServiceProvider.phone}
                                onChange={e => setUpdatedServiceProvider({ ...updatedServiceProvider, phone: e.target.value })}
                            />
                            <Input placeholder='City'
                                name='name'
                                value={updatedServiceProvider.city}
                                onChange={e => setUpdatedServiceProvider({ ...updatedServiceProvider, city: e.target.value })}
                            />
                            <Input placeholder='Image'
                                name='name'
                                value={updatedServiceProvider.image}
                                onChange={e => setUpdatedServiceProvider({ ...updatedServiceProvider, image: e.target.value })}
                            />
                            {serviceProvider?.disciplines?.length > 0 ? (
                                <Wrap>
                                    {
                                        serviceProvider.disciplines.map((discipline, idDic) => (
                                            <Box p={2} borderRadius='sm' key={idDic}>
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
                            ) : (<Box>No disciplines listed</Box>)
                            }

                            <HStack>
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
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={() => handleUpdateServiceProvider(serviceProvider._id, updatedServiceProvider)}>
                            Update
                        </Button>
                        <Button variant='ghost' onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    )
};

export default ServiceProviderCard;