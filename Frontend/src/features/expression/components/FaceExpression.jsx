import { useEffect, useRef, useState } from "react";
import { detect, init } from "../utils/utils";

export default function FaceExpression({ onClick = () => {} }) {
  const videoRef = useRef(null);
  const landmarkerRef = useRef(null);
  const streamRef = useRef(null);

  const [expression, setExpression] = useState("Detecting...");

  useEffect(() => {
    init({ landmarkerRef, videoRef, streamRef });

    return () => {
      if (landmarkerRef.current) {
        landmarkerRef.current.close();
      }

      if (videoRef.current?.srcObject) {
        videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  async function handleClick() {
    const expression = await detect({ landmarkerRef, videoRef, setExpression });
    console.log(expression);
    onClick(expression);
    
  }

  return (
    <div className="cam-container">
      <video 
        ref={videoRef}
        style={{ width: "100%", maxWidth : "400px", borderRadius: "12px", transform : "scaleX(-1)" }}
        playsInline
      />
      <h2>{expression}</h2>
      <button onClick={handleClick}>Detect expression</button>
    </div>
  );
}


// import { useEffect, useRef, useState } from "react";
// import { detect, init } from "../utils/utils";

// export default function FaceExpression({ onClick = () => {} }) {
//   const videoRef = useRef(null);
//   const landmarkerRef = useRef(null);
//   const streamRef = useRef(null);

//   const [expression, setExpression] = useState("Click Start Camera");
//   const [isCameraOn, setIsCameraOn] = useState(false);
//   const [isScanning, setIsScanning] = useState(false);

//   useEffect(() => {
//     if (isCameraOn) {
//       init({ landmarkerRef, videoRef, streamRef });
//     }

//     return () => stopCamera();
//   }, [isCameraOn]);

//   const stopCamera = () => {
//     if (videoRef.current?.srcObject) {
//       videoRef.current.srcObject.getTracks().forEach((t) => t.stop());
//       videoRef.current.srcObject = null;
//     }

//     if (landmarkerRef.current) {
//       landmarkerRef.current.close();
//       landmarkerRef.current = null;
//     }
//   };

//   const startCamera = () => {
//     setExpression("Detecting...");
//     setIsCameraOn(true);
//     setIsScanning(false);
//   };

//   const handleDetect = async () => {
//     setIsScanning(true);

//     const result = await detect({
//       landmarkerRef,
//       videoRef,
//       setExpression,
//     });

//     setExpression(result);
//     onClick(result);

//     // 🔥 IMPORTANT: stop only stream, NOT UI
//     stopCamera();
//     setIsCameraOn(false);

//     // keep scanning ON so overlay remains
//     setTimeout(() => {
//       setIsScanning(false);
//     }, 4000);
//   };

//   return (
//     <div className="cam-container">

//       {/* 🔥 FIX: VIDEO ALWAYS PRESENT */}
//       <div className="camera-frame">
//         <video
//           ref={videoRef}
//           autoPlay
//           playsInline
//           className="video"
//           style={{ transform: "scaleX(-1)" }}
//         />

//         {/* 🔥 OVERLAY ON TOP OF SAME FRAME */}
//         {isScanning && (
//           <div className="scanner-overlay">
//             <div className="scanner-line"></div>
//             <p>Scanning face...</p>
//           </div>
//         )}

//         {/* optional dark layer when camera off */}
//         {!isCameraOn && isScanning && (
//           <div className="camera-off-layer">
//             Camera Stopped
//           </div>
//         )}
//       </div>

//       <h2>{expression}</h2>

//       {!isCameraOn ? (
//         <button onClick={startCamera}>Start Camera</button>
//       ) : (
//         <button onClick={handleDetect}>Detect Expression</button>
//       )}
//     </div>
//   );
// }