import { VStack, Container, Text, SimpleGrid, HStack } from '@chakra-ui/react'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'

export const Contact = () => {
    return (
        <Container maxW='container.xl' py={12}>
            <VStack>
                <div>
                    <Text fontWeight="bold" fontSize='3xl'>CONSTRU-FAST</Text>
                </div>
                <div>
                    <HStack>
                        <Text fontWeight='bold'>Phone:</Text>
                        <Text> cell (+569) 83790046</Text>
                    </HStack>
                    <HStack>
                        <Text fontWeight='bold'>E-mail:</Text>
                        <Text>franciscofcch@gmail.com</Text>
                    </HStack>
                    <HStack>
                        <Text fontWeight='bold'>Address:</Text>
                        <Text>Martin de Mujica 255, Lomas de San Andrés, Concepción, Chile.</Text>
                    </HStack>
                </div>
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d2255.2744848172183!2d-73.05730739501499!3d-36.790912233918554!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e1!3m2!1sen!2scl!4v1745249379649!5m2!1sen!2scl &maptype=hybrid"
                    width="1200"
                    height="550"
                    style={{ margin: '50px', scrollWheel: true }}
                    allowFullScreen={true}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade">
                </iframe>
            </VStack>
        </Container>
    )
}
