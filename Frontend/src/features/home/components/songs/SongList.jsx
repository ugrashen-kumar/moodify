import React from "react";

import "./songlist.scss";
import { useSong } from "../../hooks/useSong";


const SongList = () => {
  const {
    songs,
    currentSong,
    setCurrentSong,
  } = useSong();

  if (!songs?.length) return null;

  return (
    <div className="song-list">
      <div className="song-list__header">
        <h2>Playlist</h2>
        <span>{songs.length} Songs</span>
      </div>

      <div className="song-list__container">
        {songs.map((song) => (
          <div
            key={song._id}
            className={`song-list__item ${
              currentSong?._id === song._id
                ? "song-list__item--active"
                : ""
            }`}
            onClick={() => setCurrentSong(song)}
          >
            <div className="song-list__poster">
              <img
                src={song.posterUrl}
                alt={song.title}
              />
            </div>

            <div className="song-list__info">
              <h4>{song.title}</h4>
              <p>{song.mood}</p>
            </div>

            <div className="song-list__play">
              {currentSong?._id === song._id
                ? "Playing"
                : "Play"}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SongList;