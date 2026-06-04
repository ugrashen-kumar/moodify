# 🎵 Moodify – AI-Based Mood Music Recommendation Platform

A full-stack MERN application that detects user emotions through real-time facial expression recognition and automatically recommends songs based on the detected mood.

---

## 🚀 Live Demo
[View Live](#) <!-- Add your live link here -->

---

## 📸 Screenshots
<!-- Add screenshots after deployment -->

---

## ✨ Features

- 🎭 Real-time facial emotion detection (Happy, Sad, Surprised)
- 🎵 Automatic mood-based song recommendations
- 🔐 JWT-based user authentication and authorization
- 📱 Fully responsive UI for all devices
- 🖼️ Optimized media delivery via ImageKit
- 🎧 In-app song playback functionality
- 🔄 Global state management with Redux Toolkit & Context API

---

## 🛠️ Tech Stack

### Frontend
![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat&logo=tailwind-css&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)

### Backend
![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=flat&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=flat&logo=mongodb&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=flat&logo=jsonwebtokens&logoColor=white)

### Other Tools
![MediaPipe](https://img.shields.io/badge/MediaPipe-0097A7?style=flat)
![ImageKit](https://img.shields.io/badge/ImageKit-FF6B35?style=flat)
![Axios](https://img.shields.io/badge/Axios-5A29E4?style=flat&logo=axios&logoColor=white)
![Git](https://img.shields.io/badge/Git-F05032?style=flat&logo=git&logoColor=white)

---

## 📁 Project Structure

```
moodify/
├── Backend/                      # Node.js Backend
│   ├── src/
│   │   ├── config/               # DB & app configuration
│   │   ├── controllers/          # Route controllers
│   │   ├── middleware/           # Auth middleware
│   │   ├── model/                # Mongoose schemas
│   │   ├── routes/               # API routes
│   │   ├── services/             # Business logic
│   │   └── app.js
│   ├── .env
│   ├── package.json
│   └── server.js
├── Frontend/                     # React Frontend (Vite)
│   ├── public/
│   ├── src/
│   │   ├── assets/               # Images & static files
│   │   ├── features/             # Feature-based modules
│   │   │   ├── auth/             # Authentication
│   │   │   │   ├── components/
│   │   │   │   ├── hooks/
│   │   │   │   ├── pages/
│   │   │   │   ├── servises/
│   │   │   │   ├── shared/
│   │   │   │   ├── style/
│   │   │   │   └── auth.context.jsx
│   │   │   ├── expression/       # Mood/Face detection
│   │   │   ├── home/             # Home module
│   │   │   └── shared/           # Shared components
│   │   ├── App.jsx
│   │   ├── app.routes.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── .gitignore
│   ├── eslint.config.js
│   ├── index.html
│   ├── package.json
│   ├── README.md
│   └── vite.config.js
└── README.md
```
---

## ⚙️ Getting Started

### Prerequisites
- Node.js v18+
- MongoDB (local or Atlas)
- ImageKit account

### Installation

```bash
# Clone the repository
git clone https://github.com/ugrashen-kumar/moodify.git
cd moodify

# Install backend dependencies
cd server
npm install

# Install frontend dependencies
cd ../client
npm install
```

### Environment Variables

Backend `.env` file banao:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
IMAGEKIT_URL_ENDPOINT=your_imagekit_url_endpoint
```

### Run the App

```bash
# Run backend (from /server)
npm run dev

# Run frontend (from /client)
npm start
```

---

## 🔌 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login user |
| GET | `/api/songs/mood/:mood` | Get songs by mood |
| POST | `/api/mood/detect` | Save detected mood |
| GET | `/api/user/history` | Get mood history |

---

## 👨‍💻 Author

**Ugrashen Kumar**  
Frontend & MERN Stack Developer  
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=flat&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/ugrashen-kumar-543274256/)
[![GitHub](https://img.shields.io/badge/GitHub-100000?style=flat&logo=github&logoColor=white)](https://github.com/ugrashen-kumar)

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
