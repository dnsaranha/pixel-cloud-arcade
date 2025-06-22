
import { useState } from "react";
import { motion } from "framer-motion";

interface VirtualControlsProps {
  console: string;
}

const VirtualControls = ({ console }: VirtualControlsProps) => {
  const [pressedButtons, setPressedButtons] = useState<Set<string>>(new Set());

  const handleButtonPress = (button: string) => {
    setPressedButtons(prev => new Set([...prev, button]));
    setTimeout(() => {
      setPressedButtons(prev => {
        const newSet = new Set(prev);
        newSet.delete(button);
        return newSet;
      });
    }, 100);
  };

  const buttonStyle = (button: string) => 
    `relative bg-gradient-to-br from-slate-700 to-slate-800 hover:from-slate-600 hover:to-slate-700 active:from-slate-800 active:to-slate-900 rounded-full shadow-lg border-2 border-slate-600 transition-all duration-150 select-none ${
      pressedButtons.has(button) ? 'scale-95 shadow-inner' : 'shadow-lg'
    }`;

  if (console === "wii") {
    return (
      <div className="bg-black/20 backdrop-blur-md rounded-xl p-6 border border-white/10">
        <h3 className="text-white text-lg font-semibold mb-4 text-center">Controle Wii</h3>
        
        {/* Wiimote Style */}
        <div className="bg-gradient-to-b from-white to-gray-200 rounded-3xl p-4 mx-auto max-w-20 shadow-xl">
          <div className="space-y-3">
            {/* D-Pad */}
            <div className="flex flex-col items-center">
              <button
                onClick={() => handleButtonPress('up')}
                className="w-8 h-6 bg-gray-800 rounded-t-full mb-1 active:bg-gray-900 transition-colors"
              >
                <span className="text-white text-xs">↑</span>
              </button>
              <div className="flex gap-1">
                <button
                  onClick={() => handleButtonPress('left')}
                  className="w-6 h-8 bg-gray-800 rounded-l-full active:bg-gray-900 transition-colors"
                >
                  <span className="text-white text-xs">←</span>
                </button>
                <button
                  onClick={() => handleButtonPress('right')}
                  className="w-6 h-8 bg-gray-800 rounded-r-full active:bg-gray-900 transition-colors"
                >
                  <span className="text-white text-xs">→</span>
                </button>
              </div>
              <button
                onClick={() => handleButtonPress('down')}
                className="w-8 h-6 bg-gray-800 rounded-b-full mt-1 active:bg-gray-900 transition-colors"
              >
                <span className="text-white text-xs">↓</span>
              </button>
            </div>
            
            {/* Action Buttons */}
            <div className="flex justify-center gap-2 mt-4">
              <button
                onClick={() => handleButtonPress('1')}
                className="w-8 h-8 bg-blue-600 hover:bg-blue-700 rounded-full text-white text-xs font-bold"
              >
                1
              </button>
              <button
                onClick={() => handleButtonPress('2')}
                className="w-8 h-8 bg-blue-600 hover:bg-blue-700 rounded-full text-white text-xs font-bold"
              >
                2
              </button>
            </div>
            
            <div className="flex justify-center gap-2">
              <button
                onClick={() => handleButtonPress('A')}
                className="w-10 h-10 bg-green-600 hover:bg-green-700 rounded-full text-white font-bold"
              >
                A
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black/20 backdrop-blur-md rounded-xl p-6 border border-white/10">
      <h3 className="text-white text-lg font-semibold mb-4 text-center">
        Controle {console === "nintendo" ? "Nintendo" : "Sega"}
      </h3>
      
      <div className="grid grid-cols-3 gap-4 max-w-80 mx-auto">
        {/* D-Pad */}
        <div className="col-span-1 flex flex-col items-center justify-center">
          <div className="relative">
            <button
              onClick={() => handleButtonPress('up')}
              className={`${buttonStyle('up')} w-12 h-12 flex items-center justify-center text-white font-bold absolute -top-12 left-1/2 transform -translate-x-1/2`}
            >
              ↑
            </button>
            <button
              onClick={() => handleButtonPress('left')}
              className={`${buttonStyle('left')} w-12 h-12 flex items-center justify-center text-white font-bold absolute top-1/2 -left-12 transform -translate-y-1/2`}
            >
              ←
            </button>
            <div className="w-12 h-12 bg-slate-800 rounded-full"></div>
            <button
              onClick={() => handleButtonPress('right')}
              className={`${buttonStyle('right')} w-12 h-12 flex items-center justify-center text-white font-bold absolute top-1/2 -right-12 transform -translate-y-1/2`}
            >
              →
            </button>
            <button
              onClick={() => handleButtonPress('down')}
              className={`${buttonStyle('down')} w-12 h-12 flex items-center justify-center text-white font-bold absolute -bottom-12 left-1/2 transform -translate-x-1/2`}
            >
              ↓
            </button>
          </div>
        </div>

        {/* Center Controls */}
        <div className="col-span-1 flex flex-col items-center justify-center gap-3">
          <button
            onClick={() => handleButtonPress('select')}
            className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-white text-xs font-semibold"
          >
            SELECT
          </button>
          <button
            onClick={() => handleButtonPress('start')}
            className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-white text-xs font-semibold"
          >
            START
          </button>
        </div>

        {/* Action Buttons */}
        <div className="col-span-1 flex items-center justify-center">
          <div className="relative">
            <button
              onClick={() => handleButtonPress('Y')}
              className={`${buttonStyle('Y')} w-12 h-12 flex items-center justify-center text-white font-bold absolute -top-12 left-1/2 transform -translate-x-1/2`}
            >
              Y
            </button>
            <button
              onClick={() => handleButtonPress('X')}
              className={`${buttonStyle('X')} w-12 h-12 flex items-center justify-center text-white font-bold absolute top-1/2 -left-12 transform -translate-y-1/2`}
            >
              X
            </button>
            <div className="w-12 h-12 bg-slate-800 rounded-full"></div>
            <button
              onClick={() => handleButtonPress('A')}
              className={`${buttonStyle('A')} w-12 h-12 flex items-center justify-center text-white font-bold absolute top-1/2 -right-12 transform -translate-y-1/2`}
            >
              A
            </button>
            <button
              onClick={() => handleButtonPress('B')}
              className={`${buttonStyle('B')} w-12 h-12 flex items-center justify-center text-white font-bold absolute -bottom-12 left-1/2 transform -translate-x-1/2`}
            >
              B
            </button>
          </div>
        </div>
      </div>

      {/* Shoulder Buttons */}
      <div className="flex justify-between mt-6">
        <button
          onClick={() => handleButtonPress('L')}
          className="px-6 py-3 bg-slate-700 hover:bg-slate-600 rounded-lg text-white font-semibold"
        >
          L
        </button>
        <button
          onClick={() => handleButtonPress('R')}
          className="px-6 py-3 bg-slate-700 hover:bg-slate-600 rounded-lg text-white font-semibold"
        >
          R
        </button>
      </div>
    </div>
  );
};

export default VirtualControls;
