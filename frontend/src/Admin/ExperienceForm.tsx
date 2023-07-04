import { useState, FormEvent, useEffect, useMemo } from "react";
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
    useToast,
    Link
} from '@chakra-ui/react';
import API from "../api"
import api_helper from "../api_helper";
import Loading from "../Components/Loading";
import { componentProps, experienceData, experienceInterface } from "../Components/Interface";

export default function ExperienceForm(props: componentProps) {

    const navigate = useNavigate();
    const helper = useMemo(() => new api_helper(), []);
    const api = new API();
    const toast = useToast();

    const [company, setCompany] = useState<string>("");
    const [position, setPosition] = useState<string>("");
    const [startDate, setStartDate] = useState<string>("");
    const [endDate, setEndDate] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [selectedFile, setSelectedFile] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        if (props.data) {
            setCompany((props.data as experienceInterface).company);
            setPosition((props.data as experienceInterface).position);
            setStartDate(helper.convertToInput(new Date((props.data as experienceInterface).startDate)));
            setEndDate((props.data as experienceInterface).endDate ? helper.convertToInput(new Date((props.data as experienceInterface).endDate)) : "");
            setDescription(props.data.description);
        } else {
            navigate("/404");
        }
    }, [helper, navigate, props.data]);

    const resultOutput = (msg: string, code: "success" | "error" | "warning" | "info" | "loading" | undefined) => {
        setLoading(false);
        toast({
            title: msg,
            status: code,
            isClosable: true,
        });
        navigate("/admin/experiences");
    }

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);

        if (props.type === "new") {

            const formData = new FormData();
            formData.append('file', selectedFile);

            const data: experienceData = {
                company: company,
                position: position,
                startDate: new Date(startDate).toISOString(),
                description: description,
                img: "",
            };

            if (endDate !== "") {
                data.endDate = new Date(endDate).toISOString();
            }

            let id = "";

            api.createExperience(data).then((e) => {
                if (e.status === 201) {
                    id = e.data;
                    return api.uploadFile(formData, id);
                } else {
                    throw new Error("Create failed");
                }
            }).then((e) => {
                if (e.status === 201) {
                    data.img = e.data;
                    return api.updateExperience(data, id);
                } else {
                    throw new Error("Img creation failed");
                }
            }
            ).then((e) => {
                if (e.status === 202) {
                    resultOutput("successfully added", "success");
                } else {
                    throw new Error("Update failed");
                }
            }).catch((e) => {
                console.error(e);
                resultOutput("Error adding", "error");
            });
        } else {

            const id = props.data._id;

            const data: experienceData = {
                company: company,
                position: position,
                startDate: new Date(startDate).toISOString(),
                description: description,
                img: props.data.img,
            };


            if (endDate !== "") {
                data.endDate = new Date(endDate).toISOString();
            }

            if (selectedFile) {
                const formData = new FormData();
                formData.append('file', selectedFile);
                api.updateFile(formData, id, props.data.img).then((e) => {
                    if (e.status === 202) {
                        data.img = e.data;
                        return api.updateExperience(data, id);
                    } else {
                        throw new Error("Failed updating file");
                    }
                }).then((e) => {
                    if (e.status === 202) {
                        resultOutput("Update successfully", "success");
                    } else {
                        throw new Error("Update failed");
                    }
                }).catch((e) => {
                    console.error(e);
                    resultOutput("Update error", "error");
                });
            } else {
                api.updateExperience(data, id).then((e) => {
                    if (e.status === 202) {
                        resultOutput("Update successfully", "success");
                    } else {
                        throw new Error("Update failed");
                    }
                }).catch((e) => {
                    console.error(e);
                    resultOutput("Update error", "error");
                });
            }
        }
    }

    const handleDelete = () => {
        setLoading(true);
        api.deleteFile(props.data._id, props.data.img).then(
            () => {
                return api.deleteExperience(props.data._id)
            }
        ).then((e) => {
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
                                    <FormLabel>Company</FormLabel>
                                    <Input defaultValue={company} onChange={(e) => setCompany(e.target.value)} />
                                </FormControl>
                                <FormControl isRequired>
                                    <FormLabel>Position</FormLabel>
                                    <Input defaultValue={position} onChange={(e) => setPosition(e.target.value)} />
                                </FormControl>
                                <FormControl isRequired>
                                    <FormLabel>Start Date</FormLabel>
                                    <Input type="date" defaultValue={startDate} onChange={(e) => setStartDate(e.target.value)} />
                                </FormControl>
                                <FormControl>
                                    <FormLabel>End Date</FormLabel>
                                    <Input type="date" defaultValue={endDate} onChange={(e) => setEndDate(e.target.value)} />
                                </FormControl>
                                <FormControl isRequired>
                                    <FormLabel>Description</FormLabel>
                                    <Textarea size={"md"} defaultValue={description} rows={6} onChange={(e) => setDescription(e.target.value)} />
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
                                        <Link
                                            href={`${process.env.REACT_APP_API_URL}media/${props.data._id}/${props.data.img}`}
                                            target="_blank"
                                            rel="noreferrer"
                                            textColor={"blue.200"}
                                            textDecor={"underline"}
                                        >
                                            Current File
                                        </Link>
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
