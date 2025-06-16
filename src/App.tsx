import React, { Suspense, useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Html, useProgress } from "@react-three/drei";
import * as THREE from "three";
import Experience from "./components/Experience";
import StartMenu from "./components/StartMenu";
import ControlsModal from "./components/ControlsModal";
import ZombieLoadingScreen from "./components/ZombieLoadingScreen";

// Loading fallback component that tracks progress
const LoadingFallback: React.FC = () => {
  const { progress } = useProgress();

  return (
    <Html center>
      <div style={{ display: "none" }}>
        {/* This will be handled by the parent loading screen */}
        Loading: {Math.round(progress)}%
      </div>
    </Html>
  );
};

const App: React.FC = () => {
  const [shadows, setShadows] = useState(true);
  const [showMenu, setShowMenu] = useState(true);
  const [showControls, setShowControls] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);

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

  // Simulate progress tracking (you can replace this with actual progress tracking)
  useEffect(() => {
    if (isLoading) {
      const interval = setInterval(() => {
        setLoadingProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          // Simulate realistic loading progression
          const increment = Math.random() * 15 + 5;
          return Math.min(prev + increment, 100);
        });
      }, 200);

      return () => clearInterval(interval);
    }
  }, [isLoading]);

  // Show controls modal
  if (showControls) {
    return <ControlsModal onClose={() => setShowControls(false)} />;
  }

  // Show loading screen
  if (isLoading) {
    return (
      <>
        <ZombieLoadingScreen
          progress={loadingProgress}
          onComplete={() => {
            setIsLoading(false);
            setTimeout(() => {
              canvasRef.current?.requestPointerLock();
            }, 100);
          }}
        />
        {/* Hidden canvas that loads in background */}
        <div style={{ position: "absolute", left: "-9999px", top: "-9999px" }}>
          <Canvas style={{ width: "1px", height: "1px" }} gl={{ alpha: false }}>
            <Suspense fallback={<LoadingFallback />}>
              <Experience shadows={shadows} />
            </Suspense>
          </Canvas>
        </div>
      </>
    );
  }

  const handleStart = () => {
    setShowMenu(false);
    setShowControls(false);
    setIsLoading(true);
    setLoadingProgress(0);
  };

  const handleControls = () => setShowControls(true);
  const handleSettings = () => console.log("Settings");
  const handleQuit = () => console.log("Quit Game");

  // Show start menu
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
      <Suspense fallback={<LoadingFallback />}>
        <Experience shadows={shadows} />
      </Suspense>
    </Canvas>
  );
};

export default App;
