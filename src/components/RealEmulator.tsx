
import { useEffect, useRef, useState } from "react";

interface RealEmulatorProps {
  romUrl?: string;
  onLoad?: () => void;
  onError?: (error: string) => void;
  isFullscreen?: boolean;
}

const RealEmulator = ({ romUrl, onLoad, onError, isFullscreen = false }: RealEmulatorProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Configurar canvas
    canvas.width = 256;
    canvas.height = 240;

    // Simular carregamento da ROM
    if (romUrl) {
      loadROM(romUrl);
    }
  }, [romUrl]);

  const loadROM = async (url: string) => {
    try {
      setError(null);
      console.log(`Tentando carregar ROM: ${url}`);
      
      // Verificar se o arquivo existe
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`ROM não encontrada: ${response.statusText}`);
      }
      
      const romData = await response.arrayBuffer();
      console.log(`ROM carregada: ${romData.byteLength} bytes`);
      
      // Simular sucesso do carregamento
      setIsLoaded(true);
      onLoad?.();
      
      // Simular tela do jogo
      simulateGameScreen();
      
    } catch (error) {
      console.error('Erro ao carregar ROM:', error);
      const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
      setError(errorMessage);
      onError?.(errorMessage);
    }
  };

  const simulateGameScreen = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!ctx || !canvas) return;

    // Simular tela de jogo com gradiente
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, '#1a1a2e');
    gradient.addColorStop(0.5, '#16213e');
    gradient.addColorStop(1, '#0f3460');
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Simular pixels do jogo
    ctx.fillStyle = '#ffffff';
    ctx.font = '16px monospace';
    ctx.textAlign = 'center';
    ctx.fillText('EMULADOR NES', canvas.width / 2, canvas.height / 2 - 20);
    ctx.fillText('ROM CARREGADA', canvas.width / 2, canvas.height / 2 + 10);
    
    // Simular alguns "pixels" de jogo
    for (let i = 0; i < 50; i++) {
      ctx.fillStyle = `hsl(${Math.random() * 360}, 50%, 50%)`;
      ctx.fillRect(Math.random() * canvas.width, Math.random() * canvas.height, 2, 2);
    }
  };

  const startEmulation = () => {
    if (!isLoaded) return;
    setIsRunning(true);
    console.log('Emulação iniciada');
  };

  const stopEmulation = () => {
    setIsRunning(false);
    console.log('Emulação pausada');
  };

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
      
      {error && !isFullscreen && (
        <div className="p-4 bg-red-600/20 border border-red-500 rounded-lg text-white max-w-md">
          <p className="font-semibold">Erro:</p>
          <p className="text-sm">{error}</p>
          <p className="text-xs mt-2 text-gray-300">
            Verifique se o arquivo ROM existe em public/roms/
          </p>
        </div>
      )}
      
      {!isFullscreen && (
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
      )}
    </div>
  );
};

export default RealEmulator;
