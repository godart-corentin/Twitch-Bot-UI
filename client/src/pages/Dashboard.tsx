import React, { useEffect } from "react";
import { useNavigate } from "react-router";

import { useUserData } from "../lib/auth";

export const Dashboard: React.FC<{}> = () => {
  const navigate = useNavigate();
  const { isLoading, data, error } = useUserData();

  useEffect(() => {
    console.log(data);
  }, [data]);

  useEffect(() => {
    if (error) {
      navigate("/auth");
    }
  }, [error, navigate]);

  if (isLoading) return <p>Loading ...</p>;

  return (
    <div>
      <p>Dashboard</p>
      {data && <p>{data.name}</p>}
    </div>
  );
};
