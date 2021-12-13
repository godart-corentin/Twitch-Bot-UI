import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { TwitchService } from "../services";

export const Auth: React.FC<{}> = () => {
  const [success, setSuccess] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error>();

  const [params] = useSearchParams();
  const navigate = useNavigate();

  const verifyCode = async (code: string) => {
    setIsLoading(true);
    try {
      const { success: scc, error: err } = await TwitchService.verifyCode(code);
      setIsLoading(false);
      setSuccess(scc);
      setError(err as Error);
    } catch (e) {
      setIsLoading(false);
      setError(e as Error);
    }
  };

  useEffect(() => {
    const newCode = params.get("code");
    if (newCode) {
      verifyCode(newCode);
    }
  }, [params]);

  useEffect(() => {
    if (success) {
      navigate("/");
    }
  }, [success, navigate]);

  if (isLoading) return <p>Loading...</p>;

  if (error) return <p>{error.message}</p>;

  return (
    <div>
      <h1>Auth</h1>
      <a href={`${process.env.REACT_APP_API_URL}/twitch/auth/redirect`}>
        Se connecter avec Twitch
      </a>
    </div>
  );
};
