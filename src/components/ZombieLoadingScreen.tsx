import { useEffect, useState } from "react";

interface LoadingScreenProps {
  progress: number; // 0-100
  onComplete?: () => void;
}

export default function ZombieLoadingScreen({
  progress,
  onComplete,
}: LoadingScreenProps) {
  const [animatedProgress, setAnimatedProgress] = useState(0);
  const [loadingText, setLoadingText] = useState("PREPARING FOR INVASION");
  const [dots, setDots] = useState("");

  // Animate progress bar
  useEffect(() => {
    const timer = setTimeout(() => {
      if (animatedProgress < progress) {
        setAnimatedProgress((prev) => Math.min(prev + 1, progress));
      }
    }, 50);
    return () => clearTimeout(timer);
  }, [animatedProgress, progress]);

  // Animate loading text
  useEffect(() => {
    const messages = [
      "PREPARING FOR INVASION",
      "LOADING APOCALYPSE",
      "AWAKENING THE UNDEAD",
      "SPAWNING ZOMBIES",
      "INITIALIZING CHAOS",
      "SETTING UP DEFENSES",
    ];

    const interval = setInterval(() => {
      setLoadingText(messages[Math.floor(Math.random() * messages.length)]);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  // Animate dots
  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? "" : prev + "."));
    }, 500);

    return () => clearInterval(interval);
  }, []);

  // Call onComplete when progress reaches 100
  useEffect(() => {
    if (progress >= 100 && onComplete) {
      const timer = setTimeout(onComplete, 1000);
      return () => clearTimeout(timer);
    }
  }, [progress, onComplete]);

  return (
    <div className="fixed inset-0 overflow-hidden bg-black">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        {/* City Background */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('/images/city-background.png')`,
            filter: "blur(3px) brightness(0.3)",
          }}
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/60" />

        {/* Animated Fog Effect */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute -inset-x-full h-full bg-gradient-to-r from-transparent via-blue-500/20 to-transparent animate-pulse" />
        </div>

        {/* Flickering Light Effect */}
        <div className="absolute inset-0 opacity-20 animate-pulse">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/30 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/30 rounded-full blur-3xl" />
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex h-screen flex-col items-center justify-center px-4">
        {/* Loading Container */}
        <div className="w-full max-w-lg">
          {/* Progress Bar Container */}
          <div className="relative mb-8">
            {/* Background Bar */}
            <div className="h-8 bg-gray-800/80 rounded-lg border-2 border-gray-600 overflow-hidden backdrop-blur-sm">
              {/* Progress Fill */}
              <div
                className="h-full bg-gradient-to-r from-red-600 via-red-500 to-red-400 transition-all duration-300 ease-out relative overflow-hidden"
                style={{ width: `${animatedProgress}%` }}
              >
                {/* Animated Shine Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse" />

                {/* Blood drip effect */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-red-800" />
              </div>

              {/* Zombie Icons Moving Across */}
              <div className="absolute top-1/2 -translate-y-1/2 left-0 w-full h-full pointer-events-none">
                <div
                  className="absolute top-1/2 -translate-y-1/2 text-lg transition-all duration-500"
                  style={{
                    left: `${Math.min(animatedProgress - 5, 95)}%`,
                    opacity: animatedProgress > 10 ? 1 : 0,
                  }}
                >
                  🧟
                </div>
              </div>
            </div>

            {/* Progress Percentage */}
            <div className="absolute -top-10 left-1/2 -translate-x-1/2">
              <span
                className="text-3xl font-black text-white"
                style={{
                  textShadow: "2px 2px 4px rgba(0,0,0,0.8)",
                  fontFamily: "Arial Black, sans-serif",
                }}
              >
                {Math.round(animatedProgress)}%
              </span>
            </div>
          </div>

          {/* Loading Text */}
          <div className="text-center mb-8">
            <p
              className="text-xl font-bold text-red-400 tracking-wider"
              style={{
                textShadow: "2px 2px 4px rgba(0,0,0,0.8)",
                fontFamily: "Arial Black, sans-serif",
              }}
            >
              {loadingText}
              {dots}
            </p>
          </div>

          {/* Loading Tips */}
          <div className="text-center">
            <div className="bg-black/60 rounded-lg p-4 border border-gray-700 backdrop-blur-sm">
              <p className="text-yellow-400 font-semibold mb-2 text-sm">
                💡 SURVIVAL TIP
              </p>
              <p className="text-gray-300 text-sm">
                {progress < 25 && "Keep moving to avoid zombie hordes"}
                {progress >= 25 &&
                  progress < 50 &&
                  "Use headshots for maximum damage"}
                {progress >= 50 &&
                  progress < 75 &&
                  "Listen for zombie growls nearby"}
                {progress >= 75 && "Find safe zones to catch your breath"}
              </p>
            </div>
          </div>

          {/* Warning Message */}
          <div className="text-center mt-8">
            <div className="flex items-center justify-center space-x-2 text-red-500">
              <span className="animate-pulse text-xl">⚠️</span>
              <p className="text-sm font-semibold tracking-wide">
                APOCALYPSE IMMINENT
              </p>
              <span className="animate-pulse text-xl">⚠️</span>
            </div>
          </div>
        </div>
      </div>

      {/* Corner Decorations - Blue theme */}
      <div className="absolute left-2 top-2 h-8 w-8 sm:left-4 sm:top-4 sm:h-12 sm:w-12 border-l-2 border-t-2 sm:border-l-4 sm:border-t-4 border-blue-500 opacity-50" />
      <div className="absolute right-2 top-2 h-8 w-8 sm:right-4 sm:top-4 sm:h-12 sm:w-12 border-r-2 border-t-2 sm:border-r-4 sm:border-t-4 border-blue-500 opacity-50" />
      <div className="absolute bottom-2 left-2 h-8 w-8 sm:bottom-4 sm:left-4 sm:h-12 sm:w-12 border-b-2 border-l-2 sm:border-b-4 sm:border-l-4 border-blue-500 opacity-50" />
      <div className="absolute bottom-2 right-2 h-8 w-8 sm:bottom-4 sm:right-4 sm:h-12 sm:w-12 border-b-2 border-r-2 sm:border-b-4 sm:border-r-4 border-blue-500 opacity-50" />

      {/* Animated Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-blue-500 rounded-full opacity-50"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
            opacity: 0.3;
          }
          50% {
            transform: translateY(-20px) rotate(180deg);
            opacity: 0.8;
          }
        }
      `}</style>
    </div>
  );
}
