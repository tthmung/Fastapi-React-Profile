import React, { useState, useEffect } from 'react';
import API from '../api'
import Header from './Header';
import {
    Box,
    Flex,
    Skeleton,
    SkeletonCircle,
    SkeletonText,
    DarkMode,
    Text,
    Table,
    TableCaption,
    TableContainer,
    Thead,
    Tbody,
    Tr,
    Td,
    Th
} from '@chakra-ui/react';


export default function Admin() {

    const [render, setRender] = useState<boolean>(true);

    const [experiences, setExperiences] = useState([{
        _id: "",
        company: "",
        position: "",
        startDate: "",
        endDate: "",
        description: "",
        img: ""

    }]);

    const [Projects, setProjects] = useState([{
        _id: "",
        title: "",
        startDate: "",
        description: "",
        img: "",
        link: ""
    }]);

    // Get the data collection from api calls
    useEffect(() => {
        const api = new API();

        const fetchData = async () => {
            let getExperience = api.getExperience();
            getExperience.then((e) => {
                if (e.status === 200) {
                    setExperiences(JSON.parse(e.data));
                }
            })

            let getProject = api.getProject();
            getProject.then((e) => {
                setRender(false);
                setProjects(JSON.parse(e.data));
            });
        }


        fetchData();

    }, [])

    const handleExperience = (event: Event, request: string) => {
        if (request === "post") {

        } else {

        }
    }

    const handleProject = (event: Event, request: string) => {
        if (request === "post") {

        } else {

        }
    }

    // Render loading
    const renderLoading = (
        <Box height={"100%"} width={"100%"} position={"absolute"} zIndex={20} bg={"black"}>
            <Flex justifyContent={"center"} alignItems={"center"} height={"full"}>
                <Box width={"75%"}>
                    <Skeleton height="100px" />
                    <br />
                    <SkeletonCircle size="50" />
                    <br />
                    <SkeletonText noOfLines={10} skeletonHeight="2" />
                </Box>
            </Flex>
        </Box>
    );

    return (
        <DarkMode>
            <Box data-theme="dark"
                bg="chakra-body-bg"
                color="chakra-body-text"
                height={"100%"}>
                <Header />
                <Box height={"100vh"} paddingTop={"16"} bg={"gray.700"}>
                    {render ? renderLoading :
                        (<TableContainer width={{ md: "20%" }} ml={"2"} mt={"2"}>
                            <Table variant={"striped"} colorScheme={"red"}>
                                <Thead bg={"gray.900"} textAlign={"center"}>
                                    <Tr>
                                        <Th>Collection</Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    <Tr>
                                        <Td>Experiences</Td>
                                    </Tr>
                                    <Tr>
                                        <Td>Projects</Td>
                                    </Tr>
                                </Tbody>
                            </Table>
                        </TableContainer>
                        )
                    }
                </Box>
            </Box>
        </DarkMode>
    );
}
