
export interface Game {
  id: string;
  title: string;
  console: string;
  description: string;
  image: string;
  rating: number;
  year: number;
  genre: string;
}

const wiiGames: Game[] = [
  {
    id: "wii-sports",
    title: "Wii Sports",
    console: "Nintendo Wii",
    description: "O clássico pack de jogos esportivos que revolucionou o gaming com controles de movimento.",
    image: "https://images.unsplash.com/photo-1511512578047-411b9d6e3e8b?w=400&h=300&fit=crop",
    rating: 4.8,
    year: 2006,
    genre: "Esportes"
  },
  {
    id: "mario-kart-wii",
    title: "Mario Kart Wii",
    console: "Nintendo Wii",
    description: "Corridas frenéticas com Mario e seus amigos, incluindo o volante inovador do Wii.",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
    rating: 4.9,
    year: 2008,
    genre: "Corrida"
  },
  {
    id: "super-mario-galaxy",
    title: "Super Mario Galaxy",
    console: "Nintendo Wii",
    description: "Mario explora galáxias em uma aventura 3D revolucionária com física gravitacional única.",
    image: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=400&h=300&fit=crop",
    rating: 4.9,
    year: 2007,
    genre: "Plataforma"
  },
  {
    id: "wii-play",
    title: "Wii Play",
    console: "Nintendo Wii",
    description: "Coleção de mini-jogos divertidos que demonstram as capacidades do controle Wiimote.",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&h=300&fit=crop",
    rating: 4.2,
    year: 2006,
    genre: "Party"
  }
];

const nintendoGames: Game[] = [
  {
    id: "super-mario-bros",
    title: "Super Mario Bros",
    console: "Nintendo NES",
    description: "O jogo que definiu os jogos de plataforma e salvou a indústria dos videogames.",
    image: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=400&h=300&fit=crop",
    rating: 4.9,
    year: 1985,
    genre: "Plataforma"
  },
  {
    id: "zelda-link-awakening",
    title: "The Legend of Zelda",
    console: "Nintendo NES",
    description: "A aventura épica que deu início à lendária série Zelda.",
    image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=300&fit=crop",
    rating: 4.8,
    year: 1986,
    genre: "Aventura"
  },
  {
    id: "metroid",
    title: "Metroid",
    console: "Nintendo NES",
    description: "Explore o planeta Zebes como Samus Aran nesta aventura sci-fi atmosférica.",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=300&fit=crop",
    rating: 4.7,
    year: 1986,
    genre: "Ação/Aventura"
  },
  {
    id: "donkey-kong",
    title: "Donkey Kong",
    console: "Nintendo NES",
    description: "O clássico arcade onde Mario (Jumpman) enfrenta o gigante Donkey Kong.",
    image: "https://images.unsplash.com/photo-1555864326-5cf22ef123cf?w=400&h=300&fit=crop",
    rating: 4.5,
    year: 1981,
    genre: "Arcade"
  },
  {
    id: "super-mario-world",
    title: "Super Mario World",
    console: "Nintendo SNES",
    description: "Mario e Yoshi se aventuram na Dinosaur Land em uma das melhores sequências da série.",
    image: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=400&h=300&fit=crop",
    rating: 4.9,
    year: 1990,
    genre: "Plataforma"
  },
  {
    id: "zelda-link-to-past",
    title: "A Link to the Past",
    console: "Nintendo SNES",
    description: "Link deve salvar Hyrule em uma aventura que se passa em dois mundos paralelos.",
    image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=300&fit=crop",
    rating: 4.9,
    year: 1991,
    genre: "Aventura"
  }
];

const segaGames: Game[] = [
  {
    id: "sonic-hedgehog",
    title: "Sonic the Hedgehog",
    console: "Sega Genesis",
    description: "O ouriço azul mais rápido do mundo em sua primeira aventura revolucionária.",
    image: "https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?w=400&h=300&fit=crop",
    rating: 4.8,
    year: 1991,
    genre: "Plataforma"
  },
  {
    id: "sonic-2",
    title: "Sonic the Hedgehog 2",
    console: "Sega Genesis",
    description: "Sonic e Tails se unem para derrotar Dr. Robotnik em uma aventura ainda mais rápida.",
    image: "https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?w=400&h=300&fit=crop",
    rating: 4.9,
    year: 1992,
    genre: "Plataforma"
  },
  {
    id: "streets-of-rage",
    title: "Streets of Rage",
    console: "Sega Genesis",
    description: "Beat 'em up clássico onde você luta para limpar as ruas da cidade do crime.",
    image: "https://images.unsplash.com/photo-1511512578047-411b9d6e3e8b?w=400&h=300&fit=crop",
    rating: 4.6,
    year: 1991,
    genre: "Beat 'em up"
  },
  {
    id: "golden-axe",
    title: "Golden Axe",
    console: "Sega Genesis",
    description: "Aventura medieval de fantasia com guerreiros lutando contra o malvado Death Adder.",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
    rating: 4.5,
    year: 1989,
    genre: "Beat 'em up"
  },
  {
    id: "altered-beast",
    title: "Altered Beast",
    console: "Sega Genesis",
    description: "Transforme-se em bestas poderosas para salvar Athena do submundo.",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=300&fit=crop",
    rating: 4.3,
    year: 1988,
    genre: "Beat 'em up"
  }
];

export const getGamesByConsole = (console: string): Game[] => {
  switch (console) {
    case "wii":
      return wiiGames;
    case "nintendo":
      return nintendoGames;
    case "sega":
      return segaGames;
    default:
      return [];
  }
};

export const getAllGames = (): Game[] => {
  return [...wiiGames, ...nintendoGames, ...segaGames];
};
