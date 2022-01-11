import { useContext, useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Box, Flex, useColorModeValue } from "@chakra-ui/react";

import { ColorModeSwitcher, Loader } from ".";
import { Topbar } from "./Topbar";
import { Sidebar } from "./Sidebar";
import { UserContext } from "../context";
import { getUserData } from "../services/TwitchService";
import useWindowDimensions from "../hooks/window";

export const Layout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [isLoading, setIsLoading] = useState(true);
  const { user, setUser } = useContext(UserContext);

  const [mode, setMode] = useState<"side" | "top">("side");
  const { width } = useWindowDimensions();

  useEffect(() => {
    if (width < 767) {
      setMode("top");
    } else {
      setMode("side");
    }
  }, [width]);

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
    <Flex h="100vh" w="100%" flexDirection={mode === "side" ? "row" : "column"}>
      {mode === "side" ? (
        <Sidebar routePath={location.pathname} user={user} />
      ) : (
        <Topbar routePath={location.pathname} user={user} />
      )}
      <Box
        as="main"
        flex={1}
        p={["1em", "2em", "3em"]}
        bg={useColorModeValue("gray.100", "dark.800")}
        position="relative"
        height="100vh"
        overflowY="auto"
      >
        <ColorModeSwitcher position="absolute" top="1em" right="1em" />
        {isLoading && <Loader />}
        <Outlet />
      </Box>
    </Flex>
  );
};
