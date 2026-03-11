import { Grid, Skeleton } from '@radix-ui/themes'
import PageController from './PageController'
import PokedexCard from './PokedexCard'
import type { Pokemon } from 'pokenode-ts'

interface IPokedexCardsDisplay {
  hasPrev: boolean
  hasNext: boolean
  loading: boolean
  limit: number
  pokemons: Pokemon[] | null
  enablePageController: boolean
  handlePageChange(page: number): void
}

export default function PokedexCardsDisplay({
  enablePageController,
  hasNext,
  hasPrev,
  handlePageChange,
  loading,
  limit,
  pokemons,
}: IPokedexCardsDisplay) {
  return (
    <>
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
    </>
  )
}
