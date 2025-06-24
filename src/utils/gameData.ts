
export interface Game {
  id: string;
  title: string;
  console: string;
  description: string;
  image: string;
  rating: number;
  year: number;
  genre: string;
  hasRealEmulation: boolean;
}

// Apenas jogos com emulação real funcional
const functionalGames: Game[] = [
  {
    id: "contra",
    title: "Contra",
    console: "Nintendo NES",
    description: "Jogo de ação cooperativo - Emulação real disponível!",
    image: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=400&h=300&fit=crop",
    rating: 4.8,
    year: 1987,
    genre: "Ação",
    hasRealEmulation: true
  }
];

export const getGamesByConsole = (console: string): Game[] => {
  switch (console) {
    case "nintendo":
      return functionalGames.filter(game => game.console.includes("Nintendo"));
    default:
      return [];
  }
};

export const getAllGames = (): Game[] => {
  return functionalGames;
};
