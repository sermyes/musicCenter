import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './app';
import axios from "axios";
import Youtube from './service/youtube';
import PostRespository from './service/post_repository';

const client = axios.create({
  baseURL: "https://youtube.googleapis.com/youtube/v3",
  params: { key: process.env.REACT_APP_YOUTUBE_API_KEY },
});

const youtube = new Youtube(client);
const postRespository = new PostRespository();

ReactDOM.render(
  <React.StrictMode>
    <App youtube={youtube} postRespository={postRespository} />
  </React.StrictMode>,
  document.getElementById('root')
);

