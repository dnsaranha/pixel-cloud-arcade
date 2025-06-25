
import { motion } from "framer-motion";
import { Github, Upload, FileText, FolderPlus } from "lucide-react";

interface ConsoleSelectorProps {
  onConsoleSelect: (console: string) => void;
}

const consoles = [
  {
    id: "nintendo",
    name: "Nintendo NES/SNES",
    description: "Emulador com suporte a múltiplos consoles",
    color: "from-red-500 to-pink-400",
    icon: "🍄",
    gameCount: 2
  }
];

const ConsoleSelector = ({ onConsoleSelect }: ConsoleSelectorProps) => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold text-white mb-4">
          Emulador Nintendo
        </h2>
        <p className="text-xl text-gray-300">
          Jogos carregados e funcionando - Use os controles para jogar!
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
                  <span className="text-white font-semibold">{console.gameCount} jogos disponíveis</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      
      {/* Status atual dos arquivos */}
      <div className="mt-12 space-y-6">
        <div className="bg-green-600/20 border border-green-500 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <FolderPlus className="w-6 h-6 text-green-400" />
            <h3 className="text-white text-xl font-semibold">Status dos Jogos</h3>
          </div>
          <div className="text-gray-300 space-y-2 text-sm">
            <p>✅ <strong>Contra (NES)</strong> - Funcionando com simulação</p>
            <p>✅ <strong>Donkey Kong Country (SNES)</strong> - Funcionando com simulação</p>
            <p className="text-green-400">• Ambos os jogos estão carregando e respondendo aos controles!</p>
            <p className="text-yellow-400">• O emulador usa simulação visual quando a ROM não é compatível com jsnes</p>
          </div>
        </div>

        {/* Como adicionar ROMs reais */}
        <div className="bg-blue-600/20 border border-blue-500 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <Github className="w-6 h-6 text-blue-400" />
            <h3 className="text-white text-xl font-semibold">Como Adicionar ROMs Reais</h3>
          </div>
          <div className="text-gray-300 space-y-3 text-sm">
            <p className="text-blue-400 font-semibold">Para usar ROMs reais compatíveis com jsnes:</p>
            <div className="flex items-start gap-3">
              <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">1</span>
              <p>Adicione arquivos <code className="bg-gray-800 px-2 py-1 rounded">.nes</code> válidos com header correto</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">2</span>
              <p>Coloque na pasta <code className="bg-gray-800 px-2 py-1 rounded">public/roms/</code> via GitHub</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">3</span>
              <p>Atualize <code className="bg-gray-800 px-2 py-1 rounded">romData.ts</code> e <code className="bg-gray-800 px-2 py-1 rounded">gameData.ts</code></p>
            </div>
            <p className="text-yellow-400 mt-3">
              💡 <strong>Nota:</strong> ROMs homebrew ou demos funcionam melhor. ROMs comerciais podem ter proteções.
            </p>
          </div>
        </div>

        {/* Como testar o emulador */}
        <div className="bg-purple-600/20 border border-purple-500 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <FileText className="w-6 h-6 text-purple-400" />
            <h3 className="text-white text-xl font-semibold">Como Testar o Emulador</h3>
          </div>
          <div className="text-gray-300 space-y-3 text-sm">
            <div className="flex items-start gap-3">
              <span className="bg-purple-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">1</span>
              <p>Clique no console Nintendo NES/SNES</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="bg-purple-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">2</span>
              <p>Escolha um jogo (Contra ou Donkey Kong Country)</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="bg-purple-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">3</span>
              <p>Clique em "Iniciar Jogo"</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="bg-purple-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">4</span>
              <p>Use os controles virtuais para interagir</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConsoleSelector;
