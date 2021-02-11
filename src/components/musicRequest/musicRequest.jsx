import React, { useEffect, useState } from "react";
import Board from "../board/board";
import styles from "./musicRequest.module.css";

const MusicRequest = ({ postRespository }) => {
  const [posts, setPosts] = useState([]);
  const [notices, setNotices] = useState([]);
  const [admin, setAdmin] = useState([]);
  const onConfirm = (post, key) => {
    postRespository.savePost(post, key);
  };

  const onRemove = (post, key) => {
    postRespository.removePost(post, key);
  };

  useEffect(() => {
    const stopRead = postRespository.getPost((posts) => {
      setPosts(
        posts.post &&
          Object.keys(posts.post)
            .map((key) => posts.post[key])
            .sort((a, b) => (a.date > b.date ? -1 : 1))
      );
      setNotices(
        posts.notice &&
          Object.keys(posts.notice).map((key) => posts.notice[key])
      );
      setAdmin(posts.admin && posts.admin);
    });

    return () => stopRead();
  }, [postRespository]);

  return (
    <>
      <div className={styles.titleContainer}>
        <h2 className={styles.title}>Music Request</h2>
      </div>
      <div className={styles.boardContainer}>
        <div className={styles.board} id={styles.style}>
          <Board
            onConfirm={onConfirm}
            onRemove={onRemove}
            posts={posts}
            notices={notices}
            admin={admin}
          />
        </div>
      </div>
    </>
  );
};

export default MusicRequest;
