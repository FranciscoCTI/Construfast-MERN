import { EditIcon, DeleteIcon } from '@chakra-ui/icons';
import {
    Box, Container, Heading, HStack, VStack,
    IconButton, Text, useColorModeValue, Image,
    useToast, Modal, useDisclosure, ModalOverlay,
    ModalContent, ModalHeader, ModalCloseButton,
    ModalBody, Input, ModalFooter, Button
} from '@chakra-ui/react';
import { useServiceProviderStore } from '../store/serviceProvider';
import { useState } from 'react';

export const ServiceProviderCard = ({ serviceProvider }) => {

    const [updatedServiceProvider, setUpdatedServiceProvider] = useState(serviceProvider);
    const textColor = useColorModeValue('gray.600', 'gray.200');
    const bg = useColorModeValue('white', 'gray.500');
    const { removeServiceProvider, editServiceProvider } = useServiceProviderStore();
    const toast = useToast();
    const { isOpen, onOpen, onClose } = useDisclosure();

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
                    <HStack>
                        {serviceProvider.disciplines.map((di) => (
                            <Box key={di.name} p={2} bg='blue.100' borderRadius='sm'>
                                {di}
                            </Box>
                        ))}
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