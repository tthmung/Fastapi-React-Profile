import React, { useState, useEffect } from 'react';
import API from '../api';
import "@fontsource/dejavu-serif";
import "@fontsource/copse"
import {
    Box,
    Flex,
    Text,
    useColorModeValue,
    Image,
    Button,
    Grid,
    GridItem,
    useColorMode,
} from '@chakra-ui/react';

import Header from './Header';
import ExperienceCard from '../Components/Card';

import { experienceInterface, projectInterface } from '../Components/Interface';
import { motion, AnimatePresence } from 'framer-motion';

const lightBg = ["#EDFFFC", "#f9ffed", "#cff9ce", "#FFF4E3", "#F9FAFF", "#FFFCE6"];
const darkBg = ["#1A202C", "#2D3748", "#1C2231", "#2B3442", "#202C37", "#283845"];
const dataList = ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 6'];

export default function Home() {

    const [back, setBack] = useState({});
    const [mousePosition, setMousePosition] = useState({ x: Number, y: Number });
    const [isFrontVisible, setIsFrontVisible] = useState<boolean>(true);
    const { colorMode } = useColorMode();


    const exampleData: experienceInterface = {
        _id: "",
        company: "SciQuel",
        position: "Web Developer Intern",
        startDate: "Feb 2023",
        endDate: "May 2023",
        description: "At SciQuel the main focus of work is on the SciQuel website. SciQuel is a non-profit organization that aims to increase scientific literacy by providing scientific articles to non-technical people. At SciQuel we used the MERN stack, and I work as a full-stack developer. We have a stand-up every week and would collaborate with other interns to boost efficiency. This is a remote internship and all the meetings are done through zoom.",
        img: "asdsa"
    }

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
                    fontSize={{ base: "3xl", md: "6xl" }}
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
                    w={{ base: "95%", md: "40%" }}
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
                <Text fontSize={{ base: "lg", md: "xl" }} fontFamily="copse">
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
                    flexDirection={{ base: "column", '2xl': "row" }}
                    justifyContent={"space-between"}
                    paddingTop={10}
                    h={{ base: "full",'2xl': "70vh" }}
                    w={{ base: "90%", lg: "80%" }}
                    m={"auto"}
                    gap={"4"}
                >
                    <Box
                        h={"full"}
                        w={{ base: "full",'2xl': "65%" }}
                        borderRadius={"3xl"}
                        bg={useColorModeValue("#edf2f7", "#171923")}
                    >
                        <Flex
                            paddingY={{ base: "10", lg: "20" }}
                            paddingX={{ base: "5", lg: "10" }}
                            flexDirection={"column"}
                            justifyContent={"space-between"}
                            h="full"
                        >
                            <AnimatePresence mode="wait">
                                {isFrontVisible ? renderFront : renderBack}
                            </AnimatePresence>
                            <Box
                                marginTop={{ base: "4", lg: "0" }}
                            >
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
                <Box marginTop={"4"}>
                    <Grid
                        w={{ base: "90%", lg: "80%" }}
                        margin={"auto"}
                        gridGap={"4"}
                    >
                        <GridItem colSpan={4} height={"min"}>
                            <ExperienceCard data={exampleData} bg={useColorModeValue("#EDFFFC", "#1A202C")} type="Experience" />
                        </GridItem>
                        {dataList.map((item, index) => (
                            <GridItem colSpan={2} height={"min"} key={item}>
                                <ExperienceCard
                                    data={exampleData}
                                    bg={colorMode === "light" ?
                                        lightBg[(index + 1) % lightBg.length]
                                        :
                                        darkBg[(index + 1) % darkBg.length]}
                                    type="Experience"
                                />
                            </GridItem>

                        ))}
                    </Grid>
                </Box>
            </Box>
        </>
    );
}
