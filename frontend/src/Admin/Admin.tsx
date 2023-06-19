import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate, useLocation } from 'react-router-dom';

import API from '../api'
import Header from './Header';
import Loading from '../Components/Loading';
import ExperienceForm from './ExperienceForm';
import { experienceInterface, projectInterface } from '../Components/Interface';
import Login from './Login';

import {
    Box,
    DarkMode,
    Table,
    TableContainer,
    Thead,
    Tbody,
    Tr,
    Td,
    Th,
} from '@chakra-ui/react';
import ProjectForm from './ProjectForm';

export default function Admin() {

    const location = useLocation();
    const navigate = useNavigate();
    let { collection, id } = useParams<string>();
    const [render, setRender] = useState<boolean>(true);
    const [isAdmin, setIsAdmin] = useState<boolean>(false);

    const [experiences, setExperiences] = useState<experienceInterface[]>([{
        _id: "",
        company: "",
        position: "",
        startDate: "",
        endDate: "",
        description: "",
        img: ""
    }]);

    const [projects, setProjects] = useState<projectInterface[]>([{
        _id: "",
        title: "",
        orderDate: "",
        description: "",
        img: "",
        link: ""
    }]);

    useEffect(() => {
        if (!isAdmin) {
            navigate('/login');
        }
    });


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

    // Render title or company name based on collections.
    // Will also render the form
    const renderTitles = (database: experienceInterface[] | projectInterface[]) => {

        if (collection !== "experiences" && collection !== "projects") {
            navigate("/404");
        }
        // If id of url then
        if (id) {
            // Check if the given id is in the database
            // This is fine for small database

            const myData = database[database.findIndex(obj => obj._id === id)];
            const myType = "Update";


            return (
                <Box mt="2" ml="2">
                    {collection === "experiences" ?
                        <ExperienceForm data={myData} type={myType} />
                        :
                        <ProjectForm data={myData} type={myType} />
                    }
                </Box>
            );

        } else if (location.pathname.includes("new")) {
            const myType = "new";
            const emptyExperience: experienceInterface = {
                _id: "",
                company: "",
                position: "",
                startDate: "",
                endDate: "",
                description: "",
                img: ""
            };
            const emptyProject: projectInterface = {
                _id: "",
                title: "",
                orderDate: "",
                description: "",
                img: "",
                link: ""
            }
            return (
                <Box mt="2" ml="2">
                    {
                        collection === "experiences" ?
                            <ExperienceForm data={emptyExperience} type={myType} />
                            :
                            <ProjectForm data={emptyProject} type={myType} />
                    }
                </Box>
            );
        } else {
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
                                            (val as experienceInterface).company
                                            :
                                            (val as projectInterface).title
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
                            renderTitles(collection === "experiences" ? experiences : projects)
                            : renderCollections
                    }
                </Box>
            </Box>
        </DarkMode>
    );
}
