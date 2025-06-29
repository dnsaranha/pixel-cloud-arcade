
export interface ROMInfo {
  id: string;
  title: string;
  console: string;
  description: string;
  romUrl: string;
  image: string;
  isHomebrew: boolean;
  author?: string;
}

// ROMs disponíveis no projeto
export const nesROMs: ROMInfo[] = [
  {
    id: "contra",
    title: "Contra",
    console: "Nintendo NES",
    description: "O clássico jogo de ação cooperativo com soldados enfrentando alienígenas",
    romUrl: "/roms/Contra.nes",
    image: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=400&h=300&fit=crop",
    isHomebrew: false,
    author: "Konami"
  },
  {
    id: "donkey-kong-country",
    title: "Donkey Kong Country",
    console: "Super Nintendo",
    description: "A aventura clássica do Donkey Kong com gráficos pré-renderizados",
    romUrl: "/roms/Donkey Kong Country.smc",
    image: "https://images.unsplash.com/photo-1555864326-5cf22ef123cf?w=400&h=300&fit=crop",
    isHomebrew: false,
    author: "Rare"
  }
];

export const getROMsByConsole = (console: string): ROMInfo[] => {
  switch (console.toLowerCase()) {
    case "nintendo":
    case "nes":
      return nesROMs.filter(rom => rom.console.includes("Nintendo NES"));
    case "super nintendo":
    case "snes":
      return nesROMs.filter(rom => rom.console.includes("Super Nintendo"));
    default:
      return nesROMs; // Retorna todos por padrão
  }
};

export const getROMById = (id: string): ROMInfo | undefined => {
  return nesROMs.find(rom => rom.id === id);
};
