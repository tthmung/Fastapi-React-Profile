import React, { useState, useEffect } from "react";
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
import API from "../api"
import api_helper from "../api_helper";

interface componentProps {
    data: any;
    type: string;
}

export default function ExperienceForm(props: componentProps) {

    const navigate = useNavigate();
    const helper = new api_helper();
    const api = new API();

    const [company, setCompany] = useState<string>(props.data.company);
    const [position, setPosition] = useState<string>(props.data.position);
    const [startDate, setStartDate] = useState<string>(helper.convertToInput(new Date(props.data.startDate)));
    const [endDate, setEndDate] = useState<string>(props.data.endDate ? helper.convertToInput(new Date(props.data.endDate)) : "");
    const [description, setDescription] = useState<string>(props.data.description);
    const [selectedFile, setSelectedFile] = useState<any>();

    console.log(selectedFile.name);

    const handleSubmit = () => {
        if (props.type === "new") {
            const data = {
                company: company,
                position: position,
                startDate: startDate,
                endDate: endDate,
                description: description,
                img: selectedFile.name
            }
        }
    }

    const handleDelete = () => {

    }

    return (
        <Flex width={"50%"} justifyContent={"space-between"}>
            <Box>
                <Button onClick={() => navigate(-1)}>
                    Back
                </Button>
            </Box>
            <Box width={"50%"}>
                <form onSubmit={handleSubmit}>
                    <Stack spacing={4}>
                        <FormControl isRequired>
                            <FormLabel>Company</FormLabel>
                            <Input defaultValue={company} onChange={(e) => setCompany(e.target.value)} />
                        </FormControl>
                        <FormControl isRequired>
                            <FormLabel>Position</FormLabel>
                            <Input defaultValue={position} onChange={(e) => setPosition(e.target.value)}/>
                        </FormControl>
                        <FormControl isRequired>
                            <FormLabel>Start Date</FormLabel>
                            <Input type="date" defaultValue={startDate} onChange={(e) => setStartDate(e.target.value)}/>
                        </FormControl>
                        <FormControl>
                            <FormLabel>End Date</FormLabel>
                            <Input type="date" defaultValue={endDate} onChange={(e) => setEndDate(e.target.value)}/>
                        </FormControl>
                        <FormControl isRequired>
                            <FormLabel>Description</FormLabel>
                            <Textarea size={"md"} defaultValue={description} rows={6} onChange={(e) => setDescription(e.target.value)}/>
                        </FormControl>
                        <FormControl isRequired>
                            <FormLabel>Image</FormLabel>
                            <Input type="file" accept="image/*" width={"min-content"} border={"none"}
                            onChange={(e) => setSelectedFile(e.target.files ? e.target.files[0] : null)}
                            />
                        </FormControl>
                        <Flex justifyContent={"space-between"}>
                            <Input type="submit" value={props.type === "new" ? "Add New" : "Update"} width={"24"} bg={"blue.300"} _hover={{ bg: "blue.400" }} textColor={"black"} />
                            {props.type === "new" ? "" : <Input type="button" value="Delete" width={"24"} bg={"red.300"} _hover={{ bg: "red.400" }} textColor={"black"} />}
                        </Flex>
                    </Stack>
                </form>
            </Box>
        </Flex>
    );
}
