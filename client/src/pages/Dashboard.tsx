import React, { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { UserContext } from "../context";

import { TwitchService } from "../services";

export const Dashboard: React.FC<{}> = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error>();

  const navigate = useNavigate();
  const { username, setUsername } = useContext(UserContext);

  const getUserData = useCallback(async () => {
    setIsLoading(true);
    try {
      const { name } = await TwitchService.getUserData();
      setIsLoading(false);
      setUsername?.(name);
    } catch (e) {
      setIsLoading(false);
      setError(e as Error);
    }
  }, [setUsername]);

  useEffect(() => {
    getUserData();
  }, [getUserData]);

  useEffect(() => {
    if (error) {
      navigate("/auth");
    }
  }, [error, navigate]);

  if (isLoading) return <p>Loading ...</p>;

  return (
    <div>
      <p>Dashboard</p>
      {username && <p>{username}</p>}
    </div>
  );
};
