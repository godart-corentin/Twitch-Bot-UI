import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

import { UserContext } from "../context";

const cookies = new Cookies();

export const Disconnect: React.FC<{}> = () => {
  const { setAuthenticated } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    cookies.remove("__HOST-Token", { path: "/", httpOnly: false });
    setAuthenticated?.(false);
    if (navigate) {
      navigate("/");
    }
  }, [navigate, setAuthenticated]);

  return <div></div>;
};
