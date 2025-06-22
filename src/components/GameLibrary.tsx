
import { motion } from "framer-motion";
import { Heart, Play, Star } from "lucide-react";
import { Game, getGamesByConsole } from "@/utils/gameData";

interface GameLibraryProps {
  console: string;
  onGameSelect: (game: Game) => void;
}

const GameLibrary = ({ console, onGameSelect }: GameLibraryProps) => {
  const games = getGamesByConsole(console);

  return (
    <div>
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold text-white mb-4">
          Biblioteca {console === "wii" ? "Nintendo Wii" : console === "nintendo" ? "Nintendo Clássico" : "Sega Genesis"}
        </h2>
        <p className="text-gray-300">Escolha um jogo para começar a jogar instantaneamente</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {games.map((game, index) => (
          <motion.div
            key={game.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05, duration: 0.4 }}
            whileHover={{ scale: 1.05 }}
            className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 border border-white/10"
          >
            <div className="relative">
              <img
                src={game.image}
                alt={game.title}
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-2 right-2 flex gap-2">
                <button className="bg-black/50 p-2 rounded-full hover:bg-black/70 transition-colors">
                  <Heart className="w-4 h-4 text-white" />
                </button>
              </div>
              <div className="absolute bottom-2 left-2 flex items-center gap-1 bg-black/70 px-2 py-1 rounded-full">
                <Star className="w-3 h-3 text-yellow-400 fill-current" />
                <span className="text-white text-xs">{game.rating}</span>
              </div>
            </div>
            
            <div className="p-4">
              <h3 className="text-white font-bold text-lg mb-2 line-clamp-1">{game.title}</h3>
              <p className="text-gray-400 text-sm mb-4 line-clamp-2">{game.description}</p>
              
              <button
                onClick={() => onGameSelect(game)}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Play className="w-4 h-4" />
                Jogar Agora
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default GameLibrary;
