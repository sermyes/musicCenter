import React, { useEffect, useState } from 'react';
import styles from './app.module.css';
import Main from './components/main/main';
import UpdatedMusic from './components/updatedMusic/updatedMusic';
import MusicList from './components/musicList/musicList';
import MusicRequest from './components/musicRequest/musicRequest';
import Modal from './components/modal/modal';
import VideoDetail from './components/videoDetail/videoDetail';
import Navigation from './components/navigation/navigation';

function App({ youtube, postRespository }) {
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [updatedVideo, setUpdatedVideo] = useState([]);

  const onVideoClick = (video) => {
    setSelectedVideo(video);
  };

  useEffect(() => {
    youtube
      .playList() //
      .then((videos) => {
        setVideos(
          videos.filter(
            (video) =>
              video.snippet.title !== 'Deleted video' &&
              video.snippet.title !== 'Private video'
          )
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
    <div className={`${styles.container} pageContainer`}>
      <section
        className={`mainSection ${styles.section} ${styles.main}`}
        onWheel={onwheel}
      >
        <Main />
      </section>
      <section
        className={`updatedSection ${styles.updated} ${styles.section}`}
        onWheel={onwheel}
      >
        <UpdatedMusic onVideoClick={onVideoClick} updatedVideo={updatedVideo} />
      </section>
      <section
        className={`listSection ${styles.list} ${styles.section}`}
        onWheel={onwheel}
      >
        <MusicList
          videos={videos}
          onVideoClick={onVideoClick}
          selectedVideo={selectedVideo}
        />
      </section>
      <section
        className={`requestSection ${styles.section} ${styles.request}`}
        onWheel={onwheel}
      >
        <MusicRequest postRespository={postRespository} />
      </section>

      <Navigation />

      {selectedVideo && (
        <Modal allowScroll={() => {}} onClose={onVideoClick}>
          <VideoDetail video={selectedVideo} />
        </Modal>
      )}
    </div>
  );
}

export default App;
