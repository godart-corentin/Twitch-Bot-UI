import { useEffect, useState } from "react";
import {
  Avatar,
  Fade,
  Flex,
  Heading,
  Text,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { menu } from "../lib/menu";
import { User } from "../lib/types";
import { Link } from "react-router-dom";
import useWindowDimensions from "../hooks/window";

type SidebarProps = {
  routePath: string;
  user: User | null;
};

export const Sidebar = ({ routePath, user }: SidebarProps) => {
  const [isOpened, setIsOpened] = useState(true);
  const [animationDone, setAnimationDone] = useState(false);

  const bgUser = useColorModeValue("gray.100", "dark.800");

  const { width } = useWindowDimensions();

  useEffect(() => {
    const timeout = setTimeout(() => {
      setAnimationDone(!isOpened);
    }, 50);

    return () => {
      clearTimeout(timeout);
    };
  }, [isOpened]);

  useEffect(() => {
    if (width < 1000) {
      setIsOpened(false);
    }
  }, [width]);

  const displayMenu = () => {
    return (
      <>
        {menu.map((item, idx) => (
          <Link
            key={idx}
            to={item.route.path}
            style={{
              textDecoration: "none",
              color: routePath === item.route.path ? "#F6AD55" : undefined,
            }}
          >
            <Flex alignItems="center" h="30px">
              <FontAwesomeIcon icon={item.icon} style={{ width: 20 }} />{" "}
              <Fade in={isOpened}>
                <Text
                  as="span"
                  ml=".5em"
                  display={animationDone ? "none" : "inline"}
                >
                  {item.route.name}
                </Text>
              </Fade>
            </Flex>
          </Link>
        ))}
      </>
    );
  };

  return (
    <Flex
      h="100%"
      w={isOpened ? "250px" : "100px"}
      p="3em 1em"
      bg={useColorModeValue("white", "dark.700")}
      flexDirection="column"
      justifyContent="space-between"
      position="relative"
      transition="width 0.3s ease-out"
      boxShadow="xl"
    >
      <Flex flexDirection="column" alignItems="center">
        <Flex alignItems="center" textAlign="center" mb="3em" h="30px">
          <FontAwesomeIcon icon={["fab", "twitch"]} size="lg" color="#F6AD55" />
          <Fade in={isOpened}>
            <Link to="/dashboard" style={{ color: "#F6AD55" }}>
              <Heading
                fontSize="xl"
                fontWeight="bold"
                ml=".25em"
                display={animationDone ? "none" : "inline"}
              >
                UIBot
              </Heading>
            </Link>
          </Fade>
        </Flex>
        <VStack spacing="2em" alignItems="flex-start" p="1em">
          {displayMenu()}
        </VStack>
      </Flex>
      {user && (
        <Flex
          justifyContent={animationDone ? "center" : "space-around"}
          alignItems="center"
          p="1em"
          bg={bgUser}
          borderRadius="6px"
        >
          <Flex alignItems="center">
            <Avatar size="sm" src={user.picture} name={user.name} />
            <Fade in={isOpened}>
              <Text
                as="span"
                ml=".5em"
                display={animationDone ? "none" : "inline"}
              >
                {user.name}
              </Text>
            </Fade>
          </Flex>
          <Fade in={isOpened}>
            <Link
              to="/dashboard/disconnect"
              style={{
                display: animationDone ? "none" : "inline",
              }}
            >
              <FontAwesomeIcon icon="sign-out-alt" size="1x" />
            </Link>
          </Fade>
        </Flex>
      )}
      <Flex
        position="absolute"
        top="50%"
        right="-30px"
        w="30px"
        h="30px"
        zIndex={3}
        bg={useColorModeValue("gray.200", "dark.900")}
        boxShadow="sm"
        cursor="pointer"
        justifyContent="center"
        alignItems="center"
        borderRadius="0 50% 50% 0"
        onClick={() => setIsOpened((state) => !state)}
        sx={{
          "@media (max-width: 999px)": {
            display: "none",
          },
        }}
      >
        <FontAwesomeIcon icon="chevron-right" width={25} height={25} />
      </Flex>
    </Flex>
  );
};
