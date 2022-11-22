import React, { memo, useEffect, useRef, useState, useCallback } from 'react';
import styles from './navigation.module.css';

const Navigation = memo(() => {
  const wrapperRef = useRef();
  const iconRef = useRef();
  const [active, setActive] = useState(false);
  const [loading, setLoading] = useState(false);

  const onClick = (e) => {
    const mainSection = document.querySelector('.mainSection');
    const updatedSection = document.querySelector('.updatedSection');
    const listSection = document.querySelector('.listSection');
    const requestSection = document.querySelector('.requestSection');
    const menus = document.querySelectorAll('.menu');
    let location;
    switch (e.currentTarget.dataset.section) {
      case 'main':
        location = mainSection.offsetTop;
        break;
      case 'update':
        location = updatedSection.offsetTop;
        break;
      case 'list':
        location = listSection.offsetTop;
        break;
      case 'request':
        location = requestSection.offsetTop;
        break;
      default:
        throw new Error(
          `not valid section: ${e.currentTarget.dataset.section}`
        );
    }

    window.scrollTo({ top: location, left: 0, behavior: 'smooth' });

    menus.forEach((menu) => {
      menu.classList.remove('active');
    });
    e.currentTarget.classList.add('active');
  };

  const onMui = (e) => {
    e.preventDefault();
    const icon = document.querySelector('.icon');
    if (active) {
      wrapperRef.current.classList.remove('on');
      icon.classList.add('fa-bars');
      icon.classList.remove('fa-times');
      setActive(false);
    } else {
      wrapperRef.current.classList.add('on');
      icon.classList.remove('fa-bars');
      icon.classList.add('fa-times');
      setActive(true);
    }
  };
  // Mobile Menu

  const wheelHandler = useCallback((e) => {
    e.preventDefault();
    const menuItem = document.querySelectorAll('.menu');
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
    window.scrollTo({ top: nextOffset, left: 0, behavior: 'smooth' });
    menuItem.forEach((item) => {
      item.classList.remove('active');
    });
    menuItem[nextIndex].classList.add('active');
  }, []);

  const keyupHandler = useCallback((e) => {
    e.preventDefault();

    if (e.code === 'ArrowUp' || e.code === 'ArrowDown') {
      const sections = document.querySelectorAll('.pageContainer > section');
      const items = document.querySelectorAll('.menu');
      let currentIndex = Math.floor(window.scrollY / window.innerHeight);
      let nextIndex;
      let nextOffset;

      if (e.code === 'ArrowUp') {
        if (currentIndex - 1 < 0) {
          nextIndex = 0;
        } else {
          nextIndex = currentIndex - 1;
        }

        nextOffset = sections[nextIndex].offsetTop;
      } else if (e.code === 'ArrowDown') {
        if (currentIndex + 1 > 3) {
          nextIndex = 3;
        } else {
          nextIndex = currentIndex + 1;
        }
        nextOffset = sections[nextIndex].offsetTop;
      }

      window.scrollTo({ top: nextOffset, left: 0, behavior: 'smooth' });
      items.forEach((item) => {
        item.classList.remove('active');
      });
      items[nextIndex].classList.add('active');
    }
  }, []);

  useEffect(() => {
    if (!loading) {
      const idx = Math.floor(window.scrollY / window.innerHeight);
      const menu = document.querySelectorAll('.menu');
      menu[idx].classList.add('active');
      setLoading(true);
    }

    const sections = document.querySelectorAll('.pageContainer > section');
    sections.forEach((section) => {
      section.addEventListener('mousewheel', wheelHandler, { passive: false });
      section.addEventListener('touchmove', wheelHandler, { passive: false });
    });
    window.addEventListener('keyup', keyupHandler);

    return () => {
      sections.forEach((section) => {
        section.removeEventListener('mousewheel', wheelHandler);
        section.removeEventListener('touchmove', wheelHandler);
      });
      window.removeEventListener('keyup', keyupHandler);
    };
  }, [wheelHandler, keyupHandler, loading, setLoading]);

  return (
    <nav className={styles.nav}>
      <button className={styles.btn} onClick={onMui}>
        <i className={`${styles.icon} icon fas fa-bars`} ref={iconRef}></i>
      </button>
      <div className={`${styles.wrapper} mui`} ref={wrapperRef}>
        <ul className={styles.ul}>
          <li
            className={`${styles.menu} menu`}
            data-section='main'
            onClick={onClick}
          >
            <i className={`${styles.ico} fas fa-home`}></i>
            <span className={`${styles.text} ${styles.muiText}`}>Home</span>
          </li>
          <li
            className={`${styles.menu} menu`}
            data-section='update'
            onClick={onClick}
          >
            <span className={styles.text}>New</span>
          </li>
          <li
            className={`${styles.menu} menu`}
            data-section='list'
            onClick={onClick}
          >
            <i className={`${styles.ico} fas fa-music`}></i>
            <span className={`${styles.text} ${styles.muiText}`}>List</span>
          </li>
          <li
            className={`${styles.menu} menu`}
            data-section='request'
            onClick={onClick}
          >
            <i className={`${styles.ico} fas fa-comment`}></i>
            <span className={`${styles.text} ${styles.muiText}`}>Comment</span>
          </li>
        </ul>
      </div>
    </nav>
  );
});

export default Navigation;
