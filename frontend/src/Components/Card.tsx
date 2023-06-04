import React, { useState, useRef, useEffect } from "react";
import {
    Card,
    CardBody,
    Image,
    Stack,
    Heading,
    Text,
    Flex,
    Box,
    useColorModeValue,
} from "@chakra-ui/react";

import { experienceInterface, projectInterface } from "./Interface";
import api_helper from "../api_helper";

interface componentProps {
    data: experienceInterface | projectInterface;
    bg: string;
    type: string;
}

export default function ExperienceCard(props: componentProps) {
    const [isDivSmaller, setIsDivSmaller] = useState<boolean>(false);
    const divRef = useRef<HTMLDivElement>(null);
    const helper = new api_helper();

    // Check if the card width is smaller than screen width
    useEffect(() => {
        const handleResize = () => {
            const screenWidth: number = window.innerWidth;
            const divWidth: number = divRef.current?.offsetWidth || 0;
            const isSmaller: boolean = divWidth < screenWidth / 2;
            setIsDivSmaller(isSmaller);
        };

        handleResize();

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);


    const endDate = (props.data as experienceInterface)?.endDate;
    const formattedEndDate = endDate
        ? helper.getDate(new Date(endDate))
        : "Current";


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
            <CardBody padding={"0"}>
                <Flex
                    paddingTop={{ base: "4", "2xl": "24" }}
                    paddingX={{ base: "4", "2xl": "24" }}
                    justifyContent={"center"}
                    alignContent={"baseline"}
                    height={"sm"}
                >
                    <Image
                        src={require(`../uploads/${props.data._id}/${props.data.img}`)}
                        alt={props.data._id}
                        borderTopRadius={"3xl"}
                    />
                </Flex>
                <Stack
                    spacing="3"
                    borderTopRadius={"xl"}
                    borderBottomRadius={"3xl"}
                    bg={useColorModeValue("white", "#1F2937")}
                    padding={"5"}
                >
                    <Heading size="md">
                        {props.type === "Experience"
                            ? (props.data as experienceInterface).company
                            : (props.data as projectInterface).title}
                    </Heading>

                    {props.type === "Experience" ? (
                        <Text fontSize={{ base: "sm", lg: "xl" }}>
                            {(props.data as experienceInterface).position}
                        </Text>
                    ) : (
                        ""
                    )}
                    <Flex
                        justifyContent={"space-between"}
                        alignItems={{ base: isDivSmaller ? "" : "center", md: "center" }}
                        flexWrap={"nowrap"}
                        flexDirection={{ base: isDivSmaller ? "column" : "row", md: "row" }}
                    >
                        <Text fontSize={{ base: "sm", lg: "xl" }}>{props.type}</Text>
                        {props.type === "Experience" ? (
                            <Text fontSize={{ base: "sm", lg: "xl" }}>
                                {`
                                    ${helper.getDate(
                                    new Date(
                                        (props.data as experienceInterface).startDate
                                    )
                                )}
                                    -
                                    ${formattedEndDate}`}
                            </Text>
                        ) : (
                            ""
                        )}
                    </Flex>
                </Stack>
            </CardBody>
        </Card>
    );
}
