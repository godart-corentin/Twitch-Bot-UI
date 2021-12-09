import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

import { useVerifyCode } from "../lib/auth";

export const Auth: React.FC<{}> = () => {
  const [code, setCode] = useState<string>("");
  const [params] = useSearchParams();
  const navigate = useNavigate();

  const { isLoading, data, error } = useVerifyCode(code);

  useEffect(() => {
    const newCode = params.get("code");
    if (newCode && newCode !== code) {
      setCode(newCode);
    }
  }, [params, code]);

  useEffect(() => {
    if (data) {
      navigate("/");
    }
  }, [data, navigate]);

  if (isLoading) return <p>Loading...</p>;

  if (error) return <p>Une erreur est survenue pendant la connexion...</p>;

  return (
    <div>
      <h1>Auth</h1>
      <a href={`${process.env.REACT_APP_API_URL}/twitch/auth/redirect`}>
        Se connecter avec Twitch
      </a>
    </div>
  );
};
