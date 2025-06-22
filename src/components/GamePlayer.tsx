
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Maximize, Volume2, Settings, Pause, Play } from "lucide-react";
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
  const [volume, setVolume] = useState(80);
  const [emulatorError, setEmulatorError] = useState<string | null>(null);
  const [isEmulatorLoaded, setIsEmulatorLoaded] = useState(false);

  // Buscar ROM correspondente ao jogo
  const romInfo = getROMById(game.id);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowControls(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleEmulatorLoad = () => {
    setIsEmulatorLoaded(true);
    setEmulatorError(null);
  };

  const handleEmulatorError = (error: string) => {
    setEmulatorError(error);
    setIsEmulatorLoaded(false);
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Game Info Header */}
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
          
          <div className="flex items-center gap-4">
            <button
              onClick={togglePlayPause}
              className="bg-blue-600 hover:bg-blue-700 p-3 rounded-full transition-colors"
            >
              {isPlaying ? <Pause className="w-5 h-5 text-white" /> : <Play className="w-5 h-5 text-white" />}
            </button>
            <button className="bg-white/10 hover:bg-white/20 p-3 rounded-full transition-colors">
              <Volume2 className="w-5 h-5 text-white" />
            </button>
            <button className="bg-white/10 hover:bg-white/20 p-3 rounded-full transition-colors">
              <Maximize className="w-5 h-5 text-white" />
            </button>
            <button className="bg-white/10 hover:bg-white/20 p-3 rounded-full transition-colors">
              <Settings className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Game Screen */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="lg:col-span-2"
        >
          <div className="relative bg-black rounded-xl overflow-hidden shadow-2xl border border-white/20 p-4">
            {romInfo && game.console.toLowerCase().includes('nintendo') ? (
              <div className="flex flex-col items-center">
                <RealEmulator
                  romUrl={romInfo.romUrl}
                  onLoad={handleEmulatorLoad}
                  onError={handleEmulatorError}
                />
                {emulatorError && (
                  <div className="mt-4 p-4 bg-red-600/20 border border-red-500 rounded-lg text-white">
                    <p className="font-semibold">Erro no Emulador:</p>
                    <p className="text-sm">{emulatorError}</p>
                    <p className="text-xs mt-2 text-gray-300">
                      Nota: Para funcionar, você precisa adicionar arquivos ROM válidos na pasta public/roms/
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <div className="aspect-video bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-20 h-20 bg-yellow-600 rounded-full flex items-center justify-center mb-4 mx-auto">
                    <Settings className="w-8 h-8 text-white" />
                  </div>
                  <p className="text-white text-xl font-semibold mb-2">Emulador em Desenvolvimento</p>
                  <p className="text-gray-400 max-w-md mx-auto">
                    Emulação real disponível apenas para jogos Nintendo NES por enquanto. 
                    Outros consoles em breve!
                  </p>
                </div>
              </div>
            )}
            
            {/* Game Overlay Controls */}
            {showControls && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-black/20 flex items-center justify-center pointer-events-none"
                onMouseEnter={() => setShowControls(true)}
                onMouseLeave={() => setTimeout(() => setShowControls(false), 2000)}
              >
                <div className="bg-black/70 backdrop-blur-sm rounded-lg p-4 text-white">
                  <p className="text-center">Use os controles virtuais ou seu teclado para jogar</p>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Virtual Controls */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <VirtualControls console={game.console} />
        </motion.div>
      </div>

      {/* Game Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4"
      >
        <div className="bg-black/20 backdrop-blur-md rounded-lg p-4 text-center border border-white/10">
          <div className="text-2xl font-bold text-blue-400">
            {isEmulatorLoaded ? 'Real' : 'Demo'}
          </div>
          <div className="text-gray-400 text-sm">Modo</div>
        </div>
        <div className="bg-black/20 backdrop-blur-md rounded-lg p-4 text-center border border-white/10">
          <div className="text-2xl font-bold text-green-400">
            {romInfo?.isHomebrew ? 'Homebrew' : 'Oficial'}
          </div>
          <div className="text-gray-400 text-sm">Tipo</div>
        </div>
        <div className="bg-black/20 backdrop-blur-md rounded-lg p-4 text-center border border-white/10">
          <div className="text-2xl font-bold text-purple-400">NES</div>
          <div className="text-gray-400 text-sm">Emulador</div>
        </div>
        <div className="bg-black/20 backdrop-blur-md rounded-lg p-4 text-center border border-white/10">
          <div className="text-2xl font-bold text-yellow-400">60 FPS</div>
          <div className="text-gray-400 text-sm">Taxa</div>
        </div>
      </motion.div>
    </div>
  );
};

export default GamePlayer;
