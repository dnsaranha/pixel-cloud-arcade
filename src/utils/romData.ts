
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

// ROMs de domínio público e homebrew para Nintendo NES
export const nesROMs: ROMInfo[] = [
  {
    id: "contra",
    title: "Contra",
    console: "Nintendo NES",
    description: "O clássico jogo de ação cooperativo com soldados enfrentando alienígenas",
    romUrl: "/roms/Contra (U).nes",
    image: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=400&h=300&fit=crop",
    isHomebrew: false,
    author: "Konami"
  },
  {
    id: "test-rom",
    title: "NES Test ROM",
    console: "Nintendo NES",
    description: "ROM de teste para verificar funcionalidade do emulador",
    romUrl: "/roms/test.nes",
    image: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=400&h=300&fit=crop",
    isHomebrew: true,
    author: "Comunidade NES"
  }
];

// ROMs para SNES (Super Nintendo)
export const snesROMs: ROMInfo[] = [
  {
    id: "donkey-kong-country",
    title: "Donkey Kong Country",
    console: "Super Nintendo",
    description: "A aventura clássica do Donkey Kong com gráficos pré-renderizados revolucionários",
    romUrl: "/roms/Donkey Kong Country (U) (V1.2) [!].smc",
    image: "https://images.unsplash.com/photo-1555864326-5cf22ef123cf?w=400&h=300&fit=crop",
    isHomebrew: false,
    author: "Rare"
  }
];

export const getROMsByConsole = (console: string): ROMInfo[] => {
  switch (console.toLowerCase()) {
    case "nintendo":
    case "nes":
      return nesROMs;
    case "super nintendo":
    case "snes":
      return snesROMs;
    default:
      return [];
  }
};

export const getROMById = (id: string): ROMInfo | undefined => {
  return [...nesROMs, ...snesROMs].find(rom => rom.id === id);
};
