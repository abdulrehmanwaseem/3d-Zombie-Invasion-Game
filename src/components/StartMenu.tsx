import { useEffect, useState } from "react";

interface StartMenuProps {
  onStart?: () => void;
  onControls?: () => void;
  onSettings?: () => void;
  onQuit?: () => void;
}

export default function ZombieInvasionMenu({
  onStart = () => console.log("Start Game"),
  onControls = () => console.log("Controls"),
  onSettings = () => console.log("Settings"),
  onQuit = () => console.log("Quit"),
}: StartMenuProps) {
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const menuButtons = [
    { id: "start", label: "Start Game", action: onStart, primary: true },
    { id: "controls", label: "Controls Guide", action: onControls },
    { id: "settings", label: "Settings", action: onSettings },
    { id: "quit", label: "Quit Game", action: onQuit },
  ];

  return (
    <div className="fixed inset-0 overflow-hidden bg-black">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        {/* City Background */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('/images/city-background.png')`,
            filter: "blur(2px)",
          }}
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />

        {/* Animated Fog Effect */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute -inset-x-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse" />
        </div>
      </div>

      {/* Main Content - Fixed height with proper spacing */}
      <div className="relative z-10 flex h-screen flex-col items-center justify-between px-4 py-6">
        {/* Title Section - Reduced sizes for better fit */}
        <div
          className={`transform transition-all duration-1000 ${
            isLoaded ? "translate-y-0 opacity-100" : "-translate-y-10 opacity-0"
          }`}
        >
          <div
            className="text-center"
            style={{ fontFamily: "Arial Black, sans-serif" }}
          >
            <p
              className="mb-1 text-base sm:text-lg md:text-xl font-black text-white tracking-wider"
              style={{
                textShadow: "2px 2px 4px rgba(0,0,0,0.8)",
              }}
            >
              GAME MADE BY
            </p>
            <h2
              className="mb-2 text-xl sm:text-2xl md:text-3xl font-black text-white tracking-wider"
              style={{
                textShadow: "3px 3px 6px rgba(0,0,0,0.8)",
              }}
            >
              ABDUL REHMAN
            </h2>
            <h1
              className="relative mb-1"
              style={{
                fontSize: "clamp(3rem, 10vw, 7rem)",
                fontWeight: "900",
                lineHeight: "0.9",
                letterSpacing: "0.02em",
              }}
            >
              <span
                className="relative z-10"
                style={{
                  color: "#2563eb",
                  WebkitTextStroke: "4px white",
                  paintOrder: "stroke fill",
                  textShadow: "4px 4px 8px rgba(0,0,0,0.5)",
                }}
              >
                ZOMBIE
              </span>
            </h1>
            <h1
              className="relative"
              style={{
                fontSize: "clamp(2.5rem, 8vw, 5.5rem)",
                fontWeight: "900",
                lineHeight: "0.9",
                letterSpacing: "0.02em",
              }}
            >
              <span
                className="relative z-10"
                style={{
                  color: "#2563eb",
                  WebkitTextStroke: "4px white",
                  paintOrder: "stroke fill",
                  textShadow: "4px 4px 8px rgba(0,0,0,0.5)",
                }}
              >
                INVASION
              </span>
            </h1>
          </div>
        </div>

        {/* Menu Buttons - Compact spacing */}
        <div
          className={`w-full max-w-sm transform transition-all duration-1000 delay-500 ${
            isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <div className="space-y-2 sm:space-y-4 px-4">
            {menuButtons.map((button, index) => (
              <button
                key={button.id}
                onClick={button.action}
                onMouseEnter={() => setHoveredButton(button.id)}
                onMouseLeave={() => setHoveredButton(null)}
                className={`
                  relative w-full overflow-hidden rounded-lg border-2 px-4 py-2 sm:px-6 sm:py-3 
                  text-base sm:text-lg font-bold uppercase tracking-wider transition-all duration-300 transform
                  ${
                    button.primary
                      ? "border-blue-400 bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-500/50"
                      : "border-gray-600 bg-gray-800/80 text-gray-200 backdrop-blur-sm"
                  }
                  ${
                    hoveredButton === button.id
                      ? "scale-105 border-white"
                      : "scale-100"
                  }
                  hover:shadow-2xl
                `}
                style={{
                  animationDelay: `${index * 100}ms`,
                }}
              >
                {/* Hover Effect Background */}
                <div
                  className={`
                  absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent
                  transition-transform duration-500
                  ${
                    hoveredButton === button.id
                      ? "translate-x-0"
                      : "-translate-x-full"
                  }
                `}
                />

                {/* Button Text */}
                <span className="relative z-10 drop-shadow-md">
                  {button.label}
                </span>

                {/* Zombie Icon for Primary Button */}
                {button.primary && (
                  <>
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-2xl animate-bounce">
                      🧟
                    </span>
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl animate-bounce">
                      🧟
                    </span>
                  </>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Bottom Info - Smaller text */}
        <div
          className={`transform text-center transition-all duration-1000 delay-700 ${
            isLoaded ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
          }`}
        >
          <p className="text-xs sm:text-sm text-gray-400">
            Press ESC to pause during gameplay
          </p>
          <p className="mt-1 text-xs text-gray-500">
            © 2025 Zombie Invasion - Abdul Rehman. All rights reserved.
          </p>
        </div>
      </div>

      {/* Corner Decorations - Smaller on mobile */}
      <div className="absolute left-2 top-2 h-8 w-8 sm:left-4 sm:top-4 sm:h-12 sm:w-12 border-l-2 border-t-2 sm:border-l-4 sm:border-t-4 border-blue-500 opacity-50" />
      <div className="absolute right-2 top-2 h-8 w-8 sm:right-4 sm:top-4 sm:h-12 sm:w-12 border-r-2 border-t-2 sm:border-r-4 sm:border-t-4 border-blue-500 opacity-50" />
      <div className="absolute bottom-2 left-2 h-8 w-8 sm:bottom-4 sm:left-4 sm:h-12 sm:w-12 border-b-2 border-l-2 sm:border-b-4 sm:border-l-4 border-blue-500 opacity-50" />
      <div className="absolute bottom-2 right-2 h-8 w-8 sm:bottom-4 sm:right-4 sm:h-12 sm:w-12 border-b-2 border-r-2 sm:border-b-4 sm:border-r-4 border-blue-500 opacity-50" />
    </div>
  );
}
