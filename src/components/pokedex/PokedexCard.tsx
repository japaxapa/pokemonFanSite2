import { Avatar, Card, Flex, IconButton, Text, Tooltip } from '@radix-ui/themes'
import { Link } from '@tanstack/react-router'
import type { Pokemon } from 'pokenode-ts'
import HollowStarIcon from '../icons/HollowStarIcon'
import AddIcon from '../icons/AddIcon'
import FilledStarIcon from '../icons/FilledStarIcon'
import { useFilter } from '../../contexts/FilterContext'
import { IDToStandardSizedString } from '#/utils/utils'

export default function PokedexCard({ pokemon }: { pokemon: Pokemon }) {
  const { filters, addToFavorites, removeFromFavorites } = useFilter()
  const { favorites } = filters

  const isFavorite = favorites.some((f: Pokemon) => f.id === pokemon.id)

  return (
    <Card key={pokemon.id} asChild>
      <Link to={`/pokedex/$pokemonName`} params={{ pokemonName: pokemon.name }}>
        <Flex
          gap={'2'}
          align={'center'}
          justify={'center'}
          direction={'column'}
        >
          <Flex
            align={'start'}
            justify={'between'}
            direction={'row'}
            width={'80%'}
          >
            <Tooltip content="Add to favorites">
              <IconButton
                radius="full"
                onClick={(event) => {
                  event.preventDefault()
                  event.stopPropagation()
                  isFavorite
                    ? removeFromFavorites(pokemon.id)
                    : addToFavorites(pokemon)
                }}
                variant={isFavorite ? 'soft' : 'classic'}
              >
                {isFavorite ? <FilledStarIcon /> : <HollowStarIcon />}
              </IconButton>
            </Tooltip>
            <Avatar
              src={pokemon.sprites.front_default || ''}
              fallback={pokemon.name[0]}
              size={'6'}
            />
            <Tooltip content="Add a team">
              <IconButton
                radius="full"
                onClick={(event) => {
                  event.preventDefault()
                  // add team logic here
                }}
              >
                <AddIcon />
              </IconButton>
            </Tooltip>
          </Flex>
          <Text>
            #{IDToStandardSizedString(pokemon.id)} {pokemon.name}
          </Text>
        </Flex>
      </Link>
    </Card>
  )
}
