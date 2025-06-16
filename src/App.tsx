import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useState } from "react";
import * as THREE from "three";
import Experience from "./components/Experience";
import StartMenu from "./components/StartMenu";

const App = () => {
  const [shadows, setShadows] = useState(true);
  const [showMenu, setShowMenu] = useState(true);

  useEffect(() => {
    const id = setTimeout(() => {
      setShadows(false);
    }, 1000);
    return () => clearTimeout(id);
  }, []);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === "Escape" || event.key === "Esc") {
        setShowMenu(true);
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  return (
    <>
      {showMenu ? (
        <StartMenu
          onStart={() => setShowMenu(false)}
          onControls={() => console.log("Test Controls")}
          onSettings={() => console.log("Test Settings")}
          onQuit={() => console.log("Test Quit")}
        />
      ) : (
        <Canvas
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
      )}
    </>
  );
};

export default App;
