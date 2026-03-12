export enum PokemonType {
  NORMAL = 'NORMAL',
  FIGHTING = 'FIGHTING',
  FLYING = 'FLYING',
  POISON = 'POISON',
  GROUND = 'GROUND',
  ROCK = 'ROCK',
  BUG = 'BUG',
  GHOST = 'GHOST',
  STEEL = 'STEEL',
  FIRE = 'FIRE',
  WATER = 'WATER',
  GRASS = 'GRASS',
  ELECTRIC = 'ELECTRIC',
  PSYCHIC = 'PSYCHIC',
  ICE = 'ICE',
  DRAGON = 'DRAGON',
  DARK = 'DARK',
  FAIRY = 'FAIRY',
  UNKNOWN = 'UNKNOWN',
  SHADOW = 'SHADOW',
}

export const pokemonTypes = Object.values(PokemonType)

interface PokemonTypeColor {
  color: string
  variant: 'solid' | 'soft' | 'surface' | 'outline' | undefined
}

export const pokemonTypesColors: Record<PokemonType, PokemonTypeColor> = {
  [PokemonType.NORMAL]: { color: 'crimson', variant: 'surface' },
  [PokemonType.FIGHTING]: { color: 'orange', variant: 'solid' },
  [PokemonType.FLYING]: { color: 'sky', variant: 'surface' },
  [PokemonType.POISON]: { color: 'purple', variant: 'solid' },
  [PokemonType.GROUND]: { color: 'gold', variant: 'solid' },
  [PokemonType.ROCK]: { color: 'gray', variant: 'solid' },
  [PokemonType.BUG]: { color: 'jade', variant: 'surface' },
  [PokemonType.GHOST]: { color: 'violet', variant: 'surface' },
  [PokemonType.STEEL]: { color: 'gray', variant: 'surface' },
  [PokemonType.FIRE]: { color: 'red', variant: 'solid' },
  [PokemonType.WATER]: { color: 'blue', variant: 'solid' },
  [PokemonType.GRASS]: { color: 'grass', variant: 'solid' },
  [PokemonType.ELECTRIC]: { color: 'yellow', variant: 'solid' },
  [PokemonType.PSYCHIC]: { color: 'plum', variant: 'surface' },
  [PokemonType.ICE]: { color: 'cyan', variant: 'surface' },
  [PokemonType.DRAGON]: { color: 'indigo', variant: 'solid' },
  [PokemonType.DARK]: { color: 'iris', variant: 'solid' },
  [PokemonType.FAIRY]: { color: 'crimson', variant: 'solid' },
  [PokemonType.UNKNOWN]: { color: 'lime', variant: 'surface' },
  [PokemonType.SHADOW]: { color: 'gray', variant: 'solid' },
}
