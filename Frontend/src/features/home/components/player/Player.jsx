import React, { useRef, useState, useEffect } from "react";
import {
  FaPlay,
  FaPause,
  FaStepForward,
  FaStepBackward,
  FaVolumeUp,
  FaVolumeMute,
} from "react-icons/fa";
import { useSong } from "../../hooks/useSong";
import "./player.scss";

const SPEED_OPTIONS = [0.5, 0.75, 1, 1.25, 1.5, 2];

const formatTime = (seconds) => {
  if (isNaN(seconds)) return "0:00";

  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60)
    .toString()
    .padStart(2, "0");

  return `${m}:${s}`;
};

const Player = () => {
  const {
    songs,
    currentSong,
    setCurrentSong,
  } = useSong();

  const audioRef = useRef(null);
  const progressRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [speed, setSpeed] = useState(1);
  const [volume, setVolume] = useState(1);
  const [showSpeed, setShowSpeed] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;

    if (audio && currentSong?.url) {
      audio.load();

      audio
        .play()
        .then(() => setIsPlaying(true))
        .catch((err) => console.log(err));

      setCurrentTime(0);
    }
  }, [currentSong?.url]);

  const handleNext = () => {
    if (!songs?.length || !currentSong) return;

    const currentIndex = songs.findIndex(
      (song) => song._id === currentSong._id
    );

    const nextIndex =
      currentIndex === songs.length - 1
        ? 0
        : currentIndex + 1;

    setCurrentSong(songs[nextIndex]);
  };

  const handlePrev = () => {
    if (!songs?.length || !currentSong) return;

    const currentIndex = songs.findIndex(
      (song) => song._id === currentSong._id
    );

    const prevIndex =
      currentIndex === 0
        ? songs.length - 1
        : currentIndex - 1;

    setCurrentSong(songs[prevIndex]);
  };

  const togglePlay = () => {
    const audio = audioRef.current;

    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }

    setIsPlaying((prev) => !prev);
  };

  const handleTimeUpdate = () => {
    if (!audioRef.current) return;

    setCurrentTime(audioRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    if (!audioRef.current) return;

    setDuration(audioRef.current.duration);
  };

  const handleProgressClick = (e) => {
    const bar = progressRef.current;

    if (!bar || !audioRef.current) return;

    const rect = bar.getBoundingClientRect();

    const ratio =
      (e.clientX - rect.left) / rect.width;

    const newTime = ratio * duration;

    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleSpeedChange = (s) => {
    setSpeed(s);

    if (audioRef.current) {
      audioRef.current.playbackRate = s;
    }

    setShowSpeed(false);
  };

  const handleVolume = (e) => {
    const val = parseFloat(e.target.value);

    setVolume(val);

    if (audioRef.current) {
      audioRef.current.volume = val;
    }

    setIsMuted(val === 0);
  };

  const toggleMute = () => {
    const audio = audioRef.current;

    if (!audio) return;

    if (isMuted) {
      audio.volume = volume || 0.5;
      setIsMuted(false);
    } else {
      audio.volume = 0;
      setIsMuted(true);
    }
  };

  const handleSongEnd = () => {
    handleNext();
  };

  const progress =
    duration > 0
      ? (currentTime / duration) * 100
      : 0;

  if (!currentSong) return null;

  return (
    <div className="player">
      <audio
        ref={audioRef}
        src={currentSong.url}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleSongEnd}
      />

      <div className="player__info">
        <img
          className="player__poster"
          src={currentSong.posterUrl}
          alt={currentSong.title}
        />

        <div className="player__meta">
          <p className="player__title">
            {currentSong.title}
          </p>

          <span className="player__mood">
            {currentSong.mood}
          </span>
        </div>
      </div>

      <div className="player__progress-wrap">
        <span className="player__time">
          {formatTime(currentTime)}
        </span>

        <div
          className="player__progress"
          ref={progressRef}
          onClick={handleProgressClick}
        >
          <div
            className="player__progress-fill"
            style={{ width: `${progress}%` }}
          />

          <div
            className="player__progress-thumb"
            style={{ left: `${progress}%` }}
          />
        </div>

        <span className="player__time">
          {formatTime(duration)}
        </span>
      </div>

      <div className="player__controls">
        <div className="player__speed-wrap">
          <button
            className="player__btn player__btn--speed"
            onClick={() =>
              setShowSpeed(!showSpeed)
            }
          >
            {speed}×
          </button>

          {showSpeed && (
            <div className="player__speed-menu">
              {SPEED_OPTIONS.map((s) => (
                <button
                  key={s}
                  className={`player__speed-option ${
                    s === speed
                      ? "active"
                      : ""
                  }`}
                  onClick={() =>
                    handleSpeedChange(s)
                  }
                >
                  {s}×
                </button>
              ))}
            </div>
          )}
        </div>

        <button
          className="player__btn"
          onClick={handlePrev}
        >
          <FaStepBackward />
        </button>

        <button
          className="player__btn player__btn--play"
          onClick={togglePlay}
        >
          {isPlaying ? (
            <FaPause />
          ) : (
            <FaPlay />
          )}
        </button>

        <button
          className="player__btn"
          onClick={handleNext}
        >
          <FaStepForward />
        </button>

        <div className="player__volume">
          <button
            className="player__btn"
            onClick={toggleMute}
          >
            {isMuted ? (
              <FaVolumeMute />
            ) : (
              <FaVolumeUp />
            )}
          </button>

          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={isMuted ? 0 : volume}
            onChange={handleVolume}
            className="player__volume-slider"
          />
        </div>
      </div>
    </div>
  );
};

export default Player;