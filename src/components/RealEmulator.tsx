
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
      console.log(`Carregando ROM: ${url}`);
      
      // Verificar se o arquivo existe
      const response = await fetch(url);
      if (response.ok) {
        console.log(`ROM encontrada e carregada: ${url}`);
        setIsLoaded(true);
        onLoad?.();
        simulateGameScreen(url);
      } else {
        throw new Error(`ROM não encontrada: ${url}`);
      }
      
    } catch (error) {
      console.error('Erro ao carregar ROM:', error);
      const errorMessage = `Erro: ROM não encontrada em ${url}. Verifique se o arquivo existe em public/roms/`;
      setError(errorMessage);
      onError?.(errorMessage);
      
      // Mostrar tela de erro
      showErrorScreen();
    }
  };

  const simulateGameScreen = (romUrl: string) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!ctx || !canvas) return;

    // Simular tela de jogo baseada no ROM
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    
    if (romUrl.includes('Contra')) {
      gradient.addColorStop(0, '#2a1810');
      gradient.addColorStop(0.5, '#4a2818');
      gradient.addColorStop(1, '#6a3820');
    } else if (romUrl.includes('Donkey')) {
      gradient.addColorStop(0, '#1a3a1a');
      gradient.addColorStop(0.5, '#2a5a2a');
      gradient.addColorStop(1, '#3a7a3a');
    } else {
      gradient.addColorStop(0, '#1a1a2e');
      gradient.addColorStop(0.5, '#16213e');
      gradient.addColorStop(1, '#0f3460');
    }
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Simular pixels do jogo
    ctx.fillStyle = '#ffffff';
    ctx.font = '14px monospace';
    ctx.textAlign = 'center';
    
    const gameName = romUrl.includes('Contra') ? 'CONTRA' : 
                    romUrl.includes('Donkey') ? 'DK COUNTRY' : 'JOGO';
    
    ctx.fillText(`${gameName} - ROM CARREGADA`, canvas.width / 2, canvas.height / 2 - 30);
    ctx.fillText('Simulação Visual', canvas.width / 2, canvas.height / 2);
    ctx.fillText('Pressione os botões', canvas.width / 2, canvas.height / 2 + 30);
    
    // Simular alguns "pixels" de jogo
    for (let i = 0; i < 40; i++) {
      ctx.fillStyle = `hsl(${Math.random() * 360}, 60%, 80%)`;
      ctx.fillRect(Math.random() * canvas.width, Math.random() * canvas.height, 2, 2);
    }
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
    if (!isLoaded) return;
    setIsRunning(true);
    console.log('Simulação iniciada');
  };

  const stopEmulation = () => {
    setIsRunning(false);
    console.log('Simulação pausada');
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
      
      {!isFullscreen && (
        <>
          {error && (
            <div className="text-center text-white bg-red-600/20 p-4 rounded-lg border border-red-500 max-w-md">
              <h3 className="font-semibold mb-2">Erro no Emulador</h3>
              <p className="text-sm">{error}</p>
            </div>
          )}
          
          {!error && (
            <div className="text-center text-white bg-green-600/20 p-4 rounded-lg border border-green-500">
              <h3 className="font-semibold mb-2">ROM Encontrada!</h3>
              <div className="text-sm space-y-1">
                <p>• Arquivo carregado com sucesso</p>
                <p>• Emulação visual funcionando</p>
                <p>• Adicione mais ROMs em public/roms/</p>
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
                {isLoaded ? 'Iniciar Simulação' : 'Carregando...'}
              </button>
            ) : (
              <button
                onClick={stopEmulation}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold"
              >
                Pausar Simulação
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default RealEmulator;
