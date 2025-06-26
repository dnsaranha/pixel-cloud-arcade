
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
  const [debugInfo, setDebugInfo] = useState<string>("");
  const animationRef = useRef<number>();
  const audioContextRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = 256;
    canvas.height = 240;

    if (romUrl) {
      loadROM(romUrl);
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, [romUrl]);

  const initAudioContext = () => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
  };

  const loadROM = async (url: string) => {
    try {
      setError(null);
      setDebugInfo(`Carregando ROM: ${url}`);
      console.log(`Tentando carregar ROM: ${url}`);
      
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`ROM não encontrada: ${response.status}`);
      }
      
      const romData = await response.arrayBuffer();
      const romArray = new Uint8Array(romData);
      
      console.log(`ROM carregada. Tamanho: ${romArray.length} bytes`);
      setDebugInfo(`ROM carregada: ${romArray.length} bytes`);
      
      // Verificar se é arquivo Super Nintendo (.smc)
      if (url.toLowerCase().includes('.smc')) {
        console.log('Arquivo Super Nintendo detectado - jsnes não suporta SNES');
        setDebugInfo('Arquivo SNES - jsnes só suporta NES');
        showGameSimulation('SNES não suportado pelo jsnes');
        setIsLoaded(true);
        onLoad?.();
        return;
      }

      // Validação mais robusta para ROMs NES
      if (romArray.length < 16) {
        throw new Error('Arquivo muito pequeno para ser uma ROM NES válida');
      }

      // Verificar header NES
      const hasNESHeader = romArray[0] === 0x4E && // 'N'
                          romArray[1] === 0x45 && // 'E'
                          romArray[2] === 0x53 && // 'S'
                          romArray[3] === 0x1A;   // EOF

      console.log(`Header NES válido: ${hasNESHeader}`);
      console.log(`Primeiros 16 bytes:`, Array.from(romArray.slice(0, 16)).map(b => `0x${b.toString(16).padStart(2, '0')}`).join(' '));
      
      if (!hasNESHeader) {
        console.log('Header NES inválido - tentando mesmo assim');
        setDebugInfo('Header NES inválido - tentando carregar mesmo assim');
      }

      // Inicializar contexto de áudio
      initAudioContext();

      // Criar nova instância do emulador NES
      console.log('Inicializando jsnes...');
      nesRef.current = new NES({
        onFrame: (frameBuffer: number[]) => {
          drawFrame(frameBuffer);
        },
        onAudioSample: (left: number, right: number) => {
          // Implementar áudio básico se necessário
        },
        onStatusUpdate: (status: string) => {
          console.log('NES Status:', status);
          setDebugInfo(`Status: ${status}`);
        }
      });

      // Tentar carregar a ROM
      console.log('Carregando ROM no jsnes...');
      nesRef.current.loadROM(romArray);
      
      console.log('ROM carregada com sucesso no jsnes!');
      setDebugInfo('ROM carregada com sucesso no jsnes');
      setIsLoaded(true);
      onLoad?.();
      
    } catch (error) {
      console.error('Erro ao carregar ROM:', error);
      const errorMessage = `Erro ao carregar ROM: ${error}`;
      setError(errorMessage);
      setDebugInfo(errorMessage);
      onError?.(errorMessage);
      
      // Mostrar simulação como fallback
      showGameSimulation(`Erro: ${error}`);
      setIsLoaded(true);
      onLoad?.();
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

  const showGameSimulation = (reason: string) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!ctx || !canvas) return;

    console.log(`Mostrando simulação: ${reason}`);

    ctx.fillStyle = '#000080';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.fillStyle = '#FFFF00';
    ctx.font = '14px monospace';
    ctx.textAlign = 'center';
    ctx.fillText('SIMULAÇÃO ATIVA', canvas.width / 2, canvas.height / 2 - 40);
    ctx.fillText(reason, canvas.width / 2, canvas.height / 2 - 20);
    ctx.fillText('Use os controles!', canvas.width / 2, canvas.height / 2);
    
    ctx.fillStyle = '#00FF00';
    ctx.fillRect(50, 50, 20, 20);
    
    ctx.fillStyle = '#FF0000';
    ctx.fillRect(180, 180, 20, 20);
    
    let frame = 0;
    const animate = () => {
      if (!isRunning) return;
      
      frame++;
      ctx.fillStyle = '#000080';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      const x = 50 + Math.sin(frame * 0.1) * 30;
      const y = 50 + Math.cos(frame * 0.1) * 30;
      
      ctx.fillStyle = '#00FF00';
      ctx.fillRect(x, y, 20, 20);
      
      ctx.fillStyle = '#FF0000';
      ctx.fillRect(180, 180, 20, 20);
      
      ctx.fillStyle = '#FFFF00';
      ctx.font = '12px monospace';
      ctx.textAlign = 'center';
      ctx.fillText('SIMULAÇÃO', canvas.width / 2, canvas.height / 2 - 20);
      ctx.fillText(`Frame: ${frame}`, canvas.width / 2, canvas.height / 2);
      
      animationRef.current = requestAnimationFrame(animate);
    };
    
    if (isRunning) {
      animate();
    }
  };

  const startEmulation = () => {
    if (!isLoaded) return;
    
    setIsRunning(true);
    console.log('Iniciando emulação...');
    
    if (nesRef.current) {
      console.log('Usando emulador jsnes real');
      setDebugInfo('Emulador jsnes iniciado');
      
      const gameLoop = () => {
        if (nesRef.current && isRunning) {
          try {
            nesRef.current.frame();
            animationRef.current = requestAnimationFrame(gameLoop);
          } catch (error) {
            console.error('Erro no loop do jogo:', error);
            setError(`Erro na execução: ${error}`);
            setIsRunning(false);
          }
        }
      };
      gameLoop();
    } else {
      console.log('Usando simulação');
      setDebugInfo('Usando simulação visual');
      showGameSimulation('jsnes não inicializado');
    }
  };

  const stopEmulation = () => {
    setIsRunning(false);
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    console.log('Emulação pausada');
    setDebugInfo('Emulação pausada');
  };

  const handleButtonPress = (button: string, pressed: boolean) => {
    console.log(`Botão ${button} ${pressed ? 'pressionado' : 'solto'}`);
    
    if (nesRef.current) {
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
        try {
          if (pressed) {
            nesRef.current.buttonDown(1, buttonId);
            console.log(`jsnes: Botão ${button} (${buttonId}) pressionado`);
          } else {
            nesRef.current.buttonUp(1, buttonId);
            console.log(`jsnes: Botão ${button} (${buttonId}) solto`);
          }
        } catch (error) {
          console.error('Erro ao enviar comando para jsnes:', error);
        }
      }
    }

    onButtonPress?.(button, pressed);
  };

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
          
          {debugInfo && (
            <div className="text-center text-white bg-blue-600/20 p-4 rounded-lg border border-blue-500 max-w-md">
              <h3 className="font-semibold mb-2">Debug Info</h3>
              <p className="text-xs font-mono">{debugInfo}</p>
            </div>
          )}
          
          {!error && isLoaded && (
            <div className="text-center text-white bg-green-600/20 p-4 rounded-lg border border-green-500">
              <h3 className="font-semibold mb-2">Emulador Pronto!</h3>
              <div className="text-sm space-y-1">
                <p>• {nesRef.current ? 'jsnes carregado' : 'Simulação ativa'}</p>
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
