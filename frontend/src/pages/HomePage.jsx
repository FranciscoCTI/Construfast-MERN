import { VStack, Container, Text, SimpleGrid } from '@chakra-ui/react'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useServiceProviderStore } from '../store/serviceProvider'
import ServiceProviderCard from '../components/ServiceProviderCard'

export const HomePage = () => {
    const { fetchServiceProviders, serviceProviders } = useServiceProviderStore();

    useEffect(() => { fetchServiceProviders() }, [fetchServiceProviders]);

    console.log('Service providers:', serviceProviders);

    return (
        <Container maxW='container.xl' py={12}>
            <VStack spacing={8}>
                <Text
                    fontSize={'30'}
                    fontWeight={'bold'}
                    bgGradient={'linear(to-r, cyan.400, blue.500)'}
                    bgClip={'text'}
                    textAlign={'center'}
                >
                    Current service providers
                </Text>

                <SimpleGrid
                    columns={{
                        base: 1,
                        md: 2,
                        lg: 3
                    }}
                    spacing={10}
                    w={'full'}
                >
                    {serviceProviders.map((sp) => (

                        (sp != null && sp.name != "" && sp.phone != 0 && sp.image != "") &&
                        (<ServiceProviderCard key={sp._id} serviceProvider={sp} />)

                    ))}
                </SimpleGrid>

                {
                    serviceProviders.length === 0 &&
                    (
                        <Text fontSize='x1' textAlign={'center'} fontWeight={'bold'} color='gray.500'>
                            No service providers found :( {''}
                            <Link to={'/create'}>
                                <Text as='span' color='blue.500' _hover={{ textDecoration: 'underline' }}>
                                    Create a service provider
                                </Text>
                            </Link>
                        </Text>
                    )
                }
            </VStack>
        </Container>
    )
}
