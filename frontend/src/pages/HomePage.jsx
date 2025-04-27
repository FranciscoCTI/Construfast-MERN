import { VStack, Container, Text, SimpleGrid } from '@chakra-ui/react'
import { Box } from '@chakra-ui/react';
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useServiceProviderStore } from '../store/serviceProvider'
import ServiceProviderCard from '../components/ServiceProviderCard'
import FilterBar from '../components/FilterBar'
import GenericMap from '../components/GenericMap';

export const HomePage = () => {
    const { fetchServiceProviders, serviceProviders, selectedDiscipline, selectedCity } = useServiceProviderStore();

    useEffect(() => { fetchServiceProviders() }, [fetchServiceProviders]);

    console.log('Service providers:', serviceProviders);

    const filteredProviders = serviceProviders.filter((provider) => {
        const matchesDiscipline = selectedDiscipline
            ? provider.disciplines.includes(selectedDiscipline)
            : true;

        const matchesCity = selectedCity
            ? provider.city?.toLowerCase() === selectedCity.toLowerCase()
            : true;

        return matchesDiscipline && matchesCity;
    });

    return (
        <>
            <GenericMap />
            <Container maxW='container.xl' py={6}>
                <VStack spacing={6}>
                    <Text
                        fontSize={'40'}
                        fontWeight={'bold'}
                        bgGradient={'linear(to-r, black, blue)'}
                        bgClip={'text'}
                        textAlign={'center'}
                    >
                        Check out the current service providers in your area ▼
                    </Text>

                    <Box>
                        <FilterBar />
                    </Box>
                    <SimpleGrid
                        columns={{
                            base: 1,
                            md: 2,
                            lg: 3
                        }}
                        spacing={10}
                        w={'full'}
                    >
                        {filteredProviders.map((sp) => (

                            (sp != null && sp.name != "" && sp.phone != 0 && sp.image != "") &&
                            (<ServiceProviderCard key={sp._id} serviceProvider={sp} />)
                        ))}
                    </SimpleGrid>

                    {
                        filteredProviders.length === 0 &&
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
        </>
    )
}
