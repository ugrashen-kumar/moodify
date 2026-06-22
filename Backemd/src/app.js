require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require('cors')
const path = require("path");


const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin : 'http://localhost:5173',
    credentials : true
}))


app.use(
  express.static(
    path.join(__dirname, "../public")
  )
);

console.log(path.join(__dirname, "../public"));

// require routes
const authRoutes = require('./routes/auth.routes')
const songRouter = require('./routes/song.routes')

// use routes
app.use('/api/auth', authRoutes)
app.use('/api/songs', songRouter)


// Serve React Build
// app.use(express.static(path.join(__dirname, "dist")));

// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "dist", "index.html"));
// });



module.exports = app;