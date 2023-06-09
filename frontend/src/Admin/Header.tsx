import {
    Box,
    Flex,
    Button,
    Stack,
    Link,
} from '@chakra-ui/react';
import React from 'react';
import { useNavigate } from 'react-router-dom';


import API from '../api';

export default function Header() {

    const api = new API();
    const navigate = useNavigate();

    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        api.logout().then(() => {
            navigate("/login");
        }).catch((e) => {
            console.log(e);
        });
    }

    return (
        <Box position={"absolute"} w={"100vw"} zIndex={"20"}>
            <Flex
                minH={'60px'}
                py={{ base: 2 }}
                px={{ base: 4 }}
                borderBottom={1}
                borderStyle={'solid'}
                bg={"gray.800"}
                borderColor={'gray.900'}
                align={'center'}
                justify={"space-between"}>
                <Link
                    href={"/admin"}
                    textAlign={"left"}
                    fontFamily={'heading'}
                    color={'white'}>
                    ADMIN
                </Link>

                <Stack
                    flex={{ base: 1, md: 0 }}
                    justify={'flex-end'}
                    align={"center"}
                    direction={'row'}
                    spacing={6}>
                    <Link
                    href='/'
                    color={"white"}
                    >
                        tthmung
                    </Link>
                    <Button
                        as={'a'}
                        //   display={{ base: 'none', md: 'inline-flex' }}
                        fontSize={'sm'}
                        fontWeight={600}
                        color={'black'}
                        bg={'#00FFFF'}
                        href={'#'}
                        _hover={{
                            bg: 'pink.300',
                            color: "white"
                        }}
                        onClick={(e) => handleSubmit(e)}
                        >
                        Sign out
                    </Button>
                </Stack>
            </Flex>
        </Box>
    );
}
