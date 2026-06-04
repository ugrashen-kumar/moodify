const userModel = require("../model/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const blacklistModel = require("../model/blacklist.model");
const redis = require("../config/cache");

const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  const isAlreadyRegister = await userModel.findOne({
    $or: [{ email }, { username }],
  });

  if (isAlreadyRegister) {
    return res.status(409).json({
      message:
        isAlreadyRegister.email === email
          ? "User Already register with this email"
          : "User already register withn this username",
    });
  }

  const hash = await bcrypt.hash(password, 10);

  const user = await userModel.create({
    username,
    email,
    password: hash,
  });

  const token = jwt.sign(
    {
      id: user._id,
      username: user.username,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1d",
    },
  );

  res.cookie("token", token, {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
  });

  res.status(201).json({
    message: "User Register Successfully",
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
    },
  });
};

const loginUser = async (req, res) => {
  const { username, email, password } = req.body;

  const user = await userModel
    .findOne({
      $or: [{ email }, { username }],
    })
    .select("+password");

  if (!user) {
    return res.status(400).json({
      message: "Invalid Credentials",
    });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(400).json({
      message: "Invalid Credentials",
    });
  }

  const token = jwt.sign(
    {
      id: user._id,
      username: user.username,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1d",
    },
  );

  res.cookie("token", token, {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
  });

  res.status(201).json({
    message: "Login Successfully",
    user: {
      username: user.username,
      email: user.email,
      id: user._id,
    },
  });
};

const getMe = async (req, res) => {
  const user = await userModel.findById(req.user.id);

  res.status(200).json({
    message: "user Fetched Successfully",
    user,
  });
};

const loguotUser = async (req, res) => {
  const token = req.cookies.token;

  res.clearCookie("token");

  // using mongo db
  // await blacklistModel.create({
  //     token
  // })

  // using redis

  await redis.set(token, Date.now().toString, "EX", 60 * 60);

  res.status(201).json({
    Message: "Logout Successfully",
  });
};

module.exports = { registerUser, loginUser, getMe, loguotUser };
