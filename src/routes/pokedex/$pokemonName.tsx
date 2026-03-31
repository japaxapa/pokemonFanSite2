import PokemonCard from '#/components/pokedex/PokemonCard'
import { Flex } from '@radix-ui/themes'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/pokedex/$pokemonName')({
  component: RouteComponent,
})

function RouteComponent() {
  const { pokemonName } = Route.useParams()

  // TODO check if it is better to use a global state

  return (
    <Flex
      align={'center'}
      justify={'center'}
      width={'100%'}
      height={'calc(100vh - 10rem)'}
    >
      <PokemonCard pokemonName={pokemonName} />
    </Flex>
  )
}
