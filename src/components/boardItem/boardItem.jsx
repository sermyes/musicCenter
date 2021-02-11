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
  const getTime = (date) => {
    const today = new Date();
    const timeValue = new Date(date);

    const betweenTime = Math.floor(
      (today.getTime() - timeValue.getTime()) / 1000 / 60
    );
    if (betweenTime < 1) return "방금전";
    if (betweenTime < 60) {
      return `${betweenTime}분전`;
    }

    const betweenTimeHour = Math.floor(betweenTime / 60);
    if (betweenTimeHour < 24) {
      return `${betweenTimeHour}시간전`;
    }

    const betweenTimeDay = Math.floor(betweenTime / 60 / 24);
    if (betweenTimeDay < 365) {
      return `${betweenTimeDay}일전`;
    }

    return `${Math.floor(betweenTimeDay / 365)}년전`;
  };

  const getNewPost = (date) => {
    const today = new Date();
    const timeValue = new Date(date);

    const betweenTimeHour = Math.floor(
      (today.getTime() - timeValue.getTime()) / 1000 / 60 / 60
    );
    if (betweenTimeHour < 24) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <li className={styles.container}>
      {!notice && (
        <div className={styles.item}>
          <span className={styles.type}>요청</span>
          <p className={styles.itemContent}>
            <span>{post.content}</span>
            {getNewPost(post.date) && <span className={styles.new}>N</span>}
          </p>
          <p className={styles.nameWrapper}>
            <span className={styles.name}>{post.name}</span>
            <span className={styles.writer}>작성자</span>
          </p>
          <span className={styles.date}>{getTime(post.date)}</span>
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
            <span className={styles.name}>{notice.name}</span>
            <span className={styles.admin}>admin</span>
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
