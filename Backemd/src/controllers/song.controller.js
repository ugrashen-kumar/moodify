const songModel = require("../model/song.model");
const storageServices = require("../services/storage.services");
const id3 = require("node-id3");

const uploadSong = async (req, res) => {
  const { mood } = req.body;
  const songBuffer = req.file.buffer;
  const tags = id3.read(songBuffer);

  const [songFile, posterFile] = await Promise.all([
    storageServices.uploadFile({
      buffer: songBuffer,
      fileName: `${tags.title}.mp3`,
      folder: "moodify-app/songs",
    }),
    storageServices.uploadFile({
      buffer: tags.image.imageBuffer,
      fileName: `${tags.title}.jpeg`,
      folder: "moodify-app/posters",
    }),
  ]);

  //   const songFile = await storageServices.uploadFile({
  //       buffer : songBuffer,
  //       fileName : `${tags.title}.mp3`,
  //       folder : "moodify-app/songs"
  //   })

  //   const posterFile = await storageServices.uploadFile({
  //       buffer : tags.image.imageBuffer,
  //       fileName : `${tags.title}.jpeg`,
  //       folder : "moodify-app/posters"
  //   })

  const song = await songModel.create({
    title: tags.title,
    url: songFile.url,
    posterUrl: posterFile.url,
    mood,
  });

  res.status(201).json({
    message: "song created Successfully",
    song,
  });
};

const getSong = async (req, res) => {
  const { mood } = req.query;

  // const song = await songModel.findOne({
  //   mood,
  // });
  const songs = await songModel.find({
    mood,
  });

  res.status(200).json({
    message: "Song fetched successfully",
    songs,
  });
};

module.exports = { uploadSong, getSong };
