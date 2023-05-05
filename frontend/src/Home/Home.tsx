import React, { useState, useEffect } from 'react';
import API from '../api'
import api_helper from '../api_helper';
import { Box } from '@chakra-ui/react';
import Header from './Header';


export default function Home() {

    const [back, setBack] = useState({});
    const api_help = new api_helper()

    useEffect(() => {
        const api = new API();

        const fetchData = async () => {
            let response = await api.postExperience();
            var date = new Date(response.data.startDate);
            console.log(api_help.getDate(date))
            setBack(response.data);
        }


        fetchData();
    }, [])

    return (
        <>
            <Header />
        </>
    );
}
