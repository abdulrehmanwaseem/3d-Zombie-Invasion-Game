import React, { useEffect, useState } from "react";

interface SettingsModalProps {
  onClose: () => void;
  shadows: boolean;
  onShadowsChange: (enabled: boolean) => void;
  showStats: boolean;
  onStatsChange: (enabled: boolean) => void;
}

export default function SettingsModal({
  onClose,
  shadows,
  onShadowsChange,
  showStats,
  onStatsChange,
}: SettingsModalProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);

    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === "Escape" || event.key === "Esc") {
        handleClose();
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300);
  };

  const settings = [
    {
      category: "Graphics",
      options: [
        {
          id: "shadows",
          label: "Shadows",
          description: "Enable or disable shadow rendering",
          icon: "🌑",
          type: "toggle" as const,
          value: shadows,
          onChange: onShadowsChange,
        },
      ],
    },
    {
      category: "Performance",
      options: [
        {
          id: "stats",
          label: "Show FPS Counter",
          description: "Display performance statistics in-game",
          icon: "📊",
          type: "toggle" as const,
          value: showStats,
          onChange: onStatsChange,
        },
        {
          id: "quality-info",
          label: "Quality Note",
          description:
            "Disabling shadows can improve performance on lower-end devices",
          icon: "⚡",
          type: "info" as const,
        },
      ],
    },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black">
      {/* Background Image with Overlay - Same as StartMenu */}
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

      {/* Main Content */}
      <div className="relative z-10 flex h-screen flex-col items-center justify-between px-4 py-6">
        {/* Header */}
        <div
          className={`transform transition-all duration-1000 ${
            isVisible
              ? "translate-y-0 opacity-100"
              : "-translate-y-10 opacity-0"
          }`}
        >
          <div
            className="text-center"
            style={{ fontFamily: "Arial Black, sans-serif" }}
          >
            <h1
              className="relative mb-4"
              style={{
                fontSize: "clamp(2.5rem, 8vw, 5rem)",
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
                SETTINGS
              </span>
            </h1>
            <p
              className="text-lg text-gray-300"
              style={{
                textShadow: "2px 2px 4px rgba(0,0,0,0.8)",
              }}
            >
              Configure your game experience
            </p>
          </div>
        </div>

        {/* Settings Content */}
        <div
          className={`w-full max-w-2xl flex-1 overflow-y-auto transform transition-all duration-1000 delay-300 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <div className="space-y-6 p-4">
            {settings.map((section, sectionIndex) => (
              <div
                key={section.category}
                className="space-y-3"
                style={{ animationDelay: `${sectionIndex * 100}ms` }}
              >
                <h3
                  className="text-2xl font-bold text-white mb-4"
                  style={{
                    textShadow: "3px 3px 6px rgba(0,0,0,0.8)",
                  }}
                >
                  {section.category}
                </h3>

                <div className="space-y-2">
                  {section.options.map((option, optionIndex) => (
                    <div
                      key={option.id}
                      className={`
                        group flex items-center justify-between p-4 
                        bg-gray-800/80 backdrop-blur-sm rounded-lg 
                        border-2 border-gray-600 
                        ${
                          option.type === "toggle"
                            ? "hover:border-blue-400"
                            : ""
                        } 
                        transition-all duration-300 transform
                      `}
                      style={{
                        animationDelay: `${
                          sectionIndex * 100 + optionIndex * 50
                        }ms`,
                      }}
                    >
                      <div className="flex items-center gap-3 flex-1">
                        <span className="text-2xl">{option.icon}</span>
                        <div>
                          <h4 className="font-semibold text-white">
                            {option.label}
                          </h4>
                          <p className="text-sm text-gray-400 mt-1">
                            {option.description}
                          </p>
                        </div>
                      </div>

                      {option.type === "toggle" && (
                        <button
                          onClick={() => option.onChange(!option.value)}
                          className={`
                            relative w-16 h-8 rounded-full transition-all duration-300
                            ${
                              option.value
                                ? "bg-blue-600 hover:bg-blue-500"
                                : "bg-gray-600 hover:bg-gray-500"
                            }
                          `}
                        >
                          <div
                            className={`
                              absolute top-1 w-6 h-6 bg-white rounded-full shadow-md
                              transition-transform duration-300
                              ${
                                option.value ? "translate-x-8" : "translate-x-1"
                              }
                            `}
                          />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Button */}
        <div
          className={`transform transition-all duration-1000 delay-500 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
          }`}
        >
          <button
            onClick={handleClose}
            className="
              relative overflow-hidden rounded-lg border-2 px-8 py-3
              border-blue-400 bg-gradient-to-r from-blue-600 to-blue-700 
              text-white shadow-lg shadow-blue-500/50
              font-bold uppercase tracking-wider transition-all duration-300 
              transform hover:scale-105 hover:border-white hover:shadow-2xl
            "
          >
            {/* Hover Effect Background */}
            <div
              className="
              absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent
              transition-transform duration-500 -translate-x-full hover:translate-x-0
            "
            />

            {/* Button Text */}
            <span className="relative z-10 drop-shadow-md flex items-center gap-2">
              Back to Menu
            </span>
          </button>
        </div>
      </div>

      {/* Corner Decorations - Same as StartMenu */}
      <div className="absolute left-2 top-2 h-8 w-8 sm:left-4 sm:top-4 sm:h-12 sm:w-12 border-l-2 border-t-2 sm:border-l-4 sm:border-t-4 border-blue-500 opacity-50" />
      <div className="absolute right-2 top-2 h-8 w-8 sm:right-4 sm:top-4 sm:h-12 sm:w-12 border-r-2 border-t-2 sm:border-r-4 sm:border-t-4 border-blue-500 opacity-50" />
      <div className="absolute bottom-2 left-2 h-8 w-8 sm:bottom-4 sm:left-4 sm:h-12 sm:w-12 border-b-2 border-l-2 sm:border-b-4 sm:border-l-4 border-blue-500 opacity-50" />
      <div className="absolute bottom-2 right-2 h-8 w-8 sm:bottom-4 sm:right-4 sm:h-12 sm:w-12 border-b-2 border-r-2 sm:border-b-4 sm:border-r-4 border-blue-500 opacity-50" />
    </div>
  );
}
