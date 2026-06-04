import React from "react";
import FaceExpression from "../../expression/components/FaceExpression";
import Player from "../components/player/Player";
import { useSong } from "../hooks/useSong";
import SongList from "../components/songs/SongList";
import "./home.scss";
import Navbar from "../components/navbar/Navbar";
import music_background from "../../../assets/music_background.avif";

const Home = () => {
  const { handleGetSong } = useSong();
  return (
    <main className="home" 
    style={{
          backgroundImage: `url(${music_background})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
    >
      <Navbar />
      <div
        className="home-container"
        
      >
        <div className="info-bx">
          <h1>Wecome to your Soundspace</h1>
          <button>Add Song in Your PlayList</button>
        </div>
        <div className="face-expression-bx">
          <FaceExpression
            onClick={(expression) => {
              handleGetSong({ mood: expression });
            }}
          />
        </div>

        <div className="songlist-bx">
          <h1>Songs List</h1>
          <SongList />
        </div>
      </div>
      <div className="player-bx">
        <Player />
      </div>
    </main>
  );
};

export default Home;
