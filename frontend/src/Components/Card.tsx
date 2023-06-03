import React, { useState, useRef, useEffect } from 'react';
import {
    Card,
    CardBody,
    Image,
    Stack,
    Heading,
    Text,
    Flex,
    Box,
    useColorModeValue
} from "@chakra-ui/react";

import { experienceInterface, projectInterface } from './Interface';

interface componentProps {
    data: experienceInterface | projectInterface;
    bg: string;
    type: string;
}

export default function
    ExperienceCard(props: componentProps) {

        const [isDivSmaller, setIsDivSmaller] = useState<boolean>(false);
        const divRef = useRef<HTMLDivElement>(null);

        // Check if the card width is smaller than screen width
        useEffect(() => {
          const handleResize = () => {
            const screenWidth: number = window.innerWidth;
            const divWidth: number = divRef.current?.offsetWidth || 0;
            const isSmaller: boolean = divWidth < screenWidth / 2;
            setIsDivSmaller(isSmaller);
          };

          handleResize();

          window.addEventListener('resize', handleResize);

          return () => {
            window.removeEventListener('resize', handleResize);
          };
        }, []);

    return (
        <Card
            ref={divRef}
            maxW={"full"}
            minW={"50%"}
            borderRadius={"3xl"}
            bg={props.bg}
            transition={"transform 0.3s"}
            _hover={{ transform: "scale(1.02)", cursor: "pointer" }}
            onClick={() => alert("Clicked")}
        >
            <CardBody
                padding={"0"}
            >
                <Box
                    paddingTop={{base: "4", '2xl': "36"}}
                    paddingX={{base: "4", '2xl': "36"}}
                >
                    <Image
                        src={require('../static/SciQuel-Home.png')}
                        alt='Green double couch with wooden legs'
                        borderTopRadius={'3xl'}
                    />
                </Box>
                <Stack
                    spacing='3'
                    borderTopRadius={"xl"}
                    borderBottomRadius={"3xl"}
                    bg={useColorModeValue("white", "#1F2937")}
                    padding={"5"}
                >
                    <Heading size='md'>SciQuel</Heading>
                    <Text fontSize={{base: "sm", lg: "2xl"}}>
                        Web Developer Intern
                    </Text>
                    <Flex
                    justifyContent={"space-between"}
                    alignItems={{base: isDivSmaller ? "" : "center", md: "center"}}
                    flexWrap={"nowrap"}
                    flexDirection={{base: isDivSmaller ? "column" : "row", md: "row"}}
                    >
                        <Text fontSize={{base: "sm", lg: "2xl"}}>
                            {props.type}
                        </Text>
                        <Text fontSize={{base: "sm", lg: "2xl"}}>
                            Feb 2023 - May 2023
                        </Text>
                    </Flex>
                </Stack>
            </CardBody>
        </Card>
    );
}
