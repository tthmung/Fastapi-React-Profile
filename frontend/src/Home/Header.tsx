import { useState } from "react";
import {
  Box,
  Flex,
  Link,
  Button,
  useColorModeValue,
  Stack,
  useColorMode,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon, TriangleDownIcon } from "@chakra-ui/icons";
import { motion } from "framer-motion";

const IconButton = motion(Button);

const links = [
  { name: "Home", href: "#Home", light: "#", dark: "#" },
  { name: "Experiences", href: "#Experiences", light: "#", dark: "#" },
  { name: "Work", href: "#Work", light: "#", dark: "#" },
  { name: "Contact", href: "#Contact", light: "#", dark: "#" },
];

export default function Header() {
  const { colorMode, toggleColorMode } = useColorMode();
  const [menu, setMenu] = useState(false); // Set initial value of the menu state
  const [rotateAngle, setRotateAngle] = useState(0);

  const handleIconClick = () => {
    setRotateAngle((prevAngle) => prevAngle + 180);
    setMenu(!menu);
  };


  const buttonVariants = {
    tap: {
      x: "50%",
    },
    untap: {
      x: 0,
    },
  };

  const renderMenu = (
    <Flex
      top={0}
      left={0}
      right={0}
      bottom={0}
      height={"100vh"}
      position={"fixed"}
      flexDirection={"column"}
      justifyContent={"center"}
      alignItems={"center"}
      width={"100vw"}
      background={useColorModeValue("rgba(255, 255, 255, .7)", "rgba(26, 32, 44, .8)")}
      backdropFilter={"blur(10px)"}
      overflow={"hidden"}
      transition={".2s"}
    >
      {links.map((link) => (
        <Link key={link.name} href={link.href} _dark={{ bg: "" }} _light={{ bg: "" }}>
          {link.name}
        </Link>
      ))}
    </Flex>
  );

  return (
    <>
      <Box bg={useColorModeValue("gray.100", "gray.900")} w={"full"}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"} w={"80%"} m={"auto"}>
          <Link href="/" fontSize={"lg"}>
            Thawng Hmung
          </Link>
          <Flex alignItems={"center"} top={0} zIndex={10}>
            <Stack direction={"row"} spacing={{ base: "1", md: "4" }} position={"fixed"}>
              <IconButton
                onClick={toggleColorMode}
                as={motion.button}
                variants={buttonVariants}
                whileTap="tap"
                transition={{ duration: 0.2 }}
              >
                {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
              </IconButton>
              <Button zIndex={"sticky"} onClick={() => handleIconClick()}>
                <TriangleDownIcon
                  transform={`rotate(${rotateAngle}deg)`}
                  transition={".2s"}
                  cursor="pointer"
                />
              </Button>
            </Stack>
          </Flex>
        </Flex>
      </Box>
      {!menu ? "" : renderMenu}
    </>
  );
}
