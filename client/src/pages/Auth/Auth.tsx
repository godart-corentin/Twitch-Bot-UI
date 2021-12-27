import React, { useCallback, useContext, useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

import { Button, Loader } from "../../components";
import { TwitchService } from "../../services";
import { UserContext } from "../../context";

import styles from "./Auth.module.css";

export const Auth: React.FC<{}> = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>();

  const [params] = useSearchParams();
  const navigate = useNavigate();
  const { authenticated, setAuthenticated } = useContext(UserContext);

  const verifyCode = useCallback((code: string) => {
    return new Promise<boolean>(async (resolve, reject) => {
      setIsLoading(true);
      const { success, error: err } = await TwitchService.verifyCode(code);
      if (err) {
        reject(err);
      } else {
        resolve(success);
      }
    });
  }, []);

  useEffect(() => {
    const newCode = params.get("code");
    if (newCode) {
      verifyCode(newCode)
        .then((success) => {
          setAuthenticated?.(success);
        })
        .catch((err) => {
          setError(err);
        });
    }
  }, [params, verifyCode, setAuthenticated]);

  useEffect(() => {
    if (authenticated) {
      navigate("/dashboard");
    }
  }, [authenticated, navigate]);

  return (
    <div className={styles.wrapper}>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Button
            variant="primary"
            onClick={() =>
              (window.location.href = `${process.env.REACT_APP_API_URL}/twitch/auth/redirect`)
            }
          >
            <span style={{ marginLeft: ".5em" }}>Se connecter avec Twitch</span>
          </Button>
          {error && <p className={styles.error}>{error}</p>}
        </>
      )}
    </div>
  );
};
