import { useCallback, useContext, useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import { Loader } from "..";
import { UserContext } from "../../context";
import { TwitchService } from "../../services";
import { Sidebar } from "../Sidebar";
import { User } from "../../lib/types";

import styles from "./Layout.module.css";

export const Layout: React.FC<{}> = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const getUserData = useCallback(async () => {
    return new Promise<User | null>(async (resolve, reject) => {
      setIsLoading(true);
      const { data, error } = await TwitchService.getUserData();
      if (error) {
        reject(error);
      } else {
        resolve(data);
      }
    });
  }, []);

  useEffect(() => {
    getUserData()
      .then((data) => {
        setUser?.(data);
        setIsLoading(false);
      })
      .catch(() => {
        navigate("/");
      });
  }, [getUserData, navigate, setUser]);

  return (
    <div className={styles.wrapper}>
      <Sidebar user={user} />
      <main className={styles.main}>
        {isLoading && <Loader />}
        <Outlet />
      </main>
    </div>
  );
};
