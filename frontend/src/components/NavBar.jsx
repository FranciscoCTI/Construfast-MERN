import React from 'react'
import { Container, Flex, Text, HStack, Button, Icon, useColorMode } from '@chakra-ui/react'
import { PlusSquareIcon } from '@chakra-ui/icons';
import { CiSquarePlus } from 'react-icons/ci';
import { FaCartPlus } from "react-icons/fa";
import { GrContact } from "react-icons/gr";
import { Link } from 'react-router-dom';
import { IoMoon } from 'react-icons/io5';
import { LuSun } from 'react-icons/lu';

export const NavBar = () => {

    const { colorMode, toggleColorMode } = useColorMode();

    return (
        <Container maxW={"1140px"} px={4}>
            <Flex
                h={16}
                alignItems={"center"}
                justifyContent={"space-between"}
                flexDir={{ base: 'column', sm: 'row' }}
            >
                <Text
                    fontSize={{ base: "22", sm: "28" }}
                    fontWeight={"bold"}
                    textTransform={"uppercase"}
                    textAlign={"center"}
                    bgGradient={"linear(to-r, Black, blue)"}
                    bgClip={'text'}
                >
                    <Link to={"/"}>ConstruFast</Link>
                </Text>

                <HStack spacing={2} alignItems={"center"}>
                    <Link to={"/create"}>
                        <Button>
                            <PlusSquareIcon fontSize={20} />
                        </Button>
                    </Link>
                    <Link to={"/contact"}>
                        <Button>
                            <GrContact fontSize={20} />
                        </Button>
                    </Link>
                    <Button onClick={toggleColorMode}>
                        {
                            colorMode === 'light' ? <IoMoon /> : <LuSun size="20" />
                        }
                    </Button>
                </HStack>
            </Flex>
        </Container>
    )
}

export default NavBar;
