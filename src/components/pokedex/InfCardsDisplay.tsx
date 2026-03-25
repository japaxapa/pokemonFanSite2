import { Card, Flex, Button, Grid, Skeleton } from '@radix-ui/themes'
import PokedexCard from './PokedexCard'
import { useINFPokemons } from '#/hooks/usePokemon'
import { useADVFilter } from '#/contexts/FilterContext'

interface IINFCardDisplay {
  limit: number
}

// TODO create a button factory

export default function INFCardsDisplay({ limit }: IINFCardDisplay) {
  const { filters } = useADVFilter()

  const infQuery = useINFPokemons(filters.selectedGeneration, limit)

  return (
    <Card size={'4'}>
      <Flex direction={'column'} gap={'8'}>
        <Button
          loading={infQuery.isFetching}
          disabled={
            filters.selectedGeneration !== null ||
            !infQuery.hasPreviousPage ||
            infQuery.isFetching
          }
          onClick={() => {
            infQuery.fetchPreviousPage()
          }}
        >
          Load More
        </Button>
        <Grid
          gap={'4'}
          columns={{ initial: '1', sm: '2', md: '3', lg: '4', xl: '5' }}
          width={'auto'}
        >
          {infQuery.isFetching
            ? Array.from({ length: limit }).map((_, idx) => (
                <Skeleton height={'128px'} loading key={idx}></Skeleton>
              ))
            : infQuery.data?.pages.map((data) =>
                data.pokemons.map((pokemon) => (
                  <PokedexCard pokemon={pokemon} key={pokemon.id} />
                )),
              )}
        </Grid>
        <Button
          loading={infQuery.isFetching}
          disabled={
            filters.selectedGeneration !== null ||
            !infQuery.hasNextPage ||
            infQuery.isFetching
          }
          onClick={() => {
            infQuery.fetchNextPage()
          }}
        >
          Load More
        </Button>
      </Flex>
    </Card>
  )
}
