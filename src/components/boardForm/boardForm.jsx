import React, { memo, useRef } from "react";
import styles from "./boardForm.module.css";
import { v4 as uuidv4 } from "uuid";

const BoardForm = memo(({ onConfirm, admin }) => {
  const nameRef = useRef();
  const pswRef = useRef();
  const contentRef = useRef();
  const typeRef = useRef();

  const onChange = (e) => {
    if (e.target.value === "notice") {
      e.target.style.cssText = `background: rgba(255, 0, 0, 0.1); color: red;`;
    } else {
      e.target.style.cssText = `background: #fff; color: #000;`;
    }
  };

  const resetForm = () => {
    nameRef.current.value = "";
    pswRef.current.value = "";
    contentRef.current.value = "";
  };

  const onClick = (e) => {
    e.preventDefault();
    const name = nameRef.current.value;
    const psw = pswRef.current.value;
    const content = contentRef.current.value;
    const key = uuidv4();
    const date = new Date().getTime();
    const type = typeRef.current.value;

    if (name === "") {
      window.alert("작성자를 입력하세요.");
      return;
    } else if (psw === "") {
      window.alert("비밀번호를 입력하세요.");
      return;
    } else if (content === "") {
      window.alert("내용을 입력하세요.");
      return;
    }
    if (type === "notice" && psw !== String(admin.psw)) {
      window.alert("접근권한이 없습니다.");
      resetForm();
      return;
    }

    const post = {
      [key]: {
        name: name,
        psw: psw,
        content: content,
        key,
        date,
        type: type,
      },
    };
    onConfirm(post, key);
    resetForm();
  };

  return (
    <form>
      <fieldset className={styles.input}>
        <div className={styles.typeContainer}>
          <select
            name="type"
            id="type"
            className={styles.type}
            defaultValue="post"
            ref={typeRef}
            onChange={onChange}
          >
            <option value="notice" className={styles.notice}>
              공지
            </option>
            <option value="post" className={styles.request}>
              요청
            </option>
            <option value="question" className={styles.question}>
              문의
            </option>
          </select>
        </div>
        <div className={styles.info}>
          <label htmlFor="id">작성자</label>
          <input
            type="text"
            id="id"
            minLength="1"
            maxLength="5"
            required
            ref={nameRef}
          />
          <label htmlFor="psw">비밀번호</label>
          <input
            type="password"
            id="psw"
            minLength="1"
            maxLength="10"
            required
            ref={pswRef}
          />
        </div>
        <div className={styles.wrapper}>
          <textarea
            className={styles.content}
            placeholder="댓글을 남겨보세요."
            cols="30"
            rows="10"
            required
            ref={contentRef}
          ></textarea>
          <button className={styles.confirm} onClick={onClick}>
            등록
          </button>
        </div>
      </fieldset>
    </form>
  );
});

export default BoardForm;
