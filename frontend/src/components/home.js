import React from "react";
import "../App.css";

export default function Home() {
  return (
    <div className="home-container">
      <div className="home-wrap">
        <h1>Music</h1>
        <img
          src="./music.jpg"
          alt="music"
          width="30%"
          height="280"
          className="img"
        />
      </div>
      <br />
      <div className="home-wrap">
        <h1>Videos</h1>
        <img
          src="./video.jpg"
          alt="video"
          width="30%"
          height="310"
          className="img"
        />
      </div>
      <br />
      <div className="home-wrap">
        <h1>Movies</h1>
        <img
          src="./movie.jpg"
          alt="movie"
          width="30%"
          height="310"
          className="img"
        />
      </div>
      <br />
      <div className="home-wrap">
        <h1>Audio books</h1>
        <img
          src="./audiobook.jpg"
          alt="audio"
          width="30%"
          height="310"
          className="img"
        />
      </div>
    </div>
  );
}
