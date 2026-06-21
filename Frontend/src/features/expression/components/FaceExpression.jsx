import React, { useEffect, useRef, useState } from "react";
import { detect, init } from "../utils/utils";
import defaultImage from "../../../assets/open-camera.jpg";
import resultImage from "../../../assets/music-animation.gif";
import { useNavigate } from "react-router-dom";
import { IoMdQrScanner } from "react-icons/io";
import { FaPlus } from "react-icons/fa6";

export default function FaceExpression({ onClick = () => {} }) {
  const videoRef = useRef(null);
  const landmarkerRef = useRef(null);
  const streamRef = useRef(null);

  const [expression, setExpression] = useState("");
  const [showCamera, setShowCamera] = useState(false);
  const [showResultImage, setShowResultImage] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    return () => {
      if (landmarkerRef.current) {
        landmarkerRef.current.close();
      }

      if (videoRef.current?.srcObject) {
        videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  const handleClick = async () => {
    try {
      // Result image hide
      setShowResultImage(false);

      // Camera show
      setShowCamera(true);

      // Camera initialize
      await init({
        landmarkerRef,
        videoRef,
        streamRef,
      });

      // Camera ko start hone ka time do
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Expression detect
      const detectedExpression = await detect({
        landmarkerRef,
        videoRef,
        setExpression,
      });

      console.log("Detected Expression:", detectedExpression);

      // Camera stop
      if (videoRef.current?.srcObject) {
        videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
      }

      streamRef.current = null;

      // Camera hide
      setShowCamera(false);

      // Result image show
      setShowResultImage(true);

      // Parent component callback
      onClick(detectedExpression);
    } catch (error) {
      console.error("Detection Error:", error);

      setShowCamera(false);
      setExpression("Detection Failed");
    }
  };

  const goToAddSong = () => {
    console.log("add song button clicked");
    navigate("/add-song");
  };

  return (
    <div className="cam-container">
       <div className="btns">
        <button className="detect-exp" onClick={handleClick}>
          <IoMdQrScanner size={12}/> Detect Expression
        </button>
        <button className="add_song_btn" onClick={goToAddSong}>
          <FaPlus size={12} /> Add Song
        </button>
      </div>
      {showCamera ? (
        <video
          ref={videoRef}
          autoPlay
          playsInline
          style={{
            width: "100%",
            maxWidth: "400px",
            maxHeight : "300px",
            borderRadius: "12px",
            transform: "scaleX(-1)",
          }}
        />
      ) : (
        <img
          src={showResultImage ? resultImage : defaultImage}
          alt="Face Expression"
          style={{
            width: "100%",
            maxWidth: "400px",
            maxHeight : "300px",
            borderRadius: "12px",
            objectFit: "cover",
          }}
        />
      )}

      <h2 className="current-exp">Your Expression : {expression}</h2>
    </div>
  );
}
