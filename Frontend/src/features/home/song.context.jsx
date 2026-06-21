import { useState } from "react";
import { createContext } from "react";




export const SongContext = createContext();

export const SongContextProvider = ({ children }) => {
  const [songs, setSongs] = useState([]);
  const [currentSong, setCurrentSong] = useState(null);
  const [loading, setLoading] = useState(false);

  return (
    <SongContext.Provider value={{ songs, setSongs, loading, setLoading, currentSong, setCurrentSong }}>
      {children}
    </SongContext.Provider>
  );
};
