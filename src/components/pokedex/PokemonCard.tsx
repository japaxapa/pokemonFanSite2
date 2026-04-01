import { PokemonType, pokemonTypesColors } from '#/constants/types'
import { POKEMON_STATS, STAT_ICON_CONFIG } from '#/constants/consts'
import { usePokemon } from '#/hooks/usePokemon'
import {
  Avatar,
  Badge,
  Card,
  Flex,
  Grid,
  Skeleton,
  Text,
} from '@radix-ui/themes'
import PokemonCardStat from './PokemonCardStat'
import HeartIcon from '../icons/HeartIcon'
import SwordsIcon from '../icons/SwordsIcon'
import ShieldIcon from '../icons/ShieldIcon'
import LightningIcon from '../icons/LightiningIcon'
import RulerIcon from '../icons/RulerIcon'
import WeightIcon from '../icons/WeigthIcon'
import { IDToStandardSizedString } from '#/utils/utils'

interface IPokemonCard {
  pokemonName: string
}

const ICON_COMPONENTS = {
  HeartIcon,
  SwordsIcon,
  ShieldIcon,
  LightningIcon,
} as const

const ICON_CONTAINER_STYLE = {
  borderRadius: '50%',
  height: '2rem',
  width: '2rem',
} as const

function getTypeBadgeProps(typeName: string) {
  const typeKey = typeName.toUpperCase() as PokemonType
  const typeConfig = pokemonTypesColors[typeKey]
  return {
    color: typeConfig.color as any,
    variant: typeConfig.variant,
  }
}

function renderStatIcon(statName: string) {
  const config = STAT_ICON_CONFIG[statName]
  if (!config) return null

  const IconComponent =
    ICON_COMPONENTS[config.icon as keyof typeof ICON_COMPONENTS]

  const style: React.CSSProperties = {
    ...ICON_CONTAINER_STYLE,
    backgroundColor: config.backgroundColor,
  }

  if (config.color) {
    style.color = config.color
  }

  return (
    <Flex align={'center'} justify={'center'} style={style}>
      <IconComponent />
    </Flex>
  )
}

function renderStats(pokemon: any) {
  const displayStats = pokemon.stats.filter(
    (stat: any) =>
      stat.stat.name !== POKEMON_STATS.SPECIAL_ATTACK &&
      stat.stat.name !== POKEMON_STATS.SPECIAL_DEFENSE,
  )

  return displayStats.map((stat: any) => (
    <PokemonCardStat
      key={stat.stat.name}
      title={stat.stat.name.toUpperCase()}
      value={stat.base_stat}
    >
      {renderStatIcon(stat.stat.name)}
    </PokemonCardStat>
  ))
}

export default function PokemonCard({ pokemonName }: IPokemonCard) {
  const { pokemon, loading } = usePokemon(pokemonName)

  return (
    <Card size={'2'}>
      <Flex direction={'column'} justify={'between'} gap={'4'}>
        <Flex direction={'column'} gap={'2'}>
          <Flex justify={'between'} direction={'row'} align={'center'}>
            <Text size={'6'} weight={'bold'}>
              {pokemon?.name}
            </Text>
            <Badge>
              <Text weight={'bold'}>
                #{IDToStandardSizedString(pokemon?.id || 0)}
              </Text>
            </Badge>
          </Flex>

          <Flex gap={'2'}>
            {pokemon?.types.map((type: any) => {
              const badgeProps = getTypeBadgeProps(type.type.name)
              return (
                <Badge key={type.type.name} {...badgeProps}>
                  {type.type.name.toUpperCase()}
                </Badge>
              )
            })}
          </Flex>
        </Flex>

        <Skeleton loading={loading}>
          <Card my={'4'}>
            <Flex justify={'center'}>
              {pokemon && (
                <Avatar
                  src={pokemon.sprites.front_default || undefined}
                  fallback={pokemonName[0]}
                  size={'9'}
                />
              )}
            </Flex>
          </Card>
        </Skeleton>

        <Skeleton loading={loading}>
          <Grid columns={'2'} gap={'4'}>
            {pokemon && renderStats(pokemon)}

            <PokemonCardStat title={'HEIGHT'} value={`${pokemon?.height}m`}>
              <Flex
                align={'center'}
                justify={'center'}
                style={ICON_CONTAINER_STYLE}
              >
                <RulerIcon />
              </Flex>
            </PokemonCardStat>
            <PokemonCardStat title={'WEIGHT'} value={`${pokemon?.weight}Kg`}>
              <Flex
                align={'center'}
                justify={'center'}
                style={ICON_CONTAINER_STYLE}
              >
                <WeightIcon />
              </Flex>
            </PokemonCardStat>
          </Grid>
        </Skeleton>

        <Skeleton loading={loading}>
          <Flex direction={'column'} gap={'2'}>
            <Text size={'2'}>Abilities</Text>
            <Flex gap={'1'}>
              {pokemon?.abilities.map((ability) => (
                <Badge>{ability.ability.name}</Badge>
              ))}
            </Flex>
          </Flex>
        </Skeleton>
      </Flex>
    </Card>
  )
}
