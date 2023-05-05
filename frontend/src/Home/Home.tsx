import React, { useState, useEffect } from 'react';
import API from '../api'
import { Box } from '@chakra-ui/react';
import Header from './Header';


export default function Home() {

    const [back, setBack] = useState<string>('');

    useEffect(() => {
        const api = new API();

        const fetchData = async () => {
            let response = await api.test();
            setBack(response.data.message);
        }


        fetchData();
        console.log(back);
    }, [])

    return (
        <>
            <Header />
            {back}
        </>
    );
}
