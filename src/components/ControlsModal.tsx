import React, { useEffect, useState } from "react";

interface ControlsModalProps {
  onClose(): void;
}

export default function ControlsModal({ onClose }: ControlsModalProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);

    // Add escape key listener
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
    setTimeout(onClose, 300); // Wait for animation to complete
  };

  const keyboardMap = [
    {
      category: "Movement",
      controls: [
        { name: "Move Forward", keys: ["↑", "W"], icon: "⬆️" },
        { name: "Move Backward", keys: ["↓", "S"], icon: "⬇️" },
        { name: "Move Left", keys: ["←", "A"], icon: "⬅️" },
        { name: "Move Right", keys: ["→", "D"], icon: "➡️" },
        { name: "Jump", keys: ["Space"], icon: "🦘" },
        { name: "Run/Sprint", keys: ["Shift"], icon: "💨" },
      ],
    },
    {
      category: "Combat",
      controls: [
        { name: "Melee Attack", keys: ["F"], icon: "👊" },
        { name: "Kick Attack", keys: ["E"], icon: "🦵" },
      ],
    },
    {
      category: "Other",
      controls: [
        { name: "Emote", keys: ["1"], icon: "😄" },
        { name: "Pause Menu", keys: ["Esc"], icon: "⏸️" },
      ],
    },
  ];

  const KeyBadge = ({ keyName }: { keyName: string }) => (
    <kbd className="inline-flex items-center justify-center min-w-[2.5rem] h-8 px-2 text-sm font-mono font-semibold text-gray-800 bg-gradient-to-b from-gray-100 to-gray-300 border border-gray-400 rounded-md shadow-md transform transition-transform hover:scale-105">
      {keyName}
    </kbd>
  );

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center transition-all duration-300 ${
        isVisible ? "bg-black bg-opacity-95 backdrop-blur-sm" : "bg-transparent"
      }`}
      onClick={handleClose}
    >
      <div
        className={`relative w-full h-full max-w-none bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-none border-none shadow-2xl transform transition-all duration-300 flex flex-col ${
          isVisible
            ? "scale-100 opacity-100 translate-y-0"
            : "scale-95 opacity-0 translate-y-4"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0 bg-repeat opacity-20"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpolygon points='0,0 10,5 0,10'/%3E%3C/g%3E%3C/svg%3E")`,
              backgroundSize: "20px 20px",
            }}
          />
        </div>

        {/* Header */}
        <div className="relative border-b border-gray-700/50 p-6 text-center flex-shrink-0">
          <div className="absolute left-8 top-6 h-4 w-4 border-l-2 border-t-2 border-blue-500" />
          <div className="absolute right-8 top-6 h-4 w-4 border-r-2 border-t-2 border-blue-500" />

          <h2
            className="text-4xl font-black text-white mb-2"
            style={{ fontFamily: "Arial Black, sans-serif" }}
          >
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              🎮 CONTROLS GUIDE
            </span>
          </h2>
          <p className="text-gray-400 text-lg">
            Master these controls to survive the zombie invasion!
          </p>
        </div>

        {/* Controls Grid - Column Layout */}
        <div className="p-8 flex-1 min-h-0">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-full">
            {keyboardMap.map((section, sectionIndex) => (
              <div
                key={section.category}
                className={`transform transition-all duration-500 flex flex-col ${
                  isVisible
                    ? "translate-x-0 opacity-100"
                    : "translate-x-4 opacity-0"
                }`}
                style={{ transitionDelay: `${sectionIndex * 100}ms` }}
              >
                <h3 className="text-2xl font-bold text-blue-400 mb-4 flex items-center gap-3">
                  <div className="w-1.5 h-6 bg-gradient-to-b from-blue-400 to-purple-500 rounded-full" />
                  {section.category}
                </h3>

                <div className="space-y-3 flex-1">
                  {section.controls.map((control, controlIndex) => (
                    <div
                      key={control.name}
                      className={`group flex items-center justify-between p-4 bg-gray-800/50 rounded-lg border border-gray-700/50 hover:border-blue-500/50 hover:bg-gray-700/50 transition-all duration-300 transform hover:scale-[1.02] ${
                        isVisible
                          ? "translate-y-0 opacity-100"
                          : "translate-y-2 opacity-0"
                      }`}
                      style={{
                        transitionDelay: `${
                          sectionIndex * 100 + controlIndex * 50
                        }ms`,
                      }}
                    >
                      <div className="flex items-center gap-3 min-w-0 flex-1">
                        <span className="text-2xl transform group-hover:scale-110 transition-transform duration-200 flex-shrink-0">
                          {control.icon}
                        </span>
                        <span className="font-semibold text-white group-hover:text-blue-300 transition-colors text-lg">
                          {control.name}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 flex-shrink-0">
                        {control.keys.map((key, keyIndex) => (
                          <React.Fragment key={key}>
                            {keyIndex > 0 && (
                              <span className="text-gray-500 text-sm font-medium">
                                or
                              </span>
                            )}
                            <kbd className="inline-flex items-center justify-center min-w-[2.5rem] h-8 px-2 text-sm font-mono font-semibold text-gray-800 bg-gradient-to-b from-gray-100 to-gray-300 border border-gray-400 rounded-md shadow-md transform transition-transform hover:scale-105">
                              {key}
                            </kbd>
                          </React.Fragment>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end py-10 px-12">
          <button
            onClick={handleClose}
            className="group relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25 min-w-[150px]"
          >
            <span className="relative z-10 flex items-center gap-2 text-base">
              ← Back to Menu
            </span>

            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
          </button>
        </div>
        {/* Bottom corner decorations */}
        <div className="absolute bottom-6 left-8 h-4 w-4 border-b-2 border-l-2 border-blue-500" />
        <div className="absolute bottom-6 right-8 h-4 w-4 border-b-2 border-r-2 border-blue-500" />
      </div>
    </div>
  );
}
