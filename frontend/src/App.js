import React from "react";
import NavBar from "./components/navBar";
import Home from "./components/home";
import Music from "./components/music";
import Videos from "./components/videos";
import Movies from "./components/movies";
import AudioBooks from "./components/audiobooks";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <div>
        <NavBar/>
      </div>
        <Routes>
          <Route path="/" exact={true} element={<Home/>} />
          <Route path="/music" element={<Music/>} />
          <Route path="/videos" element={<Videos/>} />
          <Route path="/movies" element={<Movies/>} />
          <Route path="/audiobooks" element={<AudioBooks/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

