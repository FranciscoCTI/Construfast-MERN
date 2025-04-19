import { VStack, Container, Text, SimpleGrid } from '@chakra-ui/react'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'

export const HomePage = () => {
    return (
        <Container maxW='container.xl' py={12}>
            <div>This is constru-fast, your new source of information for building houses</div>
        </Container>
    )
}
