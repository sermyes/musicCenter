import React from "react";
import BoardItem from "../boardItem/boardItem";
import BoardForm from "../boardForm/boardForm";
import styles from "./board.module.css";
import { Scrollbars } from "rc-scrollbars";

const Board = ({ onConfirm, onRemove, posts, notices, admin }) => {
  const onClick = (e) => {
    const delBtn = document.querySelectorAll(".delBtn");
    if (e.target.matches(".optionBtn")) {
      if (e.target.nextSibling.matches(".active")) {
        e.target.nextSibling.classList.remove("active");
      } else {
        delBtn.forEach((btn) => {
          btn.classList.remove("active");
        });
        e.target.nextSibling.classList.add("active");
      }
    } else {
      delBtn.forEach((btn) => {
        btn.classList.remove("active");
      });
    }
  };

  return (
    <div className={styles.container}>
      <div className={`${styles.lists} boardList`} onClick={onClick}>
        <Scrollbars autoHide autoHideTimeout={1000} autoHideDuration={200}>
          <ul>
            {notices &&
              notices.map((notice) => (
                <BoardItem
                  key={notice.key}
                  onRemove={onRemove}
                  notice={notice}
                  admin={admin}
                />
              ))}
          </ul>
          <ul>
            {posts &&
              posts.map((post) => (
                <BoardItem
                  key={post.key}
                  onRemove={onRemove}
                  post={post}
                  admin={admin}
                />
              ))}
          </ul>
        </Scrollbars>
      </div>
      <div className={styles.form}>
        <BoardForm onConfirm={onConfirm} admin={admin} />
      </div>
    </div>
  );
};

export default Board;
