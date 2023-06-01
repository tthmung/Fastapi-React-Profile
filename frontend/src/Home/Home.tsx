import React, { useState, useEffect } from 'react';
import API from '../api';
import "@fontsource/dejavu-serif";
import "@fontsource/copse"
import api_helper from '../api_helper';
import {
    Box,
    Flex,
    Center,
    Text,
    useColorModeValue,
    Image,
    Button
} from '@chakra-ui/react';

import Header from './Header';
import Card from './Card';
import { experienceInterface, projectInterface } from '../Components/Interface';
import { motion, AnimatePresence } from 'framer-motion';


export default function Home() {

    const [back, setBack] = useState({});
    const [mousePosition, setMousePosition] = useState({ x: Number, y: Number });
    const [isFrontVisible, setIsFrontVisible] = useState<boolean>(true);

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

    const renderFront = (
        <motion.div
            key="front"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <Box className='front'>
                <Text fontSize={"3xl"} fontFamily={"dejavu-serif"}>
                    Hello there, I'm Thawng
                </Text>
                <Text
                    fontSize={{base: "3xl", md: "6xl"}}
                    color={useColorModeValue("#e74c3c", "#00FFFF")}
                    fontFamily={"dejavu-serif"}
                    marginTop={"6"}
                >
                    A Software Developer
                </Text>
                <Text
                    fontSize={"2xl"}
                    fontFamily={"dejavu-serif"}
                    marginTop={"2"}
                >
                    Currently @ Michigan Tech
                </Text>
                <Text
                    fontSize={"xl"}
                    color={"#A6A6A6"}
                    marginTop={"4"}
                    w={{base: "95%", md: "40%"}}
                >
                    I am passionate about making lives easier through technology
                </Text>
            </Box>
        </motion.div>
    );

    const renderBack = (
        <motion.div
            key="back"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <Box className='back'>
                <Text fontSize={"2xl"} fontFamily={"dejavu-serif"}>
                    About me
                </Text>
                <Text fontSize={{base: "lg", md: "xl"}} fontFamily="copse">
                    <br />
                    I'm a software developer currently pursuing a degree in computer science at Michigan Technological University. I'm passionate about creating high-quality, ethical code that makes a positive impact on people's lives.
                    <br /><br />
                    Over the years, I've gained valuable experience through a variety of projects and internships, working with teams to develop innovative solutions and hone my skills as a developer.
                    <br /><br />
                    In my free time, I love playing outdoor sports like soccer and tennis, as well as exploring the world of video games (I'm a big fan of League of Legends!). But I also value spending time with friends and having meaningful conversations about anything and everything.
                </Text>
            </Box>
        </motion.div>
    );

    return (
        <>
            <Header />
            <Box h="auto">
                {/* The introductory section*/}
                <Flex
                    flexDirection={{ base: "column", md: "row" }}
                    justifyContent={"space-between"}
                    paddingTop={16}
                    h={{base: "100vh", md: "70vh"}}
                    w={{base: "90%", md: "80%"}}
                    m={"auto"}
                    gap={"2"}
                >
                    <Box
                        h={"full"}
                        w={{base: "full", md: "65%"}}
                        borderRadius={"3xl"}
                        bg={useColorModeValue("#edf2f7", "#171923")}
                    >
                        <Flex
                            paddingY={{base: "10", md: "20"}}
                            paddingX={{base: "5", md: "10"}}
                            flexDirection={"column"}
                            justifyContent={"space-between"}
                            h="full"
                        >
                            <AnimatePresence mode="wait">
                                {isFrontVisible ? renderFront : renderBack}
                            </AnimatePresence>
                            <Box>
                                <Button
                                    marginRight={"2"}
                                    _light={{
                                        bg: "black",
                                        textColor: "white",
                                        _hover: { bg: "#393939" },
                                        _active: { bg: "#5f5f5f" }
                                    }}
                                >
                                    View my work
                                </Button>
                                <Button
                                    marginLeft={"2"}
                                    _light={{
                                        bg: "black",
                                        textColor: "white",
                                        _hover: { bg: "#393939" },
                                        _active: { bg: "#5f5f5f" }
                                    }}
                                    onClick={() => setIsFrontVisible(!isFrontVisible)}
                                >
                                    {isFrontVisible ? "About me" : "Home"}
                                </Button>
                            </Box>
                        </Flex>
                    </Box>
                    <Image
                        src={require('../static/profile.JPG')}
                        alt="profile"
                        borderRadius={"3xl"}

                    />
                </Flex>

                <Box height={"100vh"}>

                </Box>
            </Box>
        </>
    );
}
