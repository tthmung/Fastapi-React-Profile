import React, { useState, useEffect } from 'react';
import API from '../api'
import Header from './Header';
import { Box } from '@chakra-ui/react';
import { Console } from 'console';


export default function Admin() {

    const [render, setRender] = useState<boolean>(false);

    const [experiences, setExperiences] = useState({});
    const [Projects, setProjects] = useState({});

    useEffect(() => {
        const api = new API();

        const fetchData = async () => {
            let getExperience = api.getExperience();
            getExperience.then((e) => {
                console.log(e.data)
            })
            setExperiences(getExperience)
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


    const renderLoading = (
        <>

        </>
    );
    return (
        <>
            <Header />
            <Box>
                {}
            </Box>
        </>
    );
}
