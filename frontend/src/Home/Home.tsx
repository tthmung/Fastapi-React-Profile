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


export default function Home() {

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
    useEffect(() => {
        const api = new API();

        const fetchData = async () => {
            let response = await api.postExperience();
            setBack(response.data);
        }


        fetchData();
    }, []);

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

                <Flex
                    w={"80%"}
                    m={"auto"}
                    bg={useColorModeValue("#b5b6b7", "#f2f3f4")}
                    border={1}
                    borderColor={"transparent"}
                    borderRadius={"3xl"}
                    justifyContent={"flex-between"}
                >
                    <Box w="48%">
                        <Box p={"10"}>
                            <Text fontSize={"3xl"} fontFamily={"copse"}>Meet Thawng</Text>
                            <Text fontSize={"2xl"} fontFamily={"copse"}>
                                <br />
                                I'm a software developer currently pursuing a degree in computer science at Michigan Technological University. I'm passionate about creating high-quality, ethical code that makes a positive impact on people's lives.
                                <br /><br />
                                Over the years, I've gained valuable experience through a variety of projects and internships, working with teams to develop innovative solutions and hone my skills as a developer.
                                <br /><br />
                                In my free time, I love playing outdoor sports like soccer and tennis, as well as exploring the world of video games (I'm a big fan of League of Legends!). But I also value spending time with friends and having meaningful conversations about anything and everything.
                            </Text>
                        </Box>
                    </Box>
                    <Box w="48%">

                    </Box>
                    <Box>

                    </Box>
                </Flex>

            </Box>
        </>
    );
}
