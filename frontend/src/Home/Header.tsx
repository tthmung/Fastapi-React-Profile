import { ReactNode } from "react";
import {
    Box,
    Flex,
    Avatar,
    Link,
    Button,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuDivider,
    useColorModeValue,
    Stack,
    HStack,
    useColorMode,
    Center,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";

const Links = [
    { name: "Experiences", href: "#Experiences" },
    { name: "Projects", href: "#Projects" }
];

const Connects = [
    { name: "Linkedin", href: "https://www.linkedin.com/in/thawng-hmung" },
    { name: "Github", href: "https://github.com/tthmung" },
    { name: "Gmail", href: "mailto: tthmung@mtu.edu" }
];

const NavLink = ({ children, linkIndex }: { children: ReactNode, linkIndex: string }) => (
    <Link
        px={2}
        py={1}
        rounded={"md"}
        _hover={{
            textDecoration: "none",
            bg: useColorModeValue("gray.200", "gray.700"),
        }}
        href={linkIndex}
    >
        {children}
    </Link>
);

export default function Header() {
    const { colorMode, toggleColorMode } = useColorMode();
    return (
        <>
            <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
                <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
                    <Flex>
                        <Link
                            href="/">
                            <Avatar
                                size={"sm"}
                                src={"https://api.dicebear.com/6.x/avataaars/svg?seed=Sasha&accessories=sunglasses&eyebrows=default,defaultNatural,flatNatural,raisedExcited,raisedExcitedNatural&eyes=default,happy&facialHair[]&facialHairProbability=0&hairColor=2c1b18,4a312c&mouth=smile&skinColor=f8d25c,fd9841&top=dreads02,shortFlat,hat"}
                            />
                        </Link>
                        <HStack as={'nav'}
                            marginLeft={2}
                            spacing={1}
                            display={{ base: 'flex' }}>
                            {Links.map((link) => (
                                <NavLink key={link.name} linkIndex={link.href}>{link.name}</NavLink>
                            ))}
                        </HStack>
                    </Flex>
                    <Flex alignItems={"center"}>
                        <Stack direction={"row"} spacing={4}>
                            <Button onClick={toggleColorMode}>
                                {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
                            </Button>

                            <Menu>
                                <MenuButton
                                    as={Button}
                                    rounded={"full"}
                                    variant={"link"}
                                    cursor={"pointer"}
                                    minW={0}
                                >
                                    <Box>Connect</Box>
                                </MenuButton>
                                <MenuList alignItems={"center"}>
                                    <br />
                                    <Center>
                                        <Avatar
                                            size={"2xl"}
                                            src={"https://api.dicebear.com/6.x/avataaars/svg?seed=Sasha&accessories=sunglasses&eyebrows=default,defaultNatural,flatNatural,raisedExcited,raisedExcitedNatural&eyes=default,happy&facialHair[]&facialHairProbability=0&hairColor=2c1b18,4a312c&mouth=smile&skinColor=f8d25c,fd9841&top=dreads02,shortFlat,hat"}
                                        />
                                    </Center>
                                    <MenuDivider />
                                    {Connects.map((link) => (
                                        <MenuItem>
                                            <Link href={link.href} _hover={{ textDecoration: "none" }}>
                                                {link.name}
                                            </Link>
                                        </MenuItem>
                                    ))}
                                </MenuList>
                            </Menu>
                        </Stack>
                    </Flex>
                </Flex>
            </Box>
        </>
    );
}