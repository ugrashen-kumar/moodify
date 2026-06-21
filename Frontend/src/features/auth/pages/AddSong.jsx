import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSong } from "../../home/hooks/useSong.js";
import login_background from '../../../assets/login_background.avif'
import "../style/login.scss";
import Navbar from "../../home/components/navbar/Navbar.jsx";

const AddSong = () => {
  const [chooseSong, setChooseSong] = useState(null);
  const [chooseMood, setChooseMood] = useState("");

  const { handlePostSong, loading } = useSong();

  const handleOnchange = (e) => {
    const { name, value, files } = e.target;

    if (name === "song") {
      setChooseSong(files[0]);
    } else if (name === "mood") {
      setChooseMood(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!chooseSong) {
      alert("Please select a song");
      return;
    }

    if (!chooseMood) {
      alert("Please select a mood");
      return;
    }

    try {
      await handlePostSong({
        chooseSong,
        chooseMood,
      });

      alert("Song uploaded successfully");

      setChooseSong(null);
      setChooseMood("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main
      className="login-page add-song-page"
      style={{
        backgroundImage: `url(${login_background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Navbar/>
      <h1 className="wlcome-heading">Add Songs to Mood Playlis</h1>
      <div className="form-container">
        <h1>Add Song</h1>
        <form onSubmit={handleSubmit}>
          <label className="choosesong" htmlFor="choose_song">Choose Song</label>
          <input id="choose_song"
            type="file"
            name="song"
            accept="audio/*"
            onChange={handleOnchange} hidden
          />

          <select name="mood" value={chooseMood} onChange={handleOnchange}>
            <option value="">Select Mood</option>
            <option value="surprised">Surprised</option>
            <option value="happy">Happy</option>
            <option value="sad">Sad</option>
          </select>

          <button className="button" type="submit" disabled={loading}>
            {loading ? "Uploading..." : "Add"}
          </button>
        </form>
        <p>Go to <Link to="/">Home</Link>
        </p>
      </div>
    </main>
  );
};

export default AddSong;
