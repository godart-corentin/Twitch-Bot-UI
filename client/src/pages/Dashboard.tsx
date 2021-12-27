import React, { useContext } from "react";
import { UserContext } from "../context";

export const Dashboard: React.FC<{}> = () => {
  const { user } = useContext(UserContext);

  return <p>{user?.name}</p>;
};
