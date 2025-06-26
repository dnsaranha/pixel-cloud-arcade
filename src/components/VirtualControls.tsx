
import { useState } from "react";

interface VirtualControlsProps {
  gameConsole: string;
  isFullscreen?: boolean;
  onButtonPress?: (button: string, pressed: boolean) => void;
}

const VirtualControls = ({ gameConsole, isFullscreen = false, onButtonPress }: VirtualControlsProps) => {
  const [pressedButtons, setPressedButtons] = useState<Set<string>>(new Set());

  const handleButtonDown = (button: string) => {
    if (!pressedButtons.has(button)) {
      setPressedButtons(prev => new Set([...prev, button]));
      console.log(`Virtual Control: ${button} pressionado`);
      onButtonPress?.(button, true);
      
      // Enviar para o emulador global
      if ((window as any).handleNESButtonPress) {
        (window as any).handleNESButtonPress(button, true);
      }
    }
  };

  const handleButtonUp = (button: string) => {
    setPressedButtons(prev => {
      const newSet = new Set(prev);
      newSet.delete(button);
      return newSet;
    });
    console.log(`Virtual Control: ${button} solto`);
    onButtonPress?.(button, false);
    
    // Enviar para o emulador global
    if ((window as any).handleNESButtonPress) {
      (window as any).handleNESButtonPress(button, false);
    }
  };

  const handleQuickPress = (button: string) => {
    console.log(`Virtual Control: ${button} pressionado rapidamente`);
    onButtonPress?.(button, true);
    
    if ((window as any).handleNESButtonPress) {
      (window as any).handleNESButtonPress(button, true);
    }
    
    setTimeout(() => {
      onButtonPress?.(button, false);
      if ((window as any).handleNESButtonPress) {
        (window as any).handleNESButtonPress(button, false);
      }
    }, 100);
  };

  const buttonStyle = (button: string) => {
    const baseStyle = `relative bg-gradient-to-br from-slate-700 to-slate-800 hover:from-slate-600 hover:to-slate-700 active:from-slate-800 active:to-slate-900 rounded-full shadow-lg border-2 border-slate-600 transition-all duration-150 select-none ${
      pressedButtons.has(button) ? 'scale-95 shadow-inner bg-slate-900' : 'shadow-lg'
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
              onMouseDown={() => handleButtonDown('up')}
              onMouseUp={() => handleButtonUp('up')}
              onMouseLeave={() => handleButtonUp('up')}
              onTouchStart={(e) => { e.preventDefault(); handleButtonDown('up'); }}
              onTouchEnd={(e) => { e.preventDefault(); handleButtonUp('up'); }}
              className={`${buttonStyle('up')} w-10 h-10 flex items-center justify-center text-white font-bold absolute -top-10 left-1/2 transform -translate-x-1/2`}
            >
              ↑
            </button>
            <button
              onMouseDown={() => handleButtonDown('left')}
              onMouseUp={() => handleButtonUp('left')}
              onMouseLeave={() => handleButtonUp('left')}
              onTouchStart={(e) => { e.preventDefault(); handleButtonDown('left'); }}
              onTouchEnd={(e) => { e.preventDefault(); handleButtonUp('left'); }}
              className={`${buttonStyle('left')} w-10 h-10 flex items-center justify-center text-white font-bold absolute top-1/2 -left-10 transform -translate-y-1/2`}
            >
              ←
            </button>
            <div className="w-10 h-10 bg-slate-800 rounded-full"></div>
            <button
              onMouseDown={() => handleButtonDown('right')}
              onMouseUp={() => handleButtonUp('right')}
              onMouseLeave={() => handleButtonUp('right')}
              onTouchStart={(e) => { e.preventDefault(); handleButtonDown('right'); }}
              onTouchEnd={(e) => { e.preventDefault(); handleButtonUp('right'); }}
              className={`${buttonStyle('right')} w-10 h-10 flex items-center justify-center text-white font-bold absolute top-1/2 -right-10 transform -translate-y-1/2`}
            >
              →
            </button>
            <button
              onMouseDown={() => handleButtonDown('down')}
              onMouseUp={() => handleButtonUp('down')}
              onMouseLeave={() => handleButtonUp('down')}
              onTouchStart={(e) => { e.preventDefault(); handleButtonDown('down'); }}
              onTouchEnd={(e) => { e.preventDefault(); handleButtonUp('down'); }}
              className={`${buttonStyle('down')} w-10 h-10 flex items-center justify-center text-white font-bold absolute -bottom-10 left-1/2 transform -translate-x-1/2`}
            >
              ↓
            </button>
          </div>
        </div>

        {/* Center Controls */}
        <div className="col-span-1 flex flex-col items-center justify-center gap-2">
          <button
            onClick={() => handleQuickPress('select')}
            className="px-3 py-1 bg-gray-700 hover:bg-gray-600 active:bg-gray-800 rounded text-white text-xs font-semibold transition-colors"
          >
            SELECT
          </button>
          <button
            onClick={() => handleQuickPress('start')}
            className="px-3 py-1 bg-gray-700 hover:bg-gray-600 active:bg-gray-800 rounded text-white text-xs font-semibold transition-colors"
          >
            START
          </button>
        </div>

        {/* Action Buttons */}
        <div className="col-span-1 flex items-center justify-center">
          <div className="relative">
            <button
              onMouseDown={() => handleButtonDown('A')}
              onMouseUp={() => handleButtonUp('A')}
              onMouseLeave={() => handleButtonUp('A')}
              onTouchStart={(e) => { e.preventDefault(); handleButtonDown('A'); }}
              onTouchEnd={(e) => { e.preventDefault(); handleButtonUp('A'); }}
              className={`${buttonStyle('A')} w-10 h-10 flex items-center justify-center text-white font-bold absolute top-1/2 -right-8 transform -translate-y-1/2`}
            >
              A
            </button>
            <button
              onMouseDown={() => handleButtonDown('B')}
              onMouseUp={() => handleButtonUp('B')}
              onMouseLeave={() => handleButtonUp('B')}
              onTouchStart={(e) => { e.preventDefault(); handleButtonDown('B'); }}
              onTouchEnd={(e) => { e.preventDefault(); handleButtonUp('B'); }}
              className={`${buttonStyle('B')} w-10 h-10 flex items-center justify-center text-white font-bold absolute -bottom-8 left-1/2 transform -translate-x-1/2`}
            >
              B
            </button>
            <div className="w-10 h-10 bg-slate-800 rounded-full"></div>
          </div>
        </div>
      </div>
      
      {!isFullscreen && (
        <div className="mt-4 text-center">
          <p className="text-xs text-gray-400">
            Pressione e segure para controle contínuo
          </p>
        </div>
      )}
    </div>
  );
};

export default VirtualControls;
