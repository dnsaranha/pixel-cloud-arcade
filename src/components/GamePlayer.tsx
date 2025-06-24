
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Maximize, Volume2, Settings, Pause, Play, Minimize } from "lucide-react";
import VirtualControls from "./VirtualControls";
import RealEmulator from "./RealEmulator";
import { Game } from "@/utils/gameData";
import { getROMById } from "@/utils/romData";

interface GamePlayerProps {
  game: Game;
  onBack: () => void;
}

const GamePlayer = ({ game, onBack }: GamePlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [emulatorError, setEmulatorError] = useState<string | null>(null);
  const [isEmulatorLoaded, setIsEmulatorLoaded] = useState(false);

  const romInfo = getROMById(game.id);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowControls(false);
    }, 3000);

    // Detectar mudanças de tela cheia
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);

    return () => {
      clearTimeout(timer);
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const toggleFullscreen = async () => {
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch (error) {
      console.error('Erro ao alternar tela cheia:', error);
    }
  };

  const handleEmulatorLoad = () => {
    setIsEmulatorLoaded(true);
    setEmulatorError(null);
  };

  const handleEmulatorError = (error: string) => {
    setEmulatorError(error);
    setIsEmulatorLoaded(false);
  };

  const fullscreenClass = isFullscreen ? "fixed inset-0 z-50 bg-black" : "max-w-7xl mx-auto";

  return (
    <div className={fullscreenClass}>
      {/* Header - oculto em tela cheia */}
      {!isFullscreen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-black/20 backdrop-blur-md rounded-lg p-4 mb-6 border border-white/10"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img
                src={game.image}
                alt={game.title}
                className="w-16 h-16 rounded-lg object-cover"
              />
              <div>
                <h2 className="text-2xl font-bold text-white">{game.title}</h2>
                <p className="text-gray-300">{game.console} • ⭐ {game.rating}</p>
                {romInfo?.isHomebrew && (
                  <span className="inline-block bg-green-600 text-white text-xs px-2 py-1 rounded mt-1">
                    Homebrew
                  </span>
                )}
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={togglePlayPause}
                className="bg-blue-600 hover:bg-blue-700 p-3 rounded-full transition-colors"
              >
                {isPlaying ? <Pause className="w-5 h-5 text-white" /> : <Play className="w-5 h-5 text-white" />}
              </button>
              <button 
                onClick={toggleFullscreen}
                className="bg-white/10 hover:bg-white/20 p-3 rounded-full transition-colors"
              >
                <Maximize className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>
        </motion.div>
      )}

      <div className={`${isFullscreen ? 'h-full flex flex-col' : 'grid lg:grid-cols-3 gap-6'}`}>
        {/* Game Screen */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className={isFullscreen ? 'flex-1 relative' : 'lg:col-span-2'}
        >
          <div className={`relative bg-black rounded-xl overflow-hidden shadow-2xl border border-white/20 ${isFullscreen ? 'h-full' : 'p-4'}`}>
            {romInfo && game.hasRealEmulation ? (
              <div className="flex flex-col items-center h-full">
                <RealEmulator
                  romUrl={romInfo.romUrl}
                  onLoad={handleEmulatorLoad}
                  onError={handleEmulatorError}
                  isFullscreen={isFullscreen}
                />
                {emulatorError && !isFullscreen && (
                  <div className="mt-4 p-4 bg-red-600/20 border border-red-500 rounded-lg text-white">
                    <p className="font-semibold">Erro no Emulador:</p>
                    <p className="text-sm">{emulatorError}</p>
                  </div>
                )}
              </div>
            ) : (
              <div className="aspect-video bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center mb-4 mx-auto">
                    <Settings className="w-8 h-8 text-white" />
                  </div>
                  <p className="text-white text-xl font-semibold mb-2">Jogo Não Disponível</p>
                  <p className="text-gray-400 max-w-md mx-auto">
                    Este jogo precisa de um arquivo ROM válido. Adicione o arquivo na pasta public/roms/
                  </p>
                </div>
              </div>
            )}

            {/* Controles em tela cheia - apenas mobile */}
            {isFullscreen && (
              <>
                {/* Botão sair da tela cheia */}
                <button
                  onClick={toggleFullscreen}
                  className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 p-2 rounded-full transition-colors z-10"
                >
                  <Minimize className="w-5 h-5 text-white" />
                </button>
                
                {/* Controles virtuais com transparência */}
                <div className="absolute bottom-4 left-4 right-4 md:hidden">
                  <div className="bg-black/30 backdrop-blur-sm rounded-xl p-4">
                    <VirtualControls console={game.console} isFullscreen={true} />
                  </div>
                </div>
              </>
            )}
          </div>
        </motion.div>

        {/* Virtual Controls - apenas quando não está em tela cheia */}
        {!isFullscreen && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <VirtualControls console={game.console} isFullscreen={false} />
          </motion.div>
        )}
      </div>

      {/* Game Stats - oculto em tela cheia */}
      {!isFullscreen && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          <div className="bg-black/20 backdrop-blur-md rounded-lg p-4 text-center border border-white/10">
            <div className="text-2xl font-bold text-blue-400">
              {isEmulatorLoaded ? 'Real' : 'Off'}
            </div>
            <div className="text-gray-400 text-sm">Emulador</div>
          </div>
          <div className="bg-black/20 backdrop-blur-md rounded-lg p-4 text-center border border-white/10">
            <div className="text-2xl font-bold text-green-400">NES</div>
            <div className="text-gray-400 text-sm">Console</div>
          </div>
          <div className="bg-black/20 backdrop-blur-md rounded-lg p-4 text-center border border-white/10">
            <div className="text-2xl font-bold text-purple-400">60 FPS</div>
            <div className="text-gray-400 text-sm">Taxa</div>
          </div>
          <div className="bg-black/20 backdrop-blur-md rounded-lg p-4 text-center border border-white/10">
            <div className="text-2xl font-bold text-yellow-400">
              {romInfo ? 'ROM' : 'N/A'}
            </div>
            <div className="text-gray-400 text-sm">Status</div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default GamePlayer;
