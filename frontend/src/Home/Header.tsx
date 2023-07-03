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
import './Home.css';

const IconButton = motion(Button);
const AvatarMotion = motion(TriangleDownIcon);

const links = [
  { name: "Home", href: "#Home", bg: "#FA8072", emoji: "🎮", textColor: "#5e302b" },
  { name: "Experience", href: "#Experiences", bg: "#f6c6ea", emoji: "🥑", textColor: "#5c4a58" },
  { name: "Contact", href: "#Contact", bg: "#ffe66e", emoji: "⚽", textColor: "#605629" },
  { name: "Resume", href: require("../static/Redacted_Resume.pdf"), bg: "#9fe6a0", emoji: "🔮", textColor: "#3c563c", target: "_blank" },
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
    <>
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
        gap={"4"}
        animation={"fade-in .6s cubic-bezier(.23,1,.32,1) both"}
        opacity={0}
        zIndex={"2"}
      >
        {links.map((link) => (
          <Link
            key={link.name}
            href={link.href}
            bg={link.bg}
            py={"2"}
            px={"8"}
            borderRadius={"3xl"}
            textColor={link.textColor}
            fontSize={{ base: "3xl", md: "6xl" }}
            transition={".4s cubic-bezier(.68, -.6, .32, 1.6)"}
            _hover={{ textDecoration: "none", py: "0", px: "24", textColor: "black" }}
            fontWeight={"semibold"}
            target={link.target}
            rel="noopener noreferrer"
            onClick={() => handleIconClick()}
          >
            <span>
              {link.emoji}
            </span>
            {link.name}
          </Link>
        ))}

      </Flex>
    </>
  );

  return (
    <>
      <Box bg={useColorModeValue("gray.100", "gray.900")} w={"full"}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"} w={"80%"} m={"auto"}>
          <Link href="/" fontSize={"lg"}>
            Thawng Hmung <span></span>
          </Link>
          <Flex alignItems={"center"} zIndex={10} justifyContent={"flex-end"}>
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
              <Button
                onClick={() => handleIconClick()}
              >
                <AvatarMotion
                  animate={{ rotate: rotateAngle }}
                  transition={{ type: "spring" }}
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
