import React, { useState, useEffect } from 'react';
import logo from '../logo.svg';
import API from '../api'
import { Box } from '@chakra-ui/react';


export default function Admin() {

    const [back, setBack] = useState<string>('');

    useEffect(() => {
        const api = new API();

        const fetchData = async () => {
            let respose = await api.test();
            console.log(respose.data);
            setBack(respose.data.message);
        }


        fetchData();

    }, [])

    return (
        <>
            <Box>
            </Box>
        </>
    );
}
