import React, { memo, useRef } from "react";
import styles from "./boardItem.module.css";

const OptionButton = memo(({ post, notice, admin, onRemove }) => {
  const deleteRef = useRef();

  const onDelete = (e) => {
    e.preventDefault();
    const psw = window.prompt("비밀번호를 입력하세요");
    const type = post ? post : notice;
    if (psw === String(type.psw) || psw === String(admin.psw)) {
      onRemove(type);
    } else if (psw === null) {
      return;
    } else {
      window.alert("권한이 없습니다.");
    }
  };

  return (
    <div className={styles.option}>
      <button className={`optionBtn ${styles.optionBtn}`}>
        <span className={styles.elipsis}></span>
        <span className={styles.elipsis}></span>
        <span className={styles.elipsis}></span>
      </button>
      <button
        className={`delBtn ${styles.deleteBtn}`}
        ref={deleteRef}
        onClick={onDelete}
      >
        삭제
      </button>
    </div>
  );
});

const BoardItem = memo(({ notice, onRemove, post, admin }) => {
  const getDate = () => {
    const date = new Date();
    const yyyy = date.getFullYear();
    const MM = date.getMonth() + 1;
    const dd = date.getDate();
    return `${yyyy}/${addzero(MM)}/${addzero(dd)}`;
  };

  function addzero(n) {
    return n < 10 ? "0" + n : n;
  }

  return (
    <li className={styles.container}>
      {!notice && (
        <div className={styles.item}>
          <p className={styles.nameWrapper}>
            <span className={styles.name}>{post.name}</span>
            <span className={styles.writer}>작성자</span>
          </p>
          <p className={styles.itemContent}>
            <span>{post.content}</span>
            {post.date.substr(0, 10) === getDate() && (
              <span className={styles.new}>N</span>
            )}
          </p>

          <span className={styles.date}>{post.date}</span>
          <OptionButton
            post={post}
            notice={notice}
            onRemove={onRemove}
            admin={admin}
          />
        </div>
      )}
      {notice && (
        <div className={styles.notice}>
          <span className={styles.type}>공지</span>
          <span className={styles.noticeContent}>{notice.content}</span>
          <p className={styles.adminWrapper}>
            <span className={styles.admin}>{notice.name}</span>
            <span className={styles.writer}>admin</span>
          </p>
          <OptionButton
            post={post}
            notice={notice}
            onRemove={onRemove}
            admin={admin}
          />
        </div>
      )}
    </li>
  );
});

export default BoardItem;
