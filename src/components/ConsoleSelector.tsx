
import { motion } from "framer-motion";

interface ConsoleSelectorProps {
  onConsoleSelect: (console: string) => void;
}

const consoles = [
  {
    id: "wii",
    name: "Nintendo Wii",
    description: "Motion gaming revolucionário",
    color: "from-blue-500 to-cyan-400",
    icon: "🎮",
    gameCount: 150
  },
  {
    id: "nintendo",
    name: "Nintendo Clássico",
    description: "Os clássicos atemporais do NES/SNES",
    color: "from-red-500 to-pink-400",
    icon: "🍄",
    gameCount: 200
  },
  {
    id: "sega",
    name: "Sega Genesis",
    description: "A era dourada dos 16-bits",
    color: "from-purple-500 to-indigo-400",
    icon: "💫",
    gameCount: 120
  }
];

const ConsoleSelector = ({ onConsoleSelect }: ConsoleSelectorProps) => {
  return (
    <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
      {consoles.map((console, index) => (
        <motion.div
          key={console.id}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1, duration: 0.6 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="cursor-pointer"
          onClick={() => onConsoleSelect(console.id)}
        >
          <div className={`bg-gradient-to-br ${console.color} p-8 rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 border border-white/20`}>
            <div className="text-center">
              <div className="text-6xl mb-4">{console.icon}</div>
              <h3 className="text-2xl font-bold text-white mb-2">{console.name}</h3>
              <p className="text-white/80 mb-4">{console.description}</p>
              <div className="bg-black/20 rounded-lg p-3 backdrop-blur-sm">
                <span className="text-white font-semibold">{console.gameCount}+ jogos disponíveis</span>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default ConsoleSelector;
