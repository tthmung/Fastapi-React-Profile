import React, { useState } from 'react';
import { Card, CardBody, Image, Stack, Heading, Text, } from "@chakra-ui/react";

import { componentProps } from './Interface';

export default function ExperienceCard(props: componentProps) {

    const [show, setShow] = useState();


    return (
        <Card maxW={"full"} minW={"50%"} borderRadius={"3xl"}>
            <CardBody>
                <Image
                    src='https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
                    alt='Green double couch with wooden legs'
                    borderRadius='3xl'
                />
                <Stack mt='6' spacing='3'>
                    <Heading size='md'>Living room Sofa</Heading>
                    <Text>
                        This sofa is perfect for modern tropical spaces, baroque inspired
                        spaces, earthy toned spaces and for people who love a chic design with a
                        sprinkle of vintage design.
                    </Text>
                </Stack>
            </CardBody>
        </Card>
    );
}
