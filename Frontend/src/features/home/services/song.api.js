import axios from 'axios'

const api = axios.create({
    baseURL : "http://localhost:3000",
    withCredentials : true
})

export const getSong = async ({ mood }) => {
  const response = await api.get(`/api/songs?mood=${mood}`);
  console.log(response);
  return response.data;
};

export const postSong = async ({ chooseSong, chooseMood }) => {
  const formData = new FormData();

  formData.append("song", chooseSong);
  formData.append("mood", chooseMood);

  const response = await api.post("/api/songs", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};
