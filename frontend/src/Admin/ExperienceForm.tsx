import React from "react";
import { useNavigate } from 'react-router-dom';
import {
    Box,
    Button,
    Flex,
    FormControl,
    FormLabel,
    Input,
    Textarea,
    InputLeftAddon,
    InputGroup,
    Stack
} from '@chakra-ui/react';
import api_helper from "../api_helper";

interface componentProps {
    data: any;
    type: string;
}

export default function ExperienceForm(props: componentProps) {

    const navigate = useNavigate();
    const helper = new api_helper();


    const company = props.data.company;
    const position = props.data.position;
    const startDate = helper.convertToInput(new Date(props.data.startDate));
    const endDate = props.data.endDate ? helper.convertToInput(new Date(props.data.endDate)) : "";
    const description = props.data.description;

    const handleSubmit = () => {

    }

    return (
        <Flex width={"50%"} justifyContent={"space-between"}>
            <Box>
                <Button onClick={() => navigate(-1)}>
                    Back
                </Button>
            </Box>
            <Box width={"50%"}>
                <form>
                    <Stack spacing={4}>
                        <FormControl isRequired>
                            <FormLabel>Company</FormLabel>
                            <Input defaultValue={company} />
                        </FormControl>
                        <FormControl isRequired>
                            <FormLabel>Position</FormLabel>
                            <Input defaultValue={position} />
                        </FormControl>
                        <FormControl isRequired>
                            <FormLabel>Start Date</FormLabel>
                            <Input type="date" defaultValue={startDate} />
                        </FormControl>
                        <FormControl>
                            <FormLabel>End Date</FormLabel>
                            <Input type="date" defaultValue={endDate} />
                        </FormControl>
                        <FormControl isRequired>
                            <FormLabel>Description</FormLabel>
                            <Textarea size={"md"} defaultValue={description} />
                        </FormControl>
                        <FormControl isRequired>
                            <FormLabel>Image</FormLabel>
                            <Input type="file" accept="image/*" />
                        </FormControl>
                    </Stack>
                </form>
            </Box>
        </Flex>
    );
}
