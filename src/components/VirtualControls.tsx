
import { useState } from "react";
import { motion } from "framer-motion";

interface VirtualControlsProps {
  gameConsole: string;
  isFullscreen?: boolean;
}

const VirtualControls = ({ gameConsole, isFullscreen = false }: VirtualControlsProps) => {
  const [pressedButtons, setPressedButtons] = useState<Set<string>>(new Set());

  const handleButtonPress = (button: string) => {
    setPressedButtons(prev => new Set([...prev, button]));
    console.log(`Botão pressionado: ${button}`);
    
    setTimeout(() => {
      setPressedButtons(prev => {
        const newSet = new Set(prev);
        newSet.delete(button);
        return newSet;
      });
    }, 100);
  };

  const buttonStyle = (button: string) => {
    const baseStyle = `relative bg-gradient-to-br from-slate-700 to-slate-800 hover:from-slate-600 hover:to-slate-700 active:from-slate-800 active:to-slate-900 rounded-full shadow-lg border-2 border-slate-600 transition-all duration-150 select-none ${
      pressedButtons.has(button) ? 'scale-95 shadow-inner' : 'shadow-lg'
    }`;
    
    if (isFullscreen) {
      return `${baseStyle} bg-opacity-70`;
    }
    
    return baseStyle;
  };

  const containerClass = isFullscreen 
    ? "w-full opacity-80" 
    : "bg-black/20 backdrop-blur-md rounded-xl p-6 border border-white/10";

  return (
    <div className={containerClass}>
      <h3 className="text-white text-lg font-semibold mb-4 text-center">
        Controle Nintendo NES
      </h3>
      
      <div className={`grid grid-cols-3 gap-4 mx-auto ${isFullscreen ? 'max-w-xs' : 'max-w-80'}`}>
        {/* D-Pad */}
        <div className="col-span-1 flex flex-col items-center justify-center">
          <div className="relative">
            <button
              onClick={() => handleButtonPress('up')}
              className={`${buttonStyle('up')} w-10 h-10 flex items-center justify-center text-white font-bold absolute -top-10 left-1/2 transform -translate-x-1/2`}
            >
              ↑
            </button>
            <button
              onClick={() => handleButtonPress('left')}
              className={`${buttonStyle('left')} w-10 h-10 flex items-center justify-center text-white font-bold absolute top-1/2 -left-10 transform -translate-y-1/2`}
            >
              ←
            </button>
            <div className="w-10 h-10 bg-slate-800 rounded-full"></div>
            <button
              onClick={() => handleButtonPress('right')}
              className={`${buttonStyle('right')} w-10 h-10 flex items-center justify-center text-white font-bold absolute top-1/2 -right-10 transform -translate-y-1/2`}
            >
              →
            </button>
            <button
              onClick={() => handleButtonPress('down')}
              className={`${buttonStyle('down')} w-10 h-10 flex items-center justify-center text-white font-bold absolute -bottom-10 left-1/2 transform -translate-x-1/2`}
            >
              ↓
            </button>
          </div>
        </div>

        {/* Center Controls */}
        <div className="col-span-1 flex flex-col items-center justify-center gap-2">
          <button
            onClick={() => handleButtonPress('select')}
            className="px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded text-white text-xs font-semibold"
          >
            SELECT
          </button>
          <button
            onClick={() => handleButtonPress('start')}
            className="px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded text-white text-xs font-semibold"
          >
            START
          </button>
        </div>

        {/* Action Buttons */}
        <div className="col-span-1 flex items-center justify-center">
          <div className="relative">
            <button
              onClick={() => handleButtonPress('A')}
              className={`${buttonStyle('A')} w-10 h-10 flex items-center justify-center text-white font-bold absolute top-1/2 -right-8 transform -translate-y-1/2`}
            >
              A
            </button>
            <button
              onClick={() => handleButtonPress('B')}
              className={`${buttonStyle('B')} w-10 h-10 flex items-center justify-center text-white font-bold absolute -bottom-8 left-1/2 transform -translate-x-1/2`}
            >
              B
            </button>
            <div className="w-10 h-10 bg-slate-800 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VirtualControls;
