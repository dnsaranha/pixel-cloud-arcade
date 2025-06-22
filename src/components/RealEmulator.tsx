
import { useEffect, useRef, useState } from "react";
import * as JSNES from "jsnes";

interface RealEmulatorProps {
  romUrl?: string;
  onLoad?: () => void;
  onError?: (error: string) => void;
}

const RealEmulator = ({ romUrl, onLoad, onError }: RealEmulatorProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const nesRef = useRef<any>(null);
  const frameBufferRef = useRef<ImageData | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Configurar canvas
    canvas.width = 256;
    canvas.height = 240;
    frameBufferRef.current = ctx.createImageData(256, 240);

    // Configurar áudio
    try {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    } catch (e) {
      console.warn('Web Audio API não suportado');
    }

    // Configurar NES - usando JSNES.NES em vez de new JSNES()
    console.log('JSNES object:', JSNES);
    try {
      nesRef.current = new (JSNES as any).NES({
        onFrame: (frameBuffer: number[]) => {
          if (!frameBufferRef.current || !ctx) return;
          
          const imageData = frameBufferRef.current;
          for (let i = 0; i < frameBuffer.length; i++) {
            const pixel = frameBuffer[i];
            imageData.data[i * 4] = (pixel >> 16) & 0xff;     // R
            imageData.data[i * 4 + 1] = (pixel >> 8) & 0xff; // G
            imageData.data[i * 4 + 2] = pixel & 0xff;        // B
            imageData.data[i * 4 + 3] = 255;                 // A
          }
          ctx.putImageData(imageData, 0, 0);
        },
        onAudioSample: (left: number, right: number) => {
          // Implementação básica de áudio
          if (audioContextRef.current && audioContextRef.current.state === 'running') {
            // Aqui você pode implementar um buffer de áudio mais sofisticado
          }
        }
      });
      console.log('NES emulator initialized:', nesRef.current);
    } catch (error) {
      console.error('Error initializing NES emulator:', error);
      onError?.('Erro ao inicializar emulador NES');
    }

    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, [onError]);

  useEffect(() => {
    if (romUrl && nesRef.current) {
      loadROM(romUrl);
    }
  }, [romUrl]);

  const loadROM = async (url: string) => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Erro ao carregar ROM: ${response.statusText}`);
      }
      
      const romData = await response.arrayBuffer();
      const romArray = new Uint8Array(romData);
      
      nesRef.current.loadROM(Array.from(romArray));
      setIsLoaded(true);
      onLoad?.();
    } catch (error) {
      console.error('Erro ao carregar ROM:', error);
      onError?.(error instanceof Error ? error.message : 'Erro desconhecido');
    }
  };

  const startEmulation = () => {
    if (!nesRef.current || !isLoaded) return;
    
    setIsRunning(true);
    
    // Iniciar loop de emulação
    const frame = () => {
      if (isRunning && nesRef.current) {
        nesRef.current.frame();
        requestAnimationFrame(frame);
      }
    };
    
    requestAnimationFrame(frame);
    
    // Iniciar áudio se disponível
    if (audioContextRef.current && audioContextRef.current.state === 'suspended') {
      audioContextRef.current.resume();
    }
  };

  const stopEmulation = () => {
    setIsRunning(false);
  };

  const pressButton = (button: string, player = 1) => {
    if (!nesRef.current) return;
    
    const buttonMap: { [key: string]: number } = {
      'A': 0,
      'B': 1,
      'select': 2,
      'start': 3,
      'up': 4,
      'down': 5,
      'left': 6,
      'right': 7
    };
    
    if (buttonMap[button] !== undefined) {
      nesRef.current.buttonDown(player, buttonMap[button]);
      setTimeout(() => {
        nesRef.current.buttonUp(player, buttonMap[button]);
      }, 100);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <canvas
        ref={canvasRef}
        className="border-2 border-gray-300 rounded-lg bg-black"
        style={{ imageRendering: 'pixelated' }}
      />
      
      <div className="flex gap-2">
        {!isRunning ? (
          <button
            onClick={startEmulation}
            disabled={!isLoaded}
            className="px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white rounded-lg font-semibold"
          >
            {isLoaded ? 'Iniciar Jogo' : 'Carregando...'}
          </button>
        ) : (
          <button
            onClick={stopEmulation}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold"
          >
            Pausar Jogo
          </button>
        )}
      </div>
      
      {/* Controles de teste */}
      <div className="grid grid-cols-3 gap-2 mt-4">
        <button onClick={() => pressButton('up')} className="p-2 bg-blue-500 text-white rounded">↑</button>
        <div></div>
        <button onClick={() => pressButton('A')} className="p-2 bg-red-500 text-white rounded">A</button>
        <button onClick={() => pressButton('left')} className="p-2 bg-blue-500 text-white rounded">←</button>
        <button onClick={() => pressButton('down')} className="p-2 bg-blue-500 text-white rounded">↓</button>
        <button onClick={() => pressButton('B')} className="p-2 bg-red-500 text-white rounded">B</button>
        <button onClick={() => pressButton('right')} className="p-2 bg-blue-500 text-white rounded">→</button>
        <button onClick={() => pressButton('select')} className="p-1 bg-gray-500 text-white rounded text-xs">SEL</button>
        <button onClick={() => pressButton('start')} className="p-1 bg-gray-500 text-white rounded text-xs">START</button>
      </div>
    </div>
  );
};

export default RealEmulator;
