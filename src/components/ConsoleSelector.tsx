
import { motion } from "framer-motion";
import { Github, Upload, FileText } from "lucide-react";

interface ConsoleSelectorProps {
  onConsoleSelect: (console: string) => void;
}

const consoles = [
  {
    id: "nintendo",
    name: "Nintendo NES",
    description: "Emulador demonstrativo funcional",
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
          Emulador Nintendo NES
        </h2>
        <p className="text-xl text-gray-300">
          Emulador demonstrativo - Adicione seus próprios jogos via GitHub
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
                  <span className="text-white font-semibold">{console.gameCount} jogo demonstrativo</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      
      {/* Instruções detalhadas para adicionar jogos */}
      <div className="mt-12 space-y-6">
        {/* Seção GitHub */}
        <div className="bg-black/20 backdrop-blur-md rounded-xl p-6 border border-green-500/30">
          <div className="flex items-center gap-3 mb-4">
            <Github className="w-6 h-6 text-green-400" />
            <h3 className="text-white text-xl font-semibold">Método 1: Via GitHub (Recomendado)</h3>
          </div>
          <div className="text-gray-300 space-y-3 text-sm">
            <div className="flex items-start gap-3">
              <span className="bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">1</span>
              <p>Clique no botão verde <strong>"GitHub"</strong> no topo direito da tela</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">2</span>
              <p>Conecte sua conta GitHub e crie o repositório</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">3</span>
              <p>No seu repositório GitHub, vá para a pasta <code className="bg-gray-800 px-2 py-1 rounded">public/roms/</code></p>
            </div>
            <div className="flex items-start gap-3">
              <span className="bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">4</span>
              <p>Faça upload dos seus arquivos <code className="bg-gray-800 px-2 py-1 rounded">.nes</code></p>
            </div>
            <div className="flex items-start gap-3">
              <span className="bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">5</span>
              <p>Edite <code className="bg-gray-800 px-2 py-1 rounded">src/utils/romData.ts</code> e <code className="bg-gray-800 px-2 py-1 rounded">src/utils/gameData.ts</code></p>
            </div>
          </div>
        </div>

        {/* Aviso sobre emulação */}
        <div className="bg-yellow-600/20 border border-yellow-500 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <FileText className="w-6 h-6 text-yellow-400" />
            <h3 className="text-white text-xl font-semibold">Sobre a Emulação</h3>
          </div>
          <div className="text-gray-300 space-y-2 text-sm">
            <p>• Este é um <strong>emulador demonstrativo</strong> que simula a interface</p>
            <p>• Para emulação real, seria necessário integrar bibliotecas como jsnes</p>
            <p>• Os arquivos ROM são carregados mas não executados</p>
            <p>• Perfeito para demonstrar a interface e funcionalidades</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConsoleSelector;
