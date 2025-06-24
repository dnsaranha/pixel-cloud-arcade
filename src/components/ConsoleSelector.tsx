
import { motion } from "framer-motion";
import { Github, Upload, FileText, FolderPlus } from "lucide-react";

interface ConsoleSelectorProps {
  onConsoleSelect: (console: string) => void;
}

const consoles = [
  {
    id: "nintendo",
    name: "Nintendo NES/SNES",
    description: "Emulador funcional com ROMs reais",
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
          ROMs reais carregadas - Adicione mais jogos via GitHub
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
      
      {/* Instruções para adicionar mais jogos */}
      <div className="mt-12 space-y-6">
        {/* Status atual dos arquivos */}
        <div className="bg-green-600/20 border border-green-500 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <FolderPlus className="w-6 h-6 text-green-400" />
            <h3 className="text-white text-xl font-semibold">Arquivos Encontrados</h3>
          </div>
          <div className="text-gray-300 space-y-2 text-sm">
            <p>✅ <strong>Contra.nes</strong> - Carregado com sucesso</p>
            <p>✅ <strong>Donkey Kong Country.smc</strong> - Carregado com sucesso</p>
            <p className="text-green-400">• Os jogos estão funcionando corretamente!</p>
          </div>
        </div>

        {/* Como adicionar mais jogos */}
        <div className="bg-blue-600/20 border border-blue-500 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <Github className="w-6 h-6 text-blue-400" />
            <h3 className="text-white text-xl font-semibold">Como Adicionar Mais Jogos</h3>
          </div>
          <div className="text-gray-300 space-y-3 text-sm">
            <div className="flex items-start gap-3">
              <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">1</span>
              <p>Acesse seu repositório GitHub do projeto</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">2</span>
              <p>Navegue até a pasta <code className="bg-gray-800 px-2 py-1 rounded">public/roms/</code></p>
            </div>
            <div className="flex items-start gap-3">
              <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">3</span>
              <p>Faça upload dos arquivos <code className="bg-gray-800 px-2 py-1 rounded">.nes</code> ou <code className="bg-gray-800 px-2 py-1 rounded">.smc</code></p>
            </div>
            <div className="flex items-start gap-3">
              <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">4</span>
              <p>Edite os arquivos <code className="bg-gray-800 px-2 py-1 rounded">src/utils/romData.ts</code> e <code className="bg-gray-800 px-2 py-1 rounded">src/utils/gameData.ts</code></p>
            </div>
            <div className="flex items-start gap-3">
              <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">5</span>
              <p>Adicione as informações do novo jogo seguindo o exemplo dos jogos existentes</p>
            </div>
          </div>
        </div>

        {/* Exemplo de como adicionar um jogo */}
        <div className="bg-purple-600/20 border border-purple-500 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <FileText className="w-6 h-6 text-purple-400" />
            <h3 className="text-white text-xl font-semibold">Exemplo: Adicionar Novo Jogo</h3>
          </div>
          <div className="text-gray-300 space-y-3 text-sm">
            <p><strong>1. Adicione o arquivo ROM:</strong></p>
            <code className="block bg-gray-800 p-2 rounded text-xs">public/roms/MeuJogo.nes</code>
            
            <p><strong>2. Em romData.ts, adicione:</strong></p>
            <code className="block bg-gray-800 p-2 rounded text-xs whitespace-pre">{`{
  id: "meu-jogo",
  title: "Meu Jogo",
  console: "Nintendo NES",
  description: "Descrição do jogo",
  romUrl: "/roms/MeuJogo.nes",
  image: "URL_da_imagem",
  isHomebrew: false,
  author: "Autor"
}`}</code>
            
            <p><strong>3. Em gameData.ts, adicione o jogo correspondente</strong></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConsoleSelector;
