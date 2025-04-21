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

    //const { deleteProduct, updateProduct } = useServiceProviderStore();
    const toast = useToast();
    const textColor = useColorModeValue('gray.600', 'gray.200');
    const bg = useColorModeValue('white', 'gray.500');

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
                    <IconButton icon={<EditIcon />} /*onClick={onOpen}*/ colorScheme='blue' />
                    <IconButton icon={<DeleteIcon />} /*onClick={() => handleDeleteProduct(product._id)}*/ colorScheme='red' />
                </HStack>
            </Box>
        </Box>
    )
};

export default ServiceProviderCard;