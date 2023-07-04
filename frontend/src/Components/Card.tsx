import React, { useState, useRef, useEffect } from "react";
import '@fontsource-variable/montserrat';
import {
    Card,
    CardBody,
    Image,
    Stack,
    Heading,
    Text,
    Flex,
    useColorModeValue,
    useDisclosure,
    Modal,
    Button,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay
} from "@chakra-ui/react";

import { experienceInterface, projectInterface } from "./Interface";
import api_helper from "../api_helper";

interface componentProps {
    data: experienceInterface | projectInterface;
    bg: string;
    type: string;
}

export default function ExperienceCard(props: componentProps) {

    console.log(process.env.REACT_APP_URL);

    const [isDivSmaller, setIsDivSmaller] = useState<boolean>(false);

    const { isOpen, onOpen, onClose } = useDisclosure();

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

    const title = props.type === "Experience"
        ? (props.data as experienceInterface).company
        : (props.data as projectInterface).title;

    const endDate = (props.data as experienceInterface)?.endDate;
    const formattedEndDate = endDate
        ? helper.getDate(new Date(endDate))
        : "Current";

    const openTab = (href: string) => {
        window.open(href, "_blank");
    }

    return (
        <>
            <Modal isCentered isOpen={isOpen} onClose={onClose} size={"3xl"}>
                <ModalOverlay
                    background={useColorModeValue("rgba(255, 255, 255, .7)", "rgba(26, 32, 44, .8)")}
                    backdropFilter='blur(10px) hue-rotate(-0.25turn)'
                />
                <ModalContent background={props.bg}>
                    <ModalHeader fontFamily={"'Montserrat Variable', sans-serif"}>
                        {title}
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Text fontFamily={"'Montserrat Variable', sans-serif"} fontWeight={"500"}>
                            {props.data.description.split('\n').map((line, index) => (
                                <React.Fragment key={index}>
                                    {line}
                                    <br />
                                </React.Fragment>
                            ))}
                        </Text>
                    </ModalBody>
                    <ModalFooter>
                        {props.type === "Project" ?
                            (props.data as projectInterface).link !== "" ?
                                <Button colorScheme='blue' mr={3} onClick={() => openTab((props.data as projectInterface).link)}>
                                    Link
                                </Button>
                                :
                                ""
                            :
                            ""
                        }
                        <Button onClick={onClose}>Close</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
            <Card
                ref={divRef}
                maxW={"full"}
                minW={"50%"}
                borderRadius={"3xl"}
                bg={props.bg}
                transition={"transform 0.3s"}
                _hover={{ transform: "scale(1.02)", cursor: "pointer" }}
                onClick={() => onOpen()}
            >
                <CardBody padding={"0"}>
                    <Flex
                        paddingTop={{ base: "4", "2xl": "24" }}
                        paddingX={{ base: "4", "2xl": "24" }}
                        justifyContent={"center"}
                        alignContent={"baseline"}
                        height={{
                            base: isDivSmaller ? "100px" : "auto",
                            sm: isDivSmaller ? "sm" : "auto"
                        }}
                    >
                        <Image
                            src={`${process.env.REACT_APP_API_URL}media/${props.data._id}/${props.data.img}`}
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
                            {title}
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
        </>

    );
}
