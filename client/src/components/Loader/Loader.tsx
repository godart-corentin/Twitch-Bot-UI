import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./Loader.module.css";

export const Loader: React.FC<{}> = () => (
  <div className={styles.wrapper}>
    <FontAwesomeIcon icon="circle-notch" size="2x" color="#fff" spin />
  </div>
);
