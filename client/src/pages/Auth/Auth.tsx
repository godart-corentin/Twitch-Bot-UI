import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

import { Button, Loader } from "../../components";
import { TwitchService } from "../../services";

import styles from "./Auth.module.css";

export const Auth: React.FC<{}> = () => {
  const [success, setSuccess] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>();

  const [params] = useSearchParams();
  const navigate = useNavigate();

  const verifyCode = async (code: string) => {
    setIsLoading(true);
    const { success: scc, error: err } = await TwitchService.verifyCode(code);
    if (err) {
      setError(err);
    }
    setSuccess(scc);
    setIsLoading(false);
  };

  useEffect(() => {
    const newCode = params.get("code");
    if (newCode) {
      verifyCode(newCode);
    }
  }, [params]);

  useEffect(() => {
    if (success) {
      navigate("/dashboard");
    }
  }, [success, navigate]);

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
