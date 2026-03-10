import PokedexCard from '#/components/pokedex/PokedexCard'
import { usePokemons } from '#/hooks/usePokemon'
import { Container, Grid } from '@radix-ui/themes'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/pokedex/')({
  component: RouteComponent,
})

function RouteComponent() {
  const pokemons = usePokemons(0, 50)

  return (
    <Container align={'center'} p={'2'}>
      <Grid
        gap={'4'}
        columns={{ initial: '1', sm: '2', md: '3', lg: '4', xl: '5' }}
        width={'auto'}
      >
        {pokemons.pokemons?.map((pokemon) => (
          <PokedexCard pokemon={pokemon} />
        ))}
      </Grid>
    </Container>
  )
}
