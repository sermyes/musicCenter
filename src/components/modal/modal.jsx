import React, { useEffect } from "react";
import Portal from "../portal/portal";
import styles from "./modal.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

function Modal({ children, onClose }) {
  useEffect(() => {
    document.body.style.cssText = `position: fixed; top: -${window.scrollY}px`;

    return () => {
      const scrollY = document.body.style.top;
      document.body.style.cssText = `position: ""; top: "";`;
      window.scrollTo(0, parseInt(scrollY || "0") * -1);
    };
  }, []);

  return (
    <Portal elementId="modal-root">
      <div className={styles.overlay} />
      <div className={styles.wrapper}>
        <div className={styles.inner}>
          <button className={styles.iconBtn} onClick={() => onClose(null)}>
            <FontAwesomeIcon className={styles.icon} icon={faTimes} />
          </button>
          {children}
        </div>
      </div>
    </Portal>
  );
}

export default Modal;
