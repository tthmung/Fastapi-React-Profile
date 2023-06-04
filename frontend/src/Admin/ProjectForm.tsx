import React, { useState, FormEvent, useEffect, useMemo } from "react";
import { useNavigate } from 'react-router-dom';
import {
    Box,
    Button,
    Flex,
    FormControl,
    FormLabel,
    Input,
    Textarea,
    Stack,
    useToast
} from '@chakra-ui/react';
import API from "../api"
import api_helper from "../api_helper";
import Loading from "../Components/Loading";

import { componentProps, projectData, projectInterface } from "../Components/Interface";

export default function ProjectForm(props: componentProps) {

    const navigate = useNavigate();
    const helper = useMemo(() => new api_helper(), []);
    const api = new API();
    const toast = useToast();

    const [project, setProject] = useState<string>("");
    const [orderDate, setOrderDate] = useState<string>("");
    const [link, setLink] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [selectedFile, setSelectedFile] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(false);


    useEffect(() => {
        if (props.data) {
            setProject((props.data as projectInterface).title);
            setOrderDate(helper.convertToInput(new Date((props.data as projectInterface).orderDate)));
            setDescription((props.data as projectInterface).description);
            setLink((props.data as projectInterface).link);
        } else {
            navigate("/404");
        }
    }, [props.data, helper, navigate]);


    const resultOutput = (msg: string, code: "success" | "error" | "warning" | "info" | "loading" | undefined) => {
        setLoading(false);
        toast({
            title: msg,
            status: code,
            isClosable: true,
        });
        navigate(-1);
    }

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);

        if (props.type === "new") {

            const formData = new FormData();
            formData.append('file', selectedFile);

            const data: projectData = {
                title: project,
                orderDate: new Date(orderDate).toISOString(),
                description: description,
                img: "",
            }
        }
    }

    const handleDelete = () => {
        setLoading(true);
        api.deleteFile(props.data._id, props.data.img).then(() => {
            return api.deleteProject(props.data._id);
        }).then((e) => {
            if (e.status === 202) {
                resultOutput("successfully deleted", "success");
            } else {
                resultOutput("error in deleting", "error");
            }
        });
    }

    return (
        <>
            {loading
                ?
                <Loading />
                :
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
                                    <FormLabel>Project Title</FormLabel>
                                    <Input defaultValue={project} onChange={(e) => setProject(e.target.value)} />
                                </FormControl>
                                <FormControl isRequired>
                                    <FormLabel>Order date</FormLabel>
                                    <Input type="date" defaultValue={orderDate} onChange={(e) => setOrderDate(e.target.value)} />
                                </FormControl>
                                <FormControl isRequired>
                                    <FormLabel>Description</FormLabel>
                                    <Textarea size={"md"} defaultValue={description} rows={6} onChange={(e) => setDescription(e.target.value)} />
                                </FormControl>
                                <FormControl>
                                    <FormLabel>Link</FormLabel>
                                    <Input type="url" defaultValue={link} onChange={(e) => setLink(e.target.value)} />
                                </FormControl>
                                {props.type === "new" ?
                                    <FormControl isRequired>
                                        <FormLabel>Image</FormLabel>
                                        <Input type="file" accept="image/*" width={"min-content"} border={"none"}
                                            onChange={(e) => setSelectedFile(e.target.files ? e.target.files[0] : null)}
                                        />
                                    </FormControl>
                                    :
                                    <FormControl>
                                        <FormLabel>Image</FormLabel>
                                        <Input type="file" accept="image/*" width={"min-content"} border={"none"}
                                            onChange={(e) => setSelectedFile(e.target.files ? e.target.files[0] : null)}
                                        />
                                    </FormControl>}
                                <Flex justifyContent={"space-between"}>
                                    <Input type="submit" value={props.type === "new" ? "Add New" : "Update"} width={"24"} bg={"blue.300"} _hover={{ bg: "blue.400" }} textColor={"black"} />
                                    {props.type === "new" ? "" : <Input type="button" value="Delete" width={"24"} bg={"red.300"} _hover={{ bg: "red.400" }} textColor={"black"} onClick={handleDelete} />}
                                </Flex>
                            </Stack>
                        </form>
                    </Box>
                </Flex>
            }
        </>
    );
}
