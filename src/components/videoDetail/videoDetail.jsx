import React from "react";
import styles from "./videoDetail.module.css";

const VideoDetail = ({ video }) => {
  return (
    <div className={styles.container}>
      <iframe
        className={styles.video}
        title="youtube player"
        type="text/html"
        width="100%"
        src={`https://www.youtube.com/embed/${video.snippet.resourceId.videoId}`}
        frameBorder="0"
        allowFullScreen
      ></iframe>
      <h2 className={styles.title}>{video.snippet.title}</h2>
    </div>
  );
};

export default VideoDetail;
