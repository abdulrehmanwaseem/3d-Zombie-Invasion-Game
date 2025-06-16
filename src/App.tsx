import React, { Suspense, useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import Experience from "./components/Experience";
import StartMenu from "./components/StartMenu";
import ControlsModal from "./components/ControlsModal";

const App: React.FC = () => {
  const [shadows, setShadows] = useState(true);
  const [showMenu, setShowMenu] = useState(true);
  const [showControls, setShowControls] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const id = setTimeout(() => setShadows(false), 2000);
    return () => clearTimeout(id);
  }, []);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === "Escape" || event.key === "Esc") {
        setShowMenu(true);
        setShowControls(false);
      }
    };
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, []);

  if (showControls) {
    return <ControlsModal onClose={() => setShowControls(false)} />;
  }

  const handleStart = () => {
    setShowMenu(false);
    setShowControls(false);

    requestAnimationFrame(() => {
      canvasRef.current?.requestPointerLock();
    });
  };

  const handleControls = () => setShowControls(true);
  const handleSettings = () => console.log("Settings");
  const handleQuit = () => console.log("Quit Game");

  if (showMenu) {
    return (
      <StartMenu
        onStart={handleStart}
        onControls={handleControls}
        onSettings={handleSettings}
        onQuit={handleQuit}
      />
    );
  }

  return (
    <Canvas
      ref={canvasRef}
      style={{ touchAction: "none" }}
      shadows={{ type: THREE.PCFSoftShadowMap }}
      camera={{ position: [30, 8, 20], near: 0.1, fov: 60, far: 200 }}
      gl={{
        antialias: true,
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.0,
      }}
    >
      <Suspense fallback={null}>
        <Experience shadows={shadows} />
      </Suspense>
    </Canvas>
  );
};

export default App;
