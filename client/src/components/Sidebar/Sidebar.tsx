import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useLocation } from "react-router-dom";

import { User } from "../../lib/types";
import { menu } from "../../menu";
import styles from "./Sidebar.module.css";
import { useState } from "react";

type SidebarProps = {
  user: User | null;
};

export const Sidebar: React.FC<SidebarProps> = ({ user }) => {
  const location = useLocation();
  const [isSidebarHovered, setIsSidebarHovered] = useState(false);

  return (
    <div
      className={styles.wrapper}
      onMouseEnter={() => {
        setTimeout(() => {
          setIsSidebarHovered(true);
        }, 150);
      }}
      onMouseLeave={() => setIsSidebarHovered(false)}
    >
      <div>
        <div className={styles.logo}>
          <h2>{isSidebarHovered ? "Twitch UIBot" : "UIBot"}</h2>
        </div>
        <ul className={styles.menu}>
          {menu.map((item, idx) => (
            <li
              key={idx}
              className={
                location.pathname === item.route.path ? styles.active : undefined
              }
            >
              <Link to={item.route.path}>
                <FontAwesomeIcon icon={item.icon} /> <span>{item.route.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      {user && (
        <div>
          <div className={styles.user}>
            <div>
              <img src={user.picture} alt="User avatar" />
              <span>{user.name}</span>
            </div>
            <Link to="/dashboard/disconnect" className={styles.disconnect}>
              <FontAwesomeIcon icon="sign-out-alt" size="1x" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};
