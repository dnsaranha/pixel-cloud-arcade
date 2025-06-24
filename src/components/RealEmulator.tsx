
import { useEffect, useRef, useState } from "react";
import { NES } from "jsnes";

interface RealEmulatorProps {
  romUrl?: string;
  onLoad?: () => void;
  onError?: (error: string) => void;
  isFullscreen?: boolean;
  onButtonPress?: (button: string, pressed: boolean) => void;
}

const RealEmulator = ({ romUrl, onLoad, onError, isFullscreen = false, onButtonPress }: RealEmulatorProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nesRef = useRef<NES | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const animationRef = useRef<number>();

  // Buffer para o áudio
  const audioContextRef = useRef<AudioContext | null>(null);
  const audioBufferRef = useRef<AudioBuffer | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Configurar canvas
    canvas.width = 256;
    canvas.height = 240;

    // Inicializar contexto de áudio
    try {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    } catch (e) {
      console.log('Áudio não disponível');
    }

    // Simular carregamento da ROM
    if (romUrl) {
      loadROM(romUrl);
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [romUrl]);

  const loadROM = async (url: string) => {
    try {
      setError(null);
      console.log(`Carregando ROM: ${url}`);
      
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`ROM não encontrada: ${url}`);
      }
      
      const romData = await response.arrayBuffer();
      const romArray = new Uint8Array(romData);
      
      // Inicializar o emulador NES
      nesRef.current = new NES({
        onFrame: (frameBuffer: number[]) => {
          drawFrame(frameBuffer);
        },
        onAudioSample: (left: number, right: number) => {
          // Implementar áudio se necessário
        },
        onStatusUpdate: (status: string) => {
          console.log('NES Status:', status);
        }
      });

      // Carregar a ROM
      nesRef.current.loadROM(romArray);
      
      console.log(`ROM carregada com sucesso: ${url}`);
      setIsLoaded(true);
      onLoad?.();
      
    } catch (error) {
      console.error('Erro ao carregar ROM:', error);
      const errorMessage = `Erro: ${error}`;
      setError(errorMessage);
      onError?.(errorMessage);
      showErrorScreen();
    }
  };

  const drawFrame = (frameBuffer: number[]) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!ctx || !canvas) return;

    const imageData = ctx.createImageData(256, 240);
    
    for (let i = 0; i < frameBuffer.length; i++) {
      const pixel = frameBuffer[i];
      const r = (pixel >> 16) & 0xFF;
      const g = (pixel >> 8) & 0xFF;
      const b = pixel & 0xFF;
      
      imageData.data[i * 4] = r;
      imageData.data[i * 4 + 1] = g;
      imageData.data[i * 4 + 2] = b;
      imageData.data[i * 4 + 3] = 255;
    }
    
    ctx.putImageData(imageData, 0, 0);
  };

  const showErrorScreen = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!ctx || !canvas) return;

    ctx.fillStyle = '#2a0a0a';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.fillStyle = '#ff4444';
    ctx.font = '16px monospace';
    ctx.textAlign = 'center';
    ctx.fillText('ROM NÃO ENCONTRADA', canvas.width / 2, canvas.height / 2 - 20);
    ctx.fillText('Verifique os arquivos', canvas.width / 2, canvas.height / 2 + 10);
  };

  const startEmulation = () => {
    if (!isLoaded || !nesRef.current) return;
    
    setIsRunning(true);
    console.log('Emulação iniciada');
    
    const gameLoop = () => {
      if (nesRef.current && isRunning) {
        nesRef.current.frame();
        animationRef.current = requestAnimationFrame(gameLoop);
      }
    };
    
    gameLoop();
  };

  const stopEmulation = () => {
    setIsRunning(false);
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    console.log('Emulação pausada');
  };

  // Função para processar entrada dos controles
  const handleButtonPress = (button: string, pressed: boolean) => {
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

    const buttonId = buttonMap[button];
    if (buttonId !== undefined) {
      if (pressed) {
        nesRef.current.buttonDown(1, buttonId);
      } else {
        nesRef.current.buttonUp(1, buttonId);
      }
    }

    onButtonPress?.(button, pressed);
  };

  // Expor a função para o componente pai
  useEffect(() => {
    if (onButtonPress) {
      (window as any).handleNESButtonPress = handleButtonPress;
    }
  }, [onButtonPress]);

  const canvasClass = isFullscreen 
    ? "w-full h-full object-contain bg-black" 
    : "border-2 border-gray-300 rounded-lg bg-black max-w-full h-auto";

  return (
    <div className={`flex flex-col items-center gap-4 ${isFullscreen ? 'h-full w-full' : ''}`}>
      <canvas
        ref={canvasRef}
        className={canvasClass}
        style={{ imageRendering: 'pixelated' }}
      />
      
      {!isFullscreen && (
        <>
          {error && (
            <div className="text-center text-white bg-red-600/20 p-4 rounded-lg border border-red-500 max-w-md">
              <h3 className="font-semibold mb-2">Erro no Emulador</h3>
              <p className="text-sm">{error}</p>
            </div>
          )}
          
          {!error && isLoaded && (
            <div className="text-center text-white bg-green-600/20 p-4 rounded-lg border border-green-500">
              <h3 className="font-semibold mb-2">Emulador NES Ativo!</h3>
              <div className="text-sm space-y-1">
                <p>• ROM carregada com sucesso</p>
                <p>• Use os controles para jogar</p>
                <p>• Pressione Iniciar para começar</p>
              </div>
            </div>
          )}
          
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
        </>
      )}
    </div>
  );
};

export default RealEmulator;
