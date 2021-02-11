import React from "react";
import VideoItem from "../videoItem/videoItem";
import styles from "./updatedMusic.module.css";

const UpdatedMusic = ({ updatedVideo, onVideoClick }) => {
  return (
    <>
      <div className={styles.titleContainer}>
        <h2 className={styles.title}>Updated Music</h2>
      </div>
      <div className={styles.listContainer}>
        <div className={styles.list}>
          {updatedVideo &&
            updatedVideo.map((video) => (
              <VideoItem
                className={styles.video}
                key={video.id}
                video={video}
                onVideoClick={onVideoClick}
              />
            ))}
        </div>
      </div>
    </>
  );
};

export default UpdatedMusic;
