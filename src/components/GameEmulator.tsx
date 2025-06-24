
import { useState } from "react";
import ConsoleSelector from "./ConsoleSelector";
import GameLibrary from "./GameLibrary";
import GamePlayer from "./GamePlayer";
import { Game } from "@/utils/gameData";

const GameEmulator = () => {
  const [selectedConsole, setSelectedConsole] = useState<string>("");
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleConsoleSelect = (console: string) => {
    setSelectedConsole(console);
    setSelectedGame(null);
    setIsPlaying(false);
  };

  const handleGameSelect = (game: Game) => {
    setSelectedGame(game);
    setIsPlaying(true);
  };

  const handleBackToLibrary = () => {
    setIsPlaying(false);
    setSelectedGame(null);
  };

  const handleBackToConsoles = () => {
    setSelectedConsole("");
    setSelectedGame(null);
    setIsPlaying(false);
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-black/20 backdrop-blur-md border-b border-white/10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-white flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-pink-600 rounded-lg flex items-center justify-center">
                🎮
              </div>
              NES Emulator
            </h1>
            {(selectedConsole || isPlaying) && (
              <button
                onClick={selectedConsole && !isPlaying ? handleBackToConsoles : handleBackToLibrary}
                className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-white transition-all duration-300"
              >
                ← Voltar
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {!selectedConsole && (
          <div className="text-center mb-12">
            <h2 className="text-5xl font-bold text-white mb-4">
              Emulador Nintendo NES
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Jogue clássicos do Nintendo NES diretamente no navegador. 
              Adicione seus próprios jogos através do GitHub!
            </p>
          </div>
        )}

        {isPlaying && selectedGame ? (
          <GamePlayer game={selectedGame} onBack={handleBackToLibrary} />
        ) : selectedConsole ? (
          <GameLibrary console={selectedConsole} onGameSelect={handleGameSelect} />
        ) : (
          <ConsoleSelector onConsoleSelect={handleConsoleSelect} />
        )}
      </main>
    </div>
  );
};

export default GameEmulator;
