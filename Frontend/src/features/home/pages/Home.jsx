import React from "react";
import FaceExpression from "../../expression/components/FaceExpression";
import Player from "../components/player/Player";
import { useSong } from "../hooks/useSong";
import SongList from "../components/songs/SongList";
import "./home.scss";
import Navbar from "../components/navbar/Navbar";
import music_background from "../../../assets/music_background.avif";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/hooks/useAuth";
import { FaHeadphones } from "react-icons/fa";


const Home = () => {
  const { user } = useAuth();

  console.log("user............", user.username);

  const { handleGetSong } = useSong();
  const navigate = useNavigate();

  // const goToAddSong = () => {
  //   console.log("add song button clicked");
  //   navigate("/add-song");
  // };

  return (
    <main
      className="home"
      style={{
        backgroundImage: `url(${music_background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Navbar />
      <div className="home-container">
        <div className="info-bx">
          <div>
            <h1>
              Wecome Back, <span className="user-name">{user.username}👋</span>
            </h1>
            <p>Discover music that matches your mood.</p>
            {/* <button className="add_song_btn" onClick={goToAddSong}>Add Song</button> */}
          </div>
          <div className="face-expression-bx">
            <FaceExpression
              onClick={(expression) => {
                handleGetSong({ mood: expression });
              }}
            />
          </div>
        </div>
        <div className="songlist-bx">
          <h1><FaHeadphones size={30} className="headphone-icon"/> Mood Playlist</h1>
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
