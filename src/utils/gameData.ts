
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

// Jogos baseados nos ROMs disponíveis
const availableGames: Game[] = [
  {
    id: "contra",
    title: "Contra",
    console: "Nintendo NES",
    description: "Jogo de ação cooperativo - ROM disponível no projeto!",
    image: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=400&h=300&fit=crop",
    rating: 4.8,
    year: 1987,
    genre: "Ação",
    hasRealEmulation: true
  },
  {
    id: "donkey-kong-country",
    title: "Donkey Kong Country",
    console: "Super Nintendo",
    description: "Aventura clássica - ROM disponível no projeto!",
    image: "https://images.unsplash.com/photo-1555864326-5cf22ef123cf?w=400&h=300&fit=crop",
    rating: 4.9,
    year: 1994,
    genre: "Plataforma",
    hasRealEmulation: true
  }
];

export const getGamesByConsole = (console: string): Game[] => {
  switch (console) {
    case "nintendo":
      return availableGames.filter(game => 
        game.console.includes("Nintendo NES") || game.console.includes("Super Nintendo")
      );
    default:
      return availableGames;
  }
};

export const getAllGames = (): Game[] => {
  return availableGames;
};
