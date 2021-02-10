import React, { useRef } from "react";
import VideoItem from "../videoItem/videoItem";
import styles from "./musicList.module.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";

const SlideArrow = (props) => {
  return (
    <button
      onClick={props.onClick}
      className={`${styles.slide_arrow} ${props.className}`}
    >
      <FontAwesomeIcon className={styles.icon} icon={props.icon} />
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
      {
        breakpoint: 591,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: false,
        },
      },
    ],
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Music List</h2>
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
          icon={faChevronLeft}
          onClick={() => {
            sliderRef.current.slickPrev();
          }}
        />
        <SlideArrow
          className={styles.slide_next}
          icon={faChevronRight}
          onClick={() => {
            sliderRef.current.slickNext();
          }}
        />
      </div>
    </div>
  );
};

export default MusicList;
