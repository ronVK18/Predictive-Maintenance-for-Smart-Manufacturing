import { useEffect } from "react";

export default function Temp() {
  useEffect(() => {
    const script = document.createElement("script");
    script.type = "module";
    script.src = "https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js";
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <div
      style={{
        margin: 0,
      
        fontFamily: "sans-serif",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        textAlign: "center",
      }}
    >
      <h1>Pump AR Viewer</h1>

      <model-viewer
        src="/public/pumpFinal.glb" // ✔️ Ensure this file is inside `public/` folder
        ar
        ar-modes="scene-viewer webxr quick-look"
        auto-rotate
        camera-controls
        shadow-intensity="1"
        exposure="0.9"
        environment-image="neutral"
        style={{
          width: "100%",
          height: "90vh",
          maxWidth: "800px",
        }}
      />

      <p>Scan with phone to place the pump in real-world AR!</p>
    </div>
  );
}
