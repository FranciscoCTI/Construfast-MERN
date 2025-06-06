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
import { disciplines, cities } from '../../../backend/models/enums.js';
import PictureUploader from './PictureUploader.jsx';
import SetLocationMap from '../components/SetLocationMap.jsx';

export const ServiceProviderCard = ({ serviceProvider }) => {

    const [updatedServiceProvider, setUpdatedServiceProvider] = useState(serviceProvider);
    const textColor = useColorModeValue('gray.600', 'gray.200');
    const bg = useColorModeValue('white', 'gray.500');
    const { removeServiceProvider, editServiceProvider } = useServiceProviderStore();
    const toast = useToast();
    const { isOpen, onOpen, onClose } = useDisclosure();

    const [selectedDiscipline, setSelectedDiscipline] = useState('');
    const [selectedImage, setSelectedImage] = useState('');

    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');

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
        const updatedDisciplines = updatedServiceProvider.disciplines.filter(
            (s) => s != dicToRemove
        );

        const updatedProvider = { ...updatedServiceProvider, disciplines: updatedDisciplines };

        setUpdatedServiceProvider(updatedProvider);
    };

    const handleAddDiscipline = async () => {
        if (!selectedDiscipline ||
            updatedServiceProvider.disciplines.includes(selectedDiscipline)) {
            return;
        }

        const updatedDisciplines = [...(updatedServiceProvider.disciplines ?? []), selectedDiscipline];
        const newServiceProvider = { ...updatedServiceProvider, disciplines: updatedDisciplines };

        setUpdatedServiceProvider(newServiceProvider);
        setSelectedDiscipline('');
    };

    const handleModalOpen = () => {
        setUpdatedServiceProvider(serviceProvider);
        onOpen();
    };

    const handleModalClose = () => {
        setUpdatedServiceProvider(serviceProvider);
        onClose();
    };

    const setSelectedImageMethod = (definedImage) => {
        setSelectedImage(definedImage);
        setUpdatedServiceProvider({ ...updatedServiceProvider, image: definedImage })
    };

    const handleMapClick = (event) => {
        const { latLng } = event;
        const latitude = latLng.lat();
        const longitude = latLng.lng();

        console.log('Clicked at:', latitude, longitude);

        setLatitude(latitude);
        setLongitude(longitude);

        const updated = { ...updatedServiceProvider, lat: latitude, lng: longitude };

        setUpdatedServiceProvider(updated);

    };

    const handleDragEnd = (event) => {
        const { latLng } = event;
        const latitude = latLng.lat();
        const longitude = latLng.lng();

        console.log('Clicked at:', latitude, longitude);

        setLatitude(latitude);
        setLongitude(longitude);

        const updated = { ...updatedServiceProvider, lat: latitude, lng: longitude };

        setUpdatedServiceProvider(updated);

    };

    const baseUrl = import.meta.env.VITE_APP_API_BASE_URL;
    const imageUrl = `${baseUrl}/${serviceProvider.image}`;

    return (
        <Box shadow='lg'
            rounded='lg'
            overflow='hidden'
            transition='all 0.1s'
            _hover={{ transform: "translateY(-20px)", shadow: 'x1' }}
            bg={bg}
        >
            <Image src={imageUrl} alt={serviceProvider.name} h={60} w='full' objectFit='cover' />
            <Box p={1}>
                <Heading as='h3' size='s' mb={2}>
                    {serviceProvider.name}
                </Heading>

                <VStack align={'start'}>
                    <HStack textAlign='left'>
                        <Text textAlign='left' fontWeight='bold' fontSize='xs' color={textColor} mb={0}>
                            Phone:
                        </Text>
                        <Text fontSize='xs' color={textColor} mb={0}>
                            {serviceProvider.phone}
                        </Text>
                    </HStack>
                    <HStack textAlign='left'>
                        <Text textAlign='left' fontWeight='bold' fontSize='xs' color={textColor} mb={0}>
                            City:
                        </Text>
                        <Text fontSize='xs' color={textColor} mb={0}>
                            {serviceProvider.city}
                        </Text>
                    </HStack>
                </VStack>

                <HStack spacing={1} mt={3}>
                    <IconButton icon={<EditIcon />} onClick={handleModalOpen} colorScheme='blue' />
                    <IconButton icon={<DeleteIcon />} onClick={() => handleDeleteServiceProvider(serviceProvider._id)} colorScheme='red' />
                </HStack>
            </Box>

            <Modal isOpen={isOpen} onClose={handleModalClose}>
                <ModalOverlay />
                <ModalContent maxW={600}>
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

                            <Select
                                placeholder="Select city"
                                value={updatedServiceProvider.city}
                                onChange={(e) => setUpdatedServiceProvider({ ...updatedServiceProvider, city: e.target.value })}
                            >
                                {Object.values(cities).map((disc) => (
                                    <option key={disc} value={disc}>
                                        {disc.charAt(0).toUpperCase() + disc.slice(1).replace('_', ' ')}
                                    </option>
                                ))}
                            </Select>
                            <pre hidden>{JSON.stringify(updatedServiceProvider, null, 2)}</pre>
                            <Input placeholder='Latitude'
                                type='number'
                                value={updatedServiceProvider.lat}
                                hidden
                            />
                            <Input placeholder='Longitude'
                                type='number'
                                value={updatedServiceProvider.lng}
                                hidden
                            />
                            <SetLocationMap mapClickHandler={handleMapClick}
                                dragEndHandler={handleDragEnd}
                                height={'250px'}
                                initialMarker={{ lat: serviceProvider.lat, lng: serviceProvider.lng }} />

                            <PictureUploader serviceProvider={updatedServiceProvider}
                                setImage={setSelectedImageMethod}
                                imageUrl={imageUrl} />

                            //Disciplines UI
                            {updatedServiceProvider?.disciplines?.length > 0 ? (
                                <Wrap>
                                    {
                                        updatedServiceProvider.disciplines.map((discipline, idDic) => (
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