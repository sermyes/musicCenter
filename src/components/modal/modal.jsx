import React, { useEffect } from "react";
import Portal from "../portal/portal";
import styles from "./modal.module.css";

function Modal({ children, onClose }) {
  useEffect(() => {
    document.body.cssText = `position:fixed`;
  });

  return (
    <Portal elementId="modal-root">
      <div className={styles.overlay} />
      <div className={styles.wrapper}>
        <div className={styles.inner}>
          <button className={styles.iconBtn} onClick={() => onClose(null)}>
            <i className={`${styles.icon} fas fa-times`} />
          </button>
          {children}
        </div>
      </div>
    </Portal>
  );
}

export default Modal;
