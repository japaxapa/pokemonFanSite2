import PageController from '#/components/pokedex/PageController'
import PokedexCard from '#/components/pokedex/PokedexCard'
import RegionButtons from '#/components/pokedex/GenerationButtons'
import { usePokemon, usePokemons } from '#/hooks/usePokemon'
import { Container, Flex, Grid, Skeleton } from '@radix-ui/themes'
import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import SearchBar from '#/components/pokedex/seachBar'
import PokedexCardsDisplay from '#/components/pokedex/CardsDisplay'

export const Route = createFileRoute('/pokedex/')({
  component: RouteComponent,
})

function RouteComponent() {
  const [offset, setOffset] = useState(0)
  const [limit, setLimit] = useState(50)
  const [enablePageController, setEnablePageController] = useState(true)

  const [searchTrigger, setSearchTrigger] = useState<string>('')

  const { pokemons, hasPrev, hasNext, loading } = usePokemons(offset, limit)

  // Trigger search when searchTrigger changes
  const { pokemon, loading: loadingSearch } = usePokemon(searchTrigger)

  const handlePageChange = (pageChange: number) => {
    setOffset((prev) => prev + limit * pageChange)
  }

  const handleRegionChange = (
    offset: number,
    limit: number,
    enablePageController: boolean,
  ) => {
    setSearchTrigger('')

    setOffset(offset)
    setLimit(limit)
    setEnablePageController(enablePageController)
  }

  const handleSearchName = (name: string) => {
    setSearchTrigger(name)
  }

  return (
    <Container align={'center'} p={'2'}>
      <Flex direction={'column'} gap={'4'}>
        <SearchBar handleSearchName={handleSearchName} />
        <RegionButtons handleClick={handleRegionChange} />
        {searchTrigger && (
          <PokedexCardsDisplay
            enablePageController={false}
            handlePageChange={handlePageChange}
            hasNext={false}
            hasPrev={false}
            limit={1}
            loading={loadingSearch}
            pokemons={pokemon ? [pokemon] : null}
          />
        )}
        {!searchTrigger && (
          <PokedexCardsDisplay
            enablePageController={enablePageController}
            handlePageChange={handlePageChange}
            hasNext={hasNext}
            hasPrev={hasPrev}
            limit={limit}
            loading={loading}
            pokemons={pokemons}
          />
        )}
      </Flex>
    </Container>
  )
}
