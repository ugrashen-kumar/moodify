import { useState } from "react";
import { createContext } from "react";

export const SongContext = createContext();

export const SongContextProvider = ({ children }) => {
  // const [song, setSong] = useState({
  //   url: "https://ik.imagekit.io/ijshdhsc6/moodify-app/songs/Tumhe_Apna_Banane_Ki___90S_Revisited___DownloadMing.Com__OoEx6la88e.mp3",
  //   posterUrl:
  //     "https://ik.imagekit.io/ijshdhsc6/moodify-app/posters/Tumhe_Apna_Banane_Ki___90S_Revisited___DownloadMing.Com__jG5uqOR5c.jpeg",
  //   title: "Tumhe Apna Banane Ki ( 90S Revisited) [DownloadMing.Com]",
  //   mood: "happy"
  // });
  const [songs, setSongs] = useState([]);
  const [currentSong, setCurrentSong] = useState(null);

  const [loading, setLoading] = useState(false);

  return (
    <SongContext.Provider value={{ songs, setSongs, loading, setLoading, currentSong, setCurrentSong }}>
      {children}
    </SongContext.Provider>
  );
};
