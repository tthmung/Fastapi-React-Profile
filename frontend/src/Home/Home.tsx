import React, { useState, useEffect } from 'react';
import API from '../api';
import "@fontsource/dejavu-serif";
import "@fontsource/copse"
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
import { experienceInterface, projectInterface } from '../Components/Interface';


export default function
    Home() {

    const [back, setBack] = useState({});
    const [mousePosition, setMousePosition] = useState({ x: Number, y: Number });


    // Get the mouse position
    useEffect(() => {
        const updateMousePosition = (ev: any) => {
            setMousePosition({ x: ev.clientX, y: ev.clientY });
        }

        window.addEventListener('mousemove', updateMousePosition);

        return () => {
            window.removeEventListener('mousemove', updateMousePosition);
        }
    });

    // Get apis
    // useEffect(() => {
    //     const api = new API();

    //     const fetchData = async () => {
    //         setBack("ASd");
    //     }


    //     fetchData();
    // }, []);

    return (
        <>
            <Header />
            <Box h="auto">
                {/* The introductory section*/}
                <Flex
                    flexDirection={{ base: "column", md: "row" }}
                    justifyContent={"space-between"}
                    alignItems={"center"}
                    paddingTop={16}
                    h={"70vh"}
                    w={"80%"}
                    m={"auto"}
                >
                    <Center>
                        <Box textAlign={"left"}>
                            <Text fontSize={"xl"} fontFamily={"dejavu-serif"}>Hello, welcome to my website!</Text>
                            <Text fontSize={"5xl"} fontFamily={"dejavu-serif"}>I'm Thawng Hmung</Text>
                            <Text
                                fontSize={"6xl"}
                                color={useColorModeValue("#e74c3c", "#00FFFF")}
                                fontFamily={"dejavu-serif"}
                            >A Software Developer</Text>
                            <Text fontSize={"2xl"} fontFamily={"dejavu-serif"}>Currently @ Michigan Tech</Text>
                        </Box>
                    </Center>
                </Flex>

                {/* About ME */}

                {/* <Flex
                    w={"80%"}
                    m={"auto"}
                    justifyContent={"space-between"}
                >
                    <Box w="48%" position="relative">
                        <Box
                            p="10"
                            backdropFilter="blur(10px)"
                            backgroundColor="rgba(255, 255, 255, 0.5)"
                            border={1}
                            borderColor="transparent"
                            borderRadius="2xl"
                            position="relative"
                            zIndex="1"
                        >
                            <Text fontSize="3xl" fontFamily="copse">Meet Thawng</Text>
                            <Text fontSize="2xl" fontFamily="copse">
                                <br />
                                I'm a software developer currently pursuing a degree in computer science at Michigan Technological University. I'm passionate about creating high-quality, ethical code that makes a positive impact on people's lives.
                                <br /><br />
                                Over the years, I've gained valuable experience through a variety of projects and internships, working with teams to develop innovative solutions and hone my skills as a developer.
                                <br /><br />
                                In my free time, I love playing outdoor sports like soccer and tennis, as well as exploring the world of video games (I'm a big fan of League of Legends!). But I also value spending time with friends and having meaningful conversations about anything and everything.
                            </Text>
                        </Box>
                    </Box>
                </Flex> */}
            <Box height={"100vh"}>

            </Box>
            </Box>
        </>
    );
}
