import React, { Suspense, useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Html, useProgress } from "@react-three/drei";
import * as THREE from "three";
import Experience from "./components/Experience";
import StartMenu from "./components/StartMenu";
import ControlsModal from "./components/ControlsModal";
import ZombieLoadingScreen from "./components/ZombieLoadingScreen";
import { EcctrlJoystick } from "ecctrl";
import SettingsModal from "./components/SettingsModal";
import { Stats } from "@react-three/drei";

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
  const isMobile = () => window.innerWidth <= 768;

  const [shadows, setShadows] = useState(false);
  const [showStats, setShowStats] = useState(true);
  const [showMenu, setShowMenu] = useState(true);
  const [showControls, setShowControls] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === "Tab") {
        setShowMenu(true);
        setShowControls(false);
      }
    };
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, []);

  useEffect(() => {
    if (isLoading) {
      // Small initial delay before starting progress
      const startDelay = setTimeout(() => {
        // Moderate progress with realistic loading curve
        const interval = setInterval(() => {
          setLoadingProgress((prev) => {
            if (prev >= 100) {
              clearInterval(interval);
              return 100;
            }

            // Variable progress at different stages
            let increment;
            if (prev < 40) {
              // Fast initial progress
              increment = Math.random() * 10 + 5;
            } else if (prev < 70) {
              // Medium speed in middle
              increment = Math.random() * 8 + 3;
            } else if (prev < 90) {
              // Slower near the end
              increment = Math.random() * 5 + 2;
            } else {
              // Slow for final 10%
              increment = Math.random() * 3 + 1;
            }

            return Math.min(prev + increment, 100);
          });
        }, 300); // Moderate interval of 300ms

        return () => clearInterval(interval);
      }, 300); // Small 300ms delay before progress starts

      return () => clearTimeout(startDelay);
    }
  }, [isLoading]);

  if (showControls) {
    return <ControlsModal onClose={() => setShowControls(false)} />;
  }

  if (showSettings) {
    return (
      <SettingsModal
        onClose={() => setShowSettings(false)}
        shadows={shadows}
        showStats={showStats}
        onStatsChange={setShowStats}
        onShadowsChange={setShadows}
      />
    );
  }

  if (isLoading) {
    return (
      <>
        <ZombieLoadingScreen
          progress={loadingProgress}
          onComplete={() => {
            // Small delay after reaching 100%
            setTimeout(() => {
              setIsLoading(false);
            }, 800); // Reduced to 800ms after completion
          }}
        />
        <div style={{ position: "absolute", left: "-9999px", top: "-9999px" }}>
          <Canvas
            ref={canvasRef}
            style={{ width: "1px", height: "1px" }}
            gl={{ alpha: false }}
          >
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
    setShowSettings(false);
    setIsLoading(true);
    setLoadingProgress(0);
  };

  const handleControls = () => setShowControls(true);
  const handleSettings = () => setShowSettings(true);

  if (showMenu) {
    return (
      <StartMenu
        onStart={handleStart}
        onControls={handleControls}
        onSettings={handleSettings}
      />
    );
  }

  return (
    <>
      {isMobile() && <EcctrlJoystick buttonNumber={1} />}

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
        onCreated={() => {
          canvasRef.current?.requestPointerLock();
        }}
      >
        {showStats && <Stats />}

        <Suspense fallback={<LoadingFallback />}>
          <Experience shadows={shadows} />
        </Suspense>
      </Canvas>
    </>
  );
};

export default App;
