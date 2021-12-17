import { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Loader } from "..";
import { UserContext } from "../../context";
import { TwitchService } from "../../services";
import { Sidebar } from "../Sidebar";
import styles from "./Layout.module.css";

export const Layout: React.FC<{}> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const getUserData = useCallback(async () => {
    setIsLoading(true);
    const { data, error } = await TwitchService.getUserData();
    setUser?.(data);
    setIsLoading(false);
    if (error) {
      navigate("/disconnect");
    }
  }, [setUser, navigate]);

  useEffect(() => {
    getUserData();
  }, [getUserData]);

  return (
    <div className={styles.wrapper}>
      {isLoading && <Loader />}
      <Sidebar user={user} />
      <main className={styles.main}>{children}</main>
    </div>
  );
};
