import React, { memo } from "react";
import styles from "./main.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMusic } from "@fortawesome/free-solid-svg-icons";

const Main = memo((props) => {
  const onClick = () => {
    const updatedSection = document.querySelector(".updatedSection");
    const location = updatedSection.offsetTop;
    window.scrollTo({ top: location, left: 0, behavior: "smooth" });
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Music Center</h1>
      <p className={styles.description}>
        Free Youtube Music, Melon Top100, Club Music, Show me the money ...
      </p>
      <button className={styles.btn} onClick={onClick}>
        <FontAwesomeIcon className={styles.icon} icon={faMusic} />
        Listen Music
      </button>
    </div>
  );
});

export default Main;
