import { Button, Container, Flex, Grid, Skeleton } from '@radix-ui/themes'
import { createFileRoute } from '@tanstack/react-router'

import PokedexCardsDisplay from '#/components/pokedex/CardsDisplay'
import { PokemonClient } from 'pokenode-ts'
import { useInfiniteQuery } from '@tanstack/react-query'
import PokedexCard from '#/components/pokedex/PokedexCard'
import { useState } from 'react'

export const Route = createFileRoute('/infpokedex/')({
  component: RouteComponent,
})

function RouteComponent() {
  const api = new PokemonClient()

  const [limit, setLimit] = useState(50)

  const infQuery = useInfiniteQuery({
    queryKey: ['infpokedex'],
    queryFn: async ({ pageParam }) => {
      const data = await api.listPokemons(pageParam, limit)

      const results = await Promise.all(
        data.results.map((namedAPIResource) =>
          api.getPokemonByName(namedAPIResource.name),
        ),
      )
      return { pokemons: results, next: data.next, previous: data.previous }
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages, lastPageParam) => {
      console.log(lastPageParam)
      if (!lastPage.next) {
        return undefined
      }
      return lastPageParam + limit
    },
    getPreviousPageParam: (firstPage, allPages, firstPageParam) => {
      if (firstPageParam <= 1) {
        return undefined
      }
      return firstPageParam - limit
    },
  })

  console.log(infQuery.hasPreviousPage)
  console.log(infQuery.hasNextPage)

  return (
    <Container align={'center'} p={'7'}>
      <Flex direction={'column'} gap={'8'}>
        <Button
          loading={infQuery.isFetching}
          disabled={!infQuery.hasPreviousPage || infQuery.isFetching}
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
          disabled={!infQuery.hasNextPage || infQuery.isFetching}
          onClick={() => {
            infQuery.fetchNextPage()
          }}
        >
          Load More
        </Button>
      </Flex>
    </Container>
  )
}
