import { useContext, useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Box, Flex, useColorModeValue } from "@chakra-ui/react";

import { ColorModeSwitcher, Loader } from ".";
import { Sidebar } from "./Sidebar";
import { UserContext } from "../context";
import { getUserData } from "../services/TwitchService";

export const Layout = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { user, setUser } = useContext(UserContext);

  const navigate = useNavigate();
  const location = useLocation();

  const bgMain = useColorModeValue("gray.100", "dark.800");

  useEffect(() => {
    let mounted = true;
    const fetchUser = async () => {
      const { user, error } = await getUserData();
      if (mounted) {
        if (error) {
          navigate("/");
        } else {
          setUser?.(user);
          setIsLoading(false);
        }
      }
    };

    fetchUser();

    return () => {
      mounted = false;
    };
  }, [navigate, setUser]);

  return (
    <Flex h="100vh" w="100%">
      <Sidebar routePath={location.pathname} user={user} />
      <Box as="main" flex={1} p="3em" bg={bgMain} position="relative">
        <ColorModeSwitcher position="absolute" top="1em" right="1em" />
        {isLoading && <Loader />}
        <Outlet />
      </Box>
    </Flex>
  );
};
