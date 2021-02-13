import React, { useRef } from "react";
import VideoItem from "../videoItem/videoItem";
import styles from "./musicList.module.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const SlideArrow = ({ icon, onClick, className }) => {
  return (
    <button onClick={onClick} className={`${styles.slide_arrow} ${className}`}>
      <i className={`${styles.icon} fas ${icon}`} />
    </button>
  );
};

const MusicList = ({ videos, onVideoClick }) => {
  const sliderRef = useRef();
  const settings = {
    infinite: true,
    speed: 1000,
    slidesToShow: 3,
    slidesToScroll: 3,
    arrows: false,
    lazyLoad: true,
    dotsClass: "slide-dots",
    dots: true,
    useCss: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          dots: false,
        },
      },
    ],
  };

  return (
    <>
      <div className={styles.titleContainer}>
        <h2 className={styles.title}>Music List</h2>
      </div>
      <div className={styles.sliderContainer}>
        <div className={styles.slider}>
          <Slider {...settings} ref={sliderRef}>
            {videos &&
              videos.map((video) => (
                <VideoItem
                  key={video.id}
                  video={video}
                  onVideoClick={onVideoClick}
                />
              ))}
          </Slider>
          <SlideArrow
            className={styles.slide_prev}
            icon={`fa-chevron-left`}
            onClick={() => {
              sliderRef.current.slickPrev();
            }}
          />
          <SlideArrow
            className={styles.slide_next}
            icon={`fa-chevron-right`}
            onClick={() => {
              sliderRef.current.slickNext();
            }}
          />
        </div>
      </div>
    </>
  );
};

export default MusicList;
