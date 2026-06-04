import { useContext } from "react";
import { getSong } from "../services/song.api";
import { SongContext } from "../song.context";

export const useSong = () => {
  const context = useContext(SongContext);

  const {
    songs,
    setSongs,
    currentSong,
    setCurrentSong,
    loading,
    setLoading,
  } = context;

  const handleGetSong = async ({ mood }) => {
    try {
      setLoading(true);

      const data = await getSong({ mood });

      setSongs(data.songs);

      if (data.songs?.length > 0) {
        setCurrentSong(data.songs[0]);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    songs,
    currentSong,
    setCurrentSong,
    loading,
    handleGetSong,
  };
};