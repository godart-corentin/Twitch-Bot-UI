import { Button, Flex, useColorModeValue } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import { ColorModeSwitcher, Loader } from "../components";
import { UserContext } from "../context";
import { verifyCode } from "../services/TwitchService";

export const Auth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [params] = useSearchParams();
  const navigate = useNavigate();
  const { authenticated, setAuthenticated } = useContext(UserContext);

  const bg = useColorModeValue("gray.200", "dark.800");

  useEffect(() => {
    let mounted = true;
    const checkCode = async () => {
      const code = params.get("code");
      if (code) {
        setIsLoading(true);
        const { success, error: err } = await verifyCode(code);
        if (mounted) {
          if (success) {
            setAuthenticated?.(success);
          }
          setIsLoading(false);
          setError(err);
        }
      }
    };

    checkCode();

    return () => {
      mounted = false;
    };
  }, [navigate, params, setAuthenticated]);

  useEffect(() => {
    if (authenticated) {
      navigate("/dashboard");
    }
  }, [authenticated, navigate]);

  return (
    <Flex
      h="100vh"
      width="100%"
      justifyContent="center"
      alignItems="center"
      bg={bg}
    >
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <ColorModeSwitcher position="absolute" top="1em" right="1em" />
          <Button
            leftIcon={<FontAwesomeIcon icon={["fab", "twitch"]} />}
            colorScheme={"purple"}
            onClick={() =>
              (window.location.href = `${process.env.REACT_APP_API_URL}/twitch/auth/redirect`)
            }
          >
            Se connecter avec Twitch
          </Button>
          {error && { error }}
        </>
      )}
    </Flex>
  );
};
