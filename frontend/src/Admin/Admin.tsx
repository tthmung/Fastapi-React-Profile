import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import API from '../api'
import Header from './Header';
import Loading from './Loading';

import {
    Box,
    Flex,
    DarkMode,
    Text,
    Table,
    TableContainer,
    Thead,
    Tbody,
    Tr,
    Td,
    Th,
} from '@chakra-ui/react';


interface databaseObject {
    title: string;
    company: string;
    _id: string;
}

export default function Admin() {

    const navigate = useNavigate();
    let { collection, id } = useParams<string>();
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

    const [projects, setProjects] = useState([{
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


    // Render collections
    const renderCollections = (
        <TableContainer width={{ md: "20%" }} ml={"2"} mt={"2"}>
            <Table variant={"striped"} colorScheme={"red"}>
                <Thead bg={"gray.900"} textAlign={"center"}>
                    <Tr key={"collection"}>
                        <Th>
                            Collection
                        </Th>
                    </Tr>
                </Thead>
                <Tbody>
                    <Tr key={"experience"}>
                        <Td>
                            <Link to="experiences" relative="path">
                                Experiences
                            </Link>
                        </Td>
                    </Tr>
                    <Tr key={"project"}>
                        <Td>
                            <Link to="projects" relative="path">
                                Projects
                            </Link>
                        </Td>
                    </Tr>
                </Tbody>
            </Table>
        </TableContainer>
    );

    // Render title or company name based on collections
    const renderTitles = (database: any[]) => {

        if (collection !== "experiences" && collection !== "projects") {
            navigate("/404");
        }

        return (
            <TableContainer width={{ md: "40%" }} ml={"2"} mt={"2"}>
                <Table variant={"striped"} colorScheme={"telegram"}>
                    <Thead bg={"gray.900"} textAlign={"center"}>
                        <Tr key={collection}>
                            <Th>
                                {collection}
                            </Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {database.map((val) => (
                            <Tr key={val._id} _hover={{
                                bg: "#006ba1",
                                cursor: "pointer"
                            }}
                                onClick={() => navigate(collection + "/data/" + val._id)}
                            >
                                <Td>

                                    {collection === "experiences" ?
                                        val.company
                                        :
                                        val.title
                                    }
                                </Td>
                            </Tr>
                        ))}
                        <Tr
                            key={collection + "/new"}
                            _hover={{
                                bg: "#006ba1",
                                cursor: "pointer"
                            }}
                            onClick={() => navigate(collection + "/new")}
                        >
                            <Td>
                                Add New
                            </Td>
                        </Tr>
                    </Tbody>
                </Table>
            </TableContainer>
        );
    }

    return (
        <DarkMode>
            <Box data-theme="dark"
                bg="chakra-body-bg"
                color="chakra-body-text"
                height={"100%"}>
                <Header />
                <Box height={"100vh"} paddingTop={"16"} bg={"gray.700"}>
                    {render ? <Loading /> :
                        collection ?
                            collection === "experiences" ?
                                renderTitles(experiences)
                                :
                                renderTitles(projects)
                            : renderCollections
                    }
                </Box>
            </Box>
        </DarkMode>
    );
}
