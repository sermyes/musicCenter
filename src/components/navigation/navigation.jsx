import React, { memo, useEffect, useRef, useState, useCallback } from "react";
import styles from "./navigation.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

const Navigation = memo((props) => {
  const ulRef = useRef();
  const [active, setActive] = useState(false);
  const [isScroll, setIsScroll] = useState(false);
  const [loading, setLoading] = useState(false);

  const onClick = (e) => {
    const mainSection = document.querySelector(".mainSection");
    const updatedSection = document.querySelector(".updatedSection");
    const listSection = document.querySelector(".listSection");
    const requestSection = document.querySelector(".requestSection");
    const menus = document.querySelectorAll(".menu");
    let location;

    if (e.target.children[0].innerText === "main") {
      location = mainSection.offsetTop;
    } else if (e.target.children[0].innerText === "update") {
      location = updatedSection.offsetTop;
    } else if (e.target.children[0].innerText === "list") {
      location = listSection.offsetTop;
    } else if (e.target.children[0].innerText === "request") {
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
    if (active) {
      ulRef.current.style.height = `0px`;
      setActive(false);
    } else {
      ulRef.current.style.height = `140px`;
      setActive(true);
    }
  };

  const wheelHandler = useCallback(
    (e) => {
      e.preventDefault();
      if (isScroll) {
        return;
      }
      setIsScroll(true);
      const menuItem = document.querySelectorAll(".menu");
      const pageContainer = e.currentTarget.parentNode;
      const sectionArr = pageContainer.childNodes;
      let currentIndex = Array.prototype.indexOf.call(
        pageContainer.childNodes,
        e.currentTarget
      );
      let nextIndex;
      let nextOffset;

      if (e.wheelDelta > 0) {
        if (currentIndex - 1 < 0) {
          nextIndex = 0;
        } else {
          nextIndex = currentIndex - 1;
        }

        nextOffset = sectionArr[nextIndex].offsetTop;
      } else {
        if (currentIndex + 1 > 3) {
          nextIndex = 3;
        } else {
          nextIndex = currentIndex + 1;
        }
        nextOffset = sectionArr[nextIndex].offsetTop;
      }
      window.scrollTo({ top: nextOffset, left: 0, behavior: "smooth" });
      menuItem.forEach((item) => {
        item.classList.remove("active");
      });
      menuItem[nextIndex].classList.add("active");
      setIsScroll(false);
    },
    [isScroll, setIsScroll]
  );

  const keyupHandler = useCallback((e) => {
    e.preventDefault();

    if (e.code === "ArrowUp" || e.code === "ArrowDown") {
      const sectionArr = document.querySelectorAll(".pageContainer > section");
      const menuItem = document.querySelectorAll(".menu");
      let currentIndex = Math.floor(window.scrollY / window.innerHeight);
      let nextIndex;
      let nextOffset;

      if (e.code === "ArrowUp") {
        if (currentIndex - 1 < 0) {
          nextIndex = 0;
        } else {
          nextIndex = currentIndex - 1;
        }

        nextOffset = sectionArr[nextIndex].offsetTop;
      } else if (e.code === "ArrowDown") {
        if (currentIndex + 1 > 3) {
          nextIndex = 3;
        } else {
          nextIndex = currentIndex + 1;
        }
        nextOffset = sectionArr[nextIndex].offsetTop;
      }

      window.scrollTo({ top: nextOffset, left: 0, behavior: "smooth" });
      menuItem.forEach((item) => {
        item.classList.remove("active");
      });
      menuItem[nextIndex].classList.add("active");
    }
  }, []);

  useEffect(() => {
    if (!loading) {
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      setLoading(true);
    }

    const sections = document.querySelectorAll(".pageContainer > section");
    sections.forEach((section) => {
      section.addEventListener("mousewheel", wheelHandler, { passive: false });
      section.addEventListener("touchmove", wheelHandler, { passive: false });
    });
    window.addEventListener("keyup", keyupHandler);

    return () => {
      sections.forEach((section) => {
        section.removeEventListener("mousewheel", wheelHandler);
        section.removeEventListener("touchmove", wheelHandler);
      });
      window.removeEventListener("keyup", keyupHandler);
    };
  }, [wheelHandler, keyupHandler, loading, setLoading]);

  return (
    <nav className={styles.nav}>
      <button className={styles.btn} onClick={onMui}>
        <FontAwesomeIcon className={styles.icon} icon={faBars} />
      </button>
      <ul className={styles.ul} ref={ulRef}>
        <li className={`${styles.menu} menu active`} onClick={onClick}>
          <span className={styles.menuTitle}>main</span>
        </li>
        <li className={`${styles.menu} menu`} onClick={onClick}>
          <span className={styles.menuTitle}>update</span>
        </li>
        <li className={`${styles.menu} menu`} onClick={onClick}>
          <span className={styles.menuTitle}>list</span>
        </li>
        <li className={`${styles.menu} menu`} onClick={onClick}>
          <span className={styles.menuTitle}>request</span>
        </li>
      </ul>
    </nav>
  );
});

export default Navigation;
