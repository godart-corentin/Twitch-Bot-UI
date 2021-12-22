import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

const cookies = new Cookies();

export const Disconnect: React.FC<{}> = () => {
  const navigate = useNavigate();

  useEffect(() => {
    cookies.remove("__HOST-Token", { path: "/", httpOnly: false });
    if (navigate) {
      navigate("/");
    }
  }, [navigate]);

  return <div></div>;
};
