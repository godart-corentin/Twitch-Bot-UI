import { Button, Flex } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import { Loader } from "../components";
import { UserContext } from "../context";
import { verifyCode } from "../services/TwitchService";

export const Auth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [params] = useSearchParams();
  const navigate = useNavigate();
  const { authenticated, setAuthenticated } = useContext(UserContext);

  useEffect(() => {
    let mounted = true;
    const checkCode = async () => {
      const code = params.get("code");
      if (code) {
        setIsLoading(true);
        if (mounted) {
          const { success, error: err } = await verifyCode(code);
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
      bg={"dark.800"}
    >
      {isLoading ? (
        <Loader />
      ) : (
        <>
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
