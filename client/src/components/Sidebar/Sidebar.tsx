import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useLocation } from "react-router-dom";

import { User } from "../../lib/types";
import { menu } from "../../menu";
import styles from "./Sidebar.module.css";

type SidebarProps = {
  user: User | null;
};

export const Sidebar: React.FC<SidebarProps> = ({ user }) => {
  const location = useLocation();

  return (
    <div className={styles.wrapper}>
      <div>
        <div className={styles.logo}>
          <h2>Twitch UIBot</h2>
        </div>
        <ul className={styles.menu}>
          {menu.map((item, idx) => (
            <li
              key={idx}
              className={
                location.pathname === item.path ? styles.active : undefined
              }
            >
              <Link to={item.path}>
                <FontAwesomeIcon icon={item.icon} /> <span>{item.name}</span>
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
            <div className={styles.dropdown}>
              <span>
                <FontAwesomeIcon icon="ellipsis-h" size="xs" />
              </span>
              <div>
                <p>Se déconnecter</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
