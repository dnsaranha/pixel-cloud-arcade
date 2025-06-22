
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
    id: "test-rom",
    title: "NES Test ROM",
    console: "Nintendo NES",
    description: "ROM de teste para verificar funcionalidade do emulador",
    romUrl: "/roms/test.nes", // Você precisa adicionar ROMs reais aqui
    image: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=400&h=300&fit=crop",
    isHomebrew: true,
    author: "Comunidade NES"
  },
  {
    id: "homebrew-platformer",
    title: "Homebrew Platformer",
    console: "Nintendo NES",
    description: "Jogo de plataforma criado pela comunidade homebrew",
    romUrl: "/roms/platformer.nes",
    image: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=400&h=300&fit=crop",
    isHomebrew: true,
    author: "Indie Developer"
  }
];

export const getROMsByConsole = (console: string): ROMInfo[] => {
  switch (console.toLowerCase()) {
    case "nintendo":
    case "nes":
      return nesROMs;
    default:
      return [];
  }
};

export const getROMById = (id: string): ROMInfo | undefined => {
  return nesROMs.find(rom => rom.id === id);
};
