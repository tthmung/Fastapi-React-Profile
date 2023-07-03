import {
    Box,
    Button,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    IconButton,
    Input,
    InputGroup,
    InputLeftElement,
    Link,
    Stack,
    Textarea,
    useColorModeValue,
    VStack,
    useToast
} from '@chakra-ui/react';
import React from 'react';
import { BsGithub, BsLinkedin, BsPerson } from 'react-icons/bs';
import { MdEmail, MdOutlineEmail, MdLocationOn } from 'react-icons/md';


import Clipboard from '../Components/Clipboard';
import API from '../api';
import { emailData } from '../Components/Interface';

export default function Footer() {

    const [name, setName] = React.useState<string>("");
    const [email, setEmail] = React.useState<string>("");
    const [description, setDescription] = React.useState<string>("");

    const toast = useToast();

    const handleSubmit = () => {
        const api = new API();

        const data : emailData = {
            name: name,
            email: email,
            message: description
        };

        api.sendEmail(data).then((e) => {
            if (e) {
                if (e.status === 200) {
                    toast({
                        title: "Thank you I will get back to you ASAP.",
                        status: "success",
                        isClosable: true,
                    });
                } else {
                    toast({
                        title: "Error in sending mail.",
                        status: "error",
                        isClosable: true,
                    });
                }
            }
        });
    }

    return (
        <Flex
            align="center"
            justify="center"
            id="Contact"
        >
            <Box
                borderRadius="lg"
                p={{ base: 5, lg: 16 }}>
                <Box>
                    <VStack spacing={{ base: 4, md: 8, lg: 20 }}>
                        <Heading
                            fontSize={{
                                base: '4xl',
                                md: '5xl',
                            }}>
                            Get in Touch
                        </Heading>

                        <Stack
                            spacing={{ base: 4, md: 8, lg: 20 }}
                            direction={{ base: 'column', md: 'row' }}>
                            <Stack
                                align="center"
                                justify="space-around"
                                direction={{ base: 'row', md: 'column' }}>

                                <Clipboard
                                    toCopy="tthmung@mtu.edu"
                                    icon={MdEmail}
                                    type='Email'
                                />

                                <Clipboard
                                    toCopy="Battle Creek, MI"
                                    icon={MdLocationOn}
                                    type='Location'
                                />


                                <Link href="https://github.com/tthmung" target="_blank" referrerPolicy="no-referrer">
                                    <IconButton
                                        aria-label="github"
                                        variant="ghost"
                                        size="lg"
                                        fontSize="3xl"
                                        icon={<BsGithub />}
                                        _hover={{
                                            bg: 'blue.500',
                                            color: useColorModeValue('white', 'gray.700'),
                                        }}
                                        isRound
                                    />
                                </Link>

                                <Link href="https://www.linkedin.com/in/thawng-hmung" target="_blank" referrerPolicy="no-referrer">
                                    <IconButton
                                        aria-label="linkedin"
                                        variant="ghost"
                                        size="lg"
                                        icon={<BsLinkedin size="28px" />}
                                        _hover={{
                                            bg: 'blue.500',
                                            color: useColorModeValue('white', 'gray.700'),
                                        }}
                                        isRound
                                    />
                                </Link>
                            </Stack>

                            <Box
                                bg={useColorModeValue('white', 'gray.700')}
                                borderRadius="lg"
                                p={8}
                                color={useColorModeValue('gray.700', 'whiteAlpha.900')}
                                shadow="base"
                                width={{ base: "auto", md: "lg" }}
                            >
                                <form onSubmit={handleSubmit}>
                                    <VStack spacing={5}>
                                        <FormControl isRequired>
                                            <FormLabel>Name</FormLabel>

                                            <InputGroup>
                                                <InputLeftElement children={<BsPerson />} />
                                                <Input
                                                    type="text"
                                                    name="name"
                                                    placeholder="Your Name"
                                                    onChange={(e) => setName(e.target.value)} />
                                            </InputGroup>
                                        </FormControl>

                                        <FormControl isRequired>
                                            <FormLabel>Email</FormLabel>

                                            <InputGroup>
                                                <InputLeftElement children={<MdOutlineEmail />} />
                                                <Input
                                                    type="email"
                                                    name="email"
                                                    placeholder="Your Email"
                                                    onChange={(e) => setEmail(e.target.value)}
                                                />
                                            </InputGroup>
                                        </FormControl>

                                        <FormControl isRequired>
                                            <FormLabel>Message</FormLabel>

                                            <Textarea
                                                name="message"
                                                placeholder="Your Message"
                                                rows={6}
                                                resize="none"
                                                onChange={(e) => setDescription(e.target.value)}
                                            />
                                        </FormControl>

                                        <Button
                                            colorScheme="blue"
                                            bg="blue.400"
                                            color="white"
                                            type='submit'
                                            _hover={{
                                                bg: 'blue.500',
                                            }}
                                        >
                                            Send Message
                                        </Button>

                                    </VStack>
                                </form>
                            </Box>
                        </Stack>
                    </VStack>
                </Box>
            </Box>
        </Flex>
    );
}
