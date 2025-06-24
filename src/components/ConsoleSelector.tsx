
import { motion } from "framer-motion";

interface ConsoleSelectorProps {
  onConsoleSelect: (console: string) => void;
}

const consoles = [
  {
    id: "nintendo",
    name: "Nintendo NES",
    description: "Emulação real funcional",
    color: "from-red-500 to-pink-400",
    icon: "🍄",
    gameCount: 1
  }
];

const ConsoleSelector = ({ onConsoleSelect }: ConsoleSelectorProps) => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold text-white mb-4">
          Emuladores Funcionais
        </h2>
        <p className="text-xl text-gray-300">
          Apenas consoles com emulação real implementada
        </p>
      </div>
      
      <div className="grid md:grid-cols-1 gap-8 max-w-md mx-auto">
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
                  <span className="text-white font-semibold">{console.gameCount} jogo funcional</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      
      {/* Instruções para adicionar jogos */}
      <div className="mt-12 bg-black/20 backdrop-blur-md rounded-xl p-6 border border-white/10">
        <h3 className="text-white text-xl font-semibold mb-4">Como Adicionar Seus Jogos</h3>
        <div className="text-gray-300 space-y-2">
          <p>1. Conecte seu projeto ao GitHub (botão verde no topo)</p>
          <p>2. Adicione arquivos .nes na pasta <code className="bg-gray-800 px-2 py-1 rounded">public/roms/</code></p>
          <p>3. Atualize o arquivo <code className="bg-gray-800 px-2 py-1 rounded">src/utils/romData.ts</code></p>
          <p>4. Adicione o jogo em <code className="bg-gray-800 px-2 py-1 rounded">src/utils/gameData.ts</code></p>
        </div>
      </div>
    </div>
  );
};

export default ConsoleSelector;
