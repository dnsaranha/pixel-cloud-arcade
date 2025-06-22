
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Maximize, Volume2, Settings, Pause, Play } from "lucide-react";
import VirtualControls from "./VirtualControls";
import { Game } from "@/utils/gameData";

interface GamePlayerProps {
  game: Game;
  onBack: () => void;
}

const GamePlayer = ({ game, onBack }: GamePlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [showControls, setShowControls] = useState(true);
  const [volume, setVolume] = useState(80);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowControls(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
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
          <div className="relative bg-black rounded-xl overflow-hidden shadow-2xl border border-white/20">
            <div className="aspect-video bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center">
              {isPlaying ? (
                <div className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mb-4 mx-auto animate-pulse">
                    <Play className="w-8 h-8 text-white" />
                  </div>
                  <p className="text-white text-xl font-semibold mb-2">Carregando {game.title}...</p>
                  <p className="text-gray-400">Simulando emulação do jogo</p>
                  <div className="mt-4 w-64 h-2 bg-gray-700 rounded-full mx-auto overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full animate-pulse" style={{width: '75%'}}></div>
                  </div>
                </div>
              ) : (
                <div className="text-center">
                  <div className="w-20 h-20 bg-gray-600 rounded-full flex items-center justify-center mb-4 mx-auto">
                    <Pause className="w-8 h-8 text-white" />
                  </div>
                  <p className="text-white text-xl font-semibold">Jogo Pausado</p>
                </div>
              )}
            </div>
            
            {/* Game Overlay Controls */}
            {showControls && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-black/20 flex items-center justify-center"
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
          <div className="text-2xl font-bold text-blue-400">0:45</div>
          <div className="text-gray-400 text-sm">Tempo Jogado</div>
        </div>
        <div className="bg-black/20 backdrop-blur-md rounded-lg p-4 text-center border border-white/10">
          <div className="text-2xl font-bold text-green-400">Nível 1</div>
          <div className="text-gray-400 text-sm">Progresso</div>
        </div>
        <div className="bg-black/20 backdrop-blur-md rounded-lg p-4 text-center border border-white/10">
          <div className="text-2xl font-bold text-purple-400">100</div>
          <div className="text-gray-400 text-sm">Pontos</div>
        </div>
        <div className="bg-black/20 backdrop-blur-md rounded-lg p-4 text-center border border-white/10">
          <div className="text-2xl font-bold text-yellow-400">3</div>
          <div className="text-gray-400 text-sm">Vidas</div>
        </div>
      </motion.div>
    </div>
  );
};

export default GamePlayer;
