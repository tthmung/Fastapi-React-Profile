import React, { useState, useEffect } from 'react';
import API from '../api';
import "@fontsource/dejavu-serif";
import api_helper from '../api_helper';
import {
    Box,
    Flex,
    Center,
    Image,
    Text,
    useColorModeValue
} from '@chakra-ui/react';

import Header from './Header';
import Card from './Card';


export default function Home() {

    const [back, setBack] = useState({});

    useEffect(() => {
        const api = new API();

        const fetchData = async () => {
            let response = await api.postExperience();
            setBack(response.data);
        }


        fetchData();
    }, [])

    return (
        <>
            <Header />
            <Box h="100vh">
                <Flex
                justifyContent={"space-evenly"}
                flexDirection={{base: "column", md:"row"}}
                alignItems={"center"}
                paddingTop={16}
                h={"full"}
                w={"60%"}
                m={"auto"}
                >
                    <Center>
                        <Box>
                            <Text fontSize={"xl"} fontFamily={"dejavu-serif"}>Hello, welcome to my website!</Text>
                            <Text fontSize={"5xl"} fontFamily={"dejavu-serif"}>I'm Thawng Hmung</Text>
                            <Text
                                fontSize={"6xl"}
                                color={useColorModeValue("#e74c3c", "#00FFFF")}
                                fontFamily={"dejavu-serif"}
                            >A Software Developer</Text>
                            <Text fontSize={"6xl"} fontFamily={"dejavu-serif"}>& A Student</Text>
                        </Box>
                    </Center>
                    <Center>
                        <Box
                            width={{ base: "auto", md: "md" }}
                            border={1}
                            p={"2"}
                            borderColor={"transparent"}
                            borderRadius={"2xl"}
                            bgGradient={
                                useColorModeValue(
                                    "linear(to-r, #F3904F,  #4fb2f3)",
                                    "linear(to-l, #F3904F, #4fb2f3)"
                                )
                            }
                        >
                            <Image
                                w={"full"}
                                h={"full"}
                                border={"1"}
                                borderColor={"transparent"}
                                borderRadius={"2xl"}
                                src={require("../static/profile.JPG")}
                                alt='Name'
                            />
                        </Box>
                    </Center>
                </Flex>
            </Box>
        </>
    );
}
