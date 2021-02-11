import React, { memo, useEffect, useRef, useCallback, useState } from "react";
import styles from "./videoItem.module.css";

const VideoItem = memo(({ video, onVideoClick }) => {
  const videoRef = useRef();
  const [loading, setLoading] = useState(false);
  const onClick = () => {
    onVideoClick(video);
  };

  const videoHeightHandler = useCallback(() => {
    const width = videoRef.current.offsetWidth;
    if (width <= 250) {
      videoRef.current.style.cssText = `max-height: 220px`;
    } else if (width <= 320) {
      videoRef.current.style.cssText = `max-height: 260px`;
    } else {
      videoRef.current.style.cssText = `max-height: 300px`;
    }
  }, []);

  useEffect(() => {
    if (!loading) {
      videoHeightHandler();
      setLoading(true);
    }

    window.addEventListener("resize", videoHeightHandler);

    return () => {
      window.removeEventListener("resize", videoHeightHandler);
    };
  }, [videoHeightHandler, loading]);

  return (
    <div ref={videoRef} className={styles.video} onClick={onClick}>
      <img
        className={styles.thumbnail}
        src={video.snippet.thumbnails.medium.url}
        alt=""
      />
      <div className={styles.metadata}>
        <p className={styles.title}>{video.snippet.title}</p>
      </div>
    </div>
  );
});

export default VideoItem;
