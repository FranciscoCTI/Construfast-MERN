import { Box, VStack, HStack, Wrap } from "@chakra-ui/react";

function MarkerInfo({ provider }) {
    return (
        <>
            <div style={{
                padding: '5px',
                backgroundColor: 'yellow.400',
                borderRadius: '8px',
                fontFamily: 'Arial, sans-serif',
                height: '100px',
                width: '250px',
                margin: '2'
            }}>
                <VStack>
                    <div style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '8px' }}>
                        {provider.name}
                    </div>
                    <Box><b>Phone:</b> {provider.phone}</Box>
                    <div
                        style={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            gap: '2px', margin: '2px, 2px, 2px, 2px'
                        }}
                    >
                        {provider.disciplines.map((discipline, idDic) => (
                            <div margin={5} key={idDic}
                                style={{
                                    backgroundColor: '#d0ebff',
                                    color: '#0366d6',
                                    borderRadius: '3px',
                                    padding: '6px 12px',
                                    fontSize: '12px',
                                    fontWeight: '500',
                                    whiteSpace: 'nowrap'
                                }}
                            >
                                {discipline}
                            </div>
                        ))}
                    </div>
                </VStack>
            </div>
        </>
    );
}

export default MarkerInfo;
