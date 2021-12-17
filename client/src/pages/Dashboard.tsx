import React, { useContext } from "react";
import { Layout } from "../components";
import { UserContext } from "../context";

export const Dashboard: React.FC<{}> = () => {
  const { user } = useContext(UserContext);

  return <Layout>{user && <p>{user.name}</p>}</Layout>;
};
