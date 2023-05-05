import React, { useState, useEffect } from 'react';
import API from '../api'
// import api_helper from '../api_helper';
import { Box, Flex, Center, Image } from '@chakra-ui/react';

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
                <Flex justifyContent={"center"} alignItems={"center"}>
                    <Center>
                        Hello
                    </Center>
                    <Center>
                        <Box>
                            <Image src={require("../static/profile.JPG")} alt='Name' />
                        </Box>
                    </Center>
                </Flex>
            </Box>
        </>
    );
}
