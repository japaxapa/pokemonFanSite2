export const GENERATIONS_PARAMS = [
  { name: 'Gen I', offset: 0, limit: 151 },
  { name: 'Gen II', offset: 151, limit: 100 },
  { name: 'Gen III', offset: 251, limit: 135 },
  { name: 'Gen IV', offset: 386, limit: 107 },
  { name: 'Gen V', offset: 493, limit: 156 },
  { name: 'Gen VI', offset: 649, limit: 72 },
  { name: 'Gen  VII', offset: 721, limit: 88 },
  { name: 'Gen VIII', offset: 809, limit: 96 },
  { name: 'Gen IX', offset: 905, limit: 120 },
  { name: 'All', offset: 0, limit: 50 },
]

export const POKEMON_STATS = {
  HP: 'hp',
  ATTACK: 'attack',
  DEFENSE: 'defense',
  SPEED: 'speed',
  SPECIAL_ATTACK: 'special-attack',
  SPECIAL_DEFENSE: 'special-defense',
} as const

type StatIconConfig = {
  icon: string
  backgroundColor: string
  color?: string
}

export const STAT_ICON_CONFIG: Record<string, StatIconConfig> = {
  [POKEMON_STATS.HP]: {
    icon: 'HeartIcon',
    backgroundColor: 'red',
    color: 'pink',
  },
  [POKEMON_STATS.ATTACK]: {
    icon: 'SwordsIcon',
    backgroundColor: 'orange',
  },
  [POKEMON_STATS.DEFENSE]: {
    icon: 'ShieldIcon',
    backgroundColor: 'blue',
    color: 'lightblue',
  },
  [POKEMON_STATS.SPEED]: {
    icon: 'LightningIcon',
    backgroundColor: 'yellow',
  },
} as const
