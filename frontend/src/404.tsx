import React from "react";
import { useNavigate } from "react-router-dom";
import {
    Box,
    Flex,
    Text,
    Button,
    useColorModeValue
} from "@chakra-ui/react";


export default function PageNotFound() {

    const navigate = useNavigate();

    return (
        <Flex
            height={"100vh"}
            width={"100wh"}
            justifyContent={"center"}
            alignItems={"center"}
            flexDirection={"column"}
            bgImage={useColorModeValue(require("./static/day.jpg"), require("./static/night.jpg"))}
            bgRepeat={"no-repeat"}
            bgSize={"cover"}
        >
            <Box>
                <Text
                    fontSize={"9xl"}
                    fontWeight={"extrabold"}
                >
                    404
                </Text>
            </Box>
            <Box>
                <Button colorScheme={"cyan"} onClick={() => navigate("/")}>
                    Home
                </Button>
            </Box>
        </Flex>
    );
}
