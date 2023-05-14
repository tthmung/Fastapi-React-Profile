import {
    Spinner,
    Flex,
    Text,
    Box
} from "@chakra-ui/react";

export default function Loading() {

    return (
        <Flex justifyContent={"center"} alignItems={"center"} height={"100vh"} width={"100wh"}>
            <Box>
                <Spinner color="blue.500"   thickness='2px' size='xl' />
                <Text textAlign={"center"}>Loading...</Text>
            </Box>
        </Flex>
    );
}
