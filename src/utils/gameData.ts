
export interface Game {
  id: string;
  title: string;
  console: string;
  description: string;
  image: string;
  rating: number;
  year: number;
  genre: string;
  hasRealEmulation?: boolean;
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
    genre: "Esportes",
    hasRealEmulation: false
  },
  {
    id: "mario-kart-wii",
    title: "Mario Kart Wii",
    console: "Nintendo Wii",
    description: "Corridas frenéticas com Mario e seus amigos, incluindo o volante inovador do Wii.",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
    rating: 4.9,
    year: 2008,
    genre: "Corrida",
    hasRealEmulation: false
  },
  {
    id: "super-mario-galaxy",
    title: "Super Mario Galaxy",
    console: "Nintendo Wii",
    description: "Mario explora galáxias em uma aventura 3D revolucionária com física gravitacional única.",
    image: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=400&h=300&fit=crop",
    rating: 4.9,
    year: 2007,
    genre: "Plataforma",
    hasRealEmulation: false
  },
  {
    id: "wii-play",
    title: "Wii Play",
    console: "Nintendo Wii",
    description: "Coleção de mini-jogos divertidos que demonstram as capacidades do controle Wiimote.",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&h=300&fit=crop",
    rating: 4.2,
    year: 2006,
    genre: "Party",
    hasRealEmulation: false
  }
];

const nintendoGames: Game[] = [
  {
    id: "test-rom",
    title: "NES Test ROM",
    console: "Nintendo NES",
    description: "ROM de teste para verificar funcionalidade do emulador NES real.",
    image: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=400&h=300&fit=crop",
    rating: 4.0,
    year: 2023,
    genre: "Teste",
    hasRealEmulation: true
  },
  {
    id: "homebrew-platformer",
    title: "Homebrew Platformer",
    console: "Nintendo NES",
    description: "Jogo de plataforma criado pela comunidade homebrew com emulação real.",
    image: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=400&h=300&fit=crop",
    rating: 4.2,
    year: 2023,
    genre: "Plataforma",
    hasRealEmulation: true
  },
  {
    id: "super-mario-bros",
    title: "Super Mario Bros (Demo)",
    console: "Nintendo NES",
    description: "Demo do clássico jogo que definiu os jogos de plataforma.",
    image: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=400&h=300&fit=crop",
    rating: 4.9,
    year: 1985,
    genre: "Plataforma",
    hasRealEmulation: false
  },
  {
    id: "zelda-link-awakening",
    title: "The Legend of Zelda (Demo)",
    console: "Nintendo NES",
    description: "Demo da aventura épica que deu início à lendária série Zelda.",
    image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=300&fit=crop",
    rating: 4.8,
    year: 1986,
    genre: "Aventura",
    hasRealEmulation: false
  },
  {
    id: "metroid",
    title: "Metroid (Demo)",
    console: "Nintendo NES",
    description: "Demo da exploração do planeta Zebes como Samus Aran.",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=300&fit=crop",
    rating: 4.7,
    year: 1986,
    genre: "Ação/Aventura",
    hasRealEmulation: false
  },
  {
    id: "donkey-kong",
    title: "Donkey Kong (Demo)",
    console: "Nintendo NES",
    description: "Demo do clássico arcade onde Mario enfrenta o gigante Donkey Kong.",
    image: "https://images.unsplash.com/photo-1555864326-5cf22ef123cf?w=400&h=300&fit=crop",
    rating: 4.5,
    year: 1981,
    genre: "Arcade",
    hasRealEmulation: false
  }
];

const segaGames: Game[] = [
  {
    id: "sonic-hedgehog",
    title: "Sonic the Hedgehog (Demo)",
    console: "Sega Genesis",
    description: "Demo do ouriço azul mais rápido do mundo em sua primeira aventura.",
    image: "https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?w=400&h=300&fit=crop",
    rating: 4.8,
    year: 1991,
    genre: "Plataforma",
    hasRealEmulation: false
  },
  {
    id: "sonic-2",
    title: "Sonic the Hedgehog 2 (Demo)",
    console: "Sega Genesis",
    description: "Demo de Sonic e Tails se unindo para derrotar Dr. Robotnik.",
    image: "https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?w=400&h=300&fit=crop",
    rating: 4.9,
    year: 1992,
    genre: "Plataforma",
    hasRealEmulation: false
  },
  {
    id: "streets-of-rage",
    title: "Streets of Rage (Demo)",
    console: "Sega Genesis",
    description: "Demo do beat 'em up clássico de limpeza das ruas da cidade.",
    image: "https://images.unsplash.com/photo-1511512578047-411b9d6e3e8b?w=400&h=300&fit=crop",
    rating: 4.6,
    year: 1991,
    genre: "Beat 'em up",
    hasRealEmulation: false
  },
  {
    id: "golden-axe",
    title: "Golden Axe (Demo)",
    console: "Sega Genesis",
    description: "Demo da aventura medieval de fantasia contra Death Adder.",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
    rating: 4.5,
    year: 1989,
    genre: "Beat 'em up",
    hasRealEmulation: false
  },
  {
    id: "altered-beast",
    title: "Altered Beast (Demo)",
    console: "Sega Genesis",
    description: "Demo da transformação em bestas poderosas para salvar Athena.",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=300&fit=crop",
    rating: 4.3,
    year: 1988,
    genre: "Beat 'em up",
    hasRealEmulation: false
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
