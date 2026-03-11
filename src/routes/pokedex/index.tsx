import PageController from '#/components/pokedex/PageController'
import PokedexCard from '#/components/pokedex/PokedexCard'
import RegionButtons from '#/components/pokedex/GenerationButtons'
import { usePokemons } from '#/hooks/usePokemon'
import { Container, Flex, Grid, Skeleton } from '@radix-ui/themes'
import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'

export const Route = createFileRoute('/pokedex/')({
  component: RouteComponent,
})

function RouteComponent() {
  const [offset, setOffset] = useState(0)
  const [limit, setLimit] = useState(50)
  const [enablePageController, setEnablePageController] = useState(true)

  const { pokemons, hasPrev, hasNext, loading } = usePokemons(offset, limit)

  const handlePageChange = (pageChange: number) => {
    setOffset((prev) => prev + limit * pageChange)
  }

  const handleRegionChange = (
    offset: number,
    limit: number,
    enablePageController: boolean,
  ) => {
    setOffset(offset)
    setLimit(limit)
    setEnablePageController(enablePageController)
  }

  return (
    <Container align={'center'} p={'2'}>
      <Flex direction={'column'} gap={'4'}>
        <RegionButtons handleClick={handleRegionChange} />
        {enablePageController && (
          <PageController
            hasPrev={hasPrev}
            hasNext={hasNext}
            handlePageChange={handlePageChange}
          />
        )}
        <Grid
          gap={'4'}
          columns={{ initial: '1', sm: '2', md: '3', lg: '4', xl: '5' }}
          width={'auto'}
        >
          {loading
            ? Array.from({ length: limit }).map((_, idx) => (
                <Skeleton height={'128px'} loading key={idx}></Skeleton>
              ))
            : pokemons?.map((pokemon) => (
                <PokedexCard pokemon={pokemon} key={pokemon.id} />
              ))}
        </Grid>
        {enablePageController && (
          <PageController
            hasPrev={hasPrev}
            hasNext={hasNext}
            handlePageChange={handlePageChange}
          />
        )}
      </Flex>
    </Container>
  )
}
