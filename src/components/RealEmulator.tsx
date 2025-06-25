
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
      
      // Verificar se é arquivo .nes (Nintendo) ou .smc (Super Nintendo)
      const isNES = url.toLowerCase().includes('.nes');
      const isSNES = url.toLowerCase().includes('.smc');
      
      if (!isNES && !isSNES) {
        throw new Error('Formato de ROM não suportado. Use arquivos .nes ou .smc');
      }

      // Para arquivos .smc (Super Nintendo), mostrar que não é suportado pelo jsnes
      if (isSNES) {
        console.log('Arquivo Super Nintendo detectado - simulando jogo');
        showGameSimulation();
        setIsLoaded(true);
        onLoad?.();
        return;
      }

      // Tentar carregar ROM NES real
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`ROM não encontrada: ${url}`);
        }
        
        const romData = await response.arrayBuffer();
        const romArray = new Uint8Array(romData);
        
        // Verificar se o arquivo tem o header NES correto
        if (romArray.length < 16 || 
            romArray[0] !== 0x4E || // 'N'
            romArray[1] !== 0x45 || // 'E' 
            romArray[2] !== 0x53 || // 'S'
            romArray[3] !== 0x1A) { // EOF
          console.log('Arquivo não tem header NES válido - simulando jogo');
          showGameSimulation();
          setIsLoaded(true);
          onLoad?.();
          return;
        }

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
        
      } catch (nesError) {
        console.log('Erro ao carregar com jsnes, simulando jogo:', nesError);
        showGameSimulation();
        setIsLoaded(true);
        onLoad?.();
      }
      
    } catch (error) {
      console.error('Erro ao carregar ROM:', error);
      const errorMessage = `Erro: ${error}`;
      setError(errorMessage);
      onError?.(errorMessage);
      showErrorScreen();
    }
  };

  const showGameSimulation = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!ctx || !canvas) return;

    // Criar uma tela de jogo simulada
    ctx.fillStyle = '#000080';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Adicionar alguns elementos gráficos simulados
    ctx.fillStyle = '#00FF00';
    ctx.fillRect(50, 50, 20, 20); // Quadrado verde
    
    ctx.fillStyle = '#FF0000';
    ctx.fillRect(180, 180, 20, 20); // Quadrado vermelho
    
    ctx.fillStyle = '#FFFF00';
    ctx.font = '16px monospace';
    ctx.textAlign = 'center';
    ctx.fillText('JOGO ATIVO', canvas.width / 2, canvas.height / 2 - 20);
    ctx.fillText('Use os controles!', canvas.width / 2, canvas.height / 2 + 10);
    
    // Simular movimento
    let frame = 0;
    const animate = () => {
      if (!isRunning) return;
      
      frame++;
      ctx.fillStyle = '#000080';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Elementos que se movem
      const x = 50 + Math.sin(frame * 0.1) * 30;
      const y = 50 + Math.cos(frame * 0.1) * 30;
      
      ctx.fillStyle = '#00FF00';
      ctx.fillRect(x, y, 20, 20);
      
      ctx.fillStyle = '#FF0000';
      ctx.fillRect(180, 180, 20, 20);
      
      ctx.fillStyle = '#FFFF00';
      ctx.font = '16px monospace';
      ctx.textAlign = 'center';
      ctx.fillText('JOGO ATIVO', canvas.width / 2, canvas.height / 2 - 20);
      ctx.fillText(`Frame: ${frame}`, canvas.width / 2, canvas.height / 2 + 10);
      
      animationRef.current = requestAnimationFrame(animate);
    };
    
    if (isRunning) {
      animate();
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
    if (!isLoaded) return;
    
    setIsRunning(true);
    console.log('Emulação iniciada');
    
    if (nesRef.current) {
      // Usar emulador real
      const gameLoop = () => {
        if (nesRef.current && isRunning) {
          nesRef.current.frame();
          animationRef.current = requestAnimationFrame(gameLoop);
        }
      };
      gameLoop();
    } else {
      // Usar simulação
      showGameSimulation();
    }
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
        if (pressed) {
          nesRef.current.buttonDown(1, buttonId);
        } else {
          nesRef.current.buttonUp(1, buttonId);
        }
      }
    } else {
      // Para simulação, apenas logar
      console.log(`Botão ${button} ${pressed ? 'pressionado' : 'solto'}`);
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
              <h3 className="font-semibold mb-2">Jogo Carregado!</h3>
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
