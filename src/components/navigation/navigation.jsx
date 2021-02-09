import React, { memo, useRef } from "react";
import styles from "./navigation.module.css";

const Navigation = memo((props) => {
  const ulRef = useRef();
  const onClick = (e) => {
    const mainSection = document.querySelector(".mainSection");
    const updatedSection = document.querySelector(".updatedSection");
    const listSection = document.querySelector(".listSection");
    const requestSection = document.querySelector(".requestSection");
    const menus = document.querySelectorAll(".menu");
    let location;

    if (e.target.children[0].innerText === "home") {
      location = mainSection.offsetTop;
    } else if (e.target.children[0].innerText === "music update") {
      location = updatedSection.offsetTop;
    } else if (e.target.children[0].innerText === "music lists") {
      location = listSection.offsetTop;
    } else if (e.target.children[0].innerText === "music request") {
      location = requestSection.offsetTop;
    }

    window.scrollTo({ top: location, left: 0, behavior: "smooth" });

    menus.forEach((menu) => {
      menu.classList.remove("active");
    });
    e.target.classList.add("active");
  };

  const onMui = (e) => {
    e.preventDefault();
    if (ulRef.current.style.height === `0px`) {
      ulRef.current.style.height = `105px`;
    } else {
      ulRef.current.style.height = `0px`;
    }
  };

  return (
    <nav className={styles.nav}>
      <button className={styles.btn} onClick={onMui}>
        <span className={styles.line}>line</span>
        <span className={styles.line}>line</span>
        <span className={styles.line}>line</span>
      </button>
      <ul className={styles.ul} ref={ulRef}>
        <li className={`${styles.menu} menu active`} onClick={onClick}>
          <span className={styles.menuTitle}>home</span>
        </li>
        <li className={`${styles.menu} menu`} onClick={onClick}>
          <span className={styles.menuTitle}>music update</span>
        </li>
        <li className={`${styles.menu} menu`} onClick={onClick}>
          <span className={styles.menuTitle}>music lists</span>
        </li>
        <li className={`${styles.menu} menu`} onClick={onClick}>
          <span className={styles.menuTitle}>music request</span>
        </li>
      </ul>
    </nav>
  );
});

export default Navigation;
