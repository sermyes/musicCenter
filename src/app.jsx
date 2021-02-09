import React, { useEffect, useState } from "react";
import styles from "./app.module.css";
import Main from "./components/main/main";
import UpdatedMusic from "./components/updatedMusic/updatedMusic";
import MusicList from "./components/musicList/musicList";
import MusicRequest from "./components/musicRequest/musicRequest";
import Modal from "./components/modal/modal";
import VideoDetail from "./components/videoDetail/videoDetail";
import Navigation from "./components/navigation/navigation";

function App({ youtube, postRespository }) {
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [updatedVideo, setUpdatedVideo] = useState([]);

  const backgroundImg = {
    main: {
      url:
        "https://res.cloudinary.com/sermyes/image/upload/v1610853343/music-center/bg_1_akmekt.jpg",
    },
    updated: {
      url:
        "https://res.cloudinary.com/sermyes/image/upload/v1610853344/music-center/bg_2_x13ptv.jpg",
    },
    lists: {
      url:
        "https://res.cloudinary.com/sermyes/image/upload/v1610853343/music-center/bg_3_zqa1oy.jpg",
    },
    board: {
      url:
        "https://res.cloudinary.com/sermyes/image/upload/v1610853343/music-center/bg_4_mzc7pc.jpg",
    },
  };

  const onVideoClick = (video) => {
    setSelectedVideo(video);
  };

  useEffect(() => {
    youtube
      .playList() //
      .then((videos) => {
        setVideos(
          videos.filter((video) => video.snippet.title !== "Deleted video")
        );
        setUpdatedVideo(
          videos
            .sort((a, b) => {
              return a.snippet.publishedAt < b.snippet.publishedAt ? 1 : -1;
            })
            .slice(0, 3)
        );
      })
      .catch((error) => console.log(error));
  }, [youtube]);

  return (
    <div className={styles.container}>
      <Navigation />
      <section
        className={`mainSection ${styles.section}`}
        style={{ backgroundImage: `url(${backgroundImg.main.url})` }}
      >
        <Main />
      </section>
      <section
        className={`updatedSection ${styles.updated} ${styles.section}`}
        style={{ backgroundImage: `url(${backgroundImg.updated.url})` }}
      >
        <UpdatedMusic onVideoClick={onVideoClick} updatedVideo={updatedVideo} />
      </section>
      <section
        className={`listSection ${styles.list} ${styles.section}`}
        style={{ backgroundImage: `url(${backgroundImg.lists.url})` }}
      >
        <MusicList
          videos={videos}
          onVideoClick={onVideoClick}
          selectedVideo={selectedVideo}
        />
      </section>
      <section
        className={`requestSection ${styles.section}`}
        style={{ backgroundImage: `url(${backgroundImg.board.url})` }}
      >
        <MusicRequest postRespository={postRespository} />
      </section>

      {selectedVideo && (
        <Modal allowScroll={() => {}} onClose={onVideoClick}>
          <VideoDetail video={selectedVideo} />
        </Modal>
      )}
    </div>
  );
}

export default App;
