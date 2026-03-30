import type { PokemonType } from '#/constants/types'
import { pokemonTypesColors } from '#/constants/types'
import { usePokemon } from '#/hooks/usePokemon'
import { Avatar, Badge, Card, DataList, Flex, Skeleton } from '@radix-ui/themes'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/pokedex/$pokemonName')({
  component: RouteComponent,
})

function RouteComponent() {
  const { pokemonName } = Route.useParams()

  // TODO check if it is better to use a global state
  const { pokemon, loading, error } = usePokemon(pokemonName)

  return (
    <Flex
      align={'center'}
      justify={'center'}
      width={'100%'}
      height={'calc(100vh - 10rem)'}
    >
      <Card size={'4'}>
        <Flex justify={'center'}>
          <Skeleton loading={loading}>
            {pokemon && (
              <Avatar
                src={pokemon.sprites.front_default || undefined}
                fallback={pokemonName[0]}
                size={'9'}
              />
            )}
          </Skeleton>
        </Flex>
        <Skeleton loading={loading}>
          <DataList.Root>
            <DataList.Item align={'center'}>
              <DataList.Label>Number</DataList.Label>
              <DataList.Value>{pokemon?.id}</DataList.Value>
            </DataList.Item>

            <DataList.Item align={'center'}>
              <DataList.Label>Name</DataList.Label>
              <DataList.Value>{pokemon?.name}</DataList.Value>
            </DataList.Item>

            <DataList.Item align={'center'}>
              <DataList.Label>Type</DataList.Label>
              <DataList.Value>
                <Flex gap={'2'}>
                  {pokemon?.types.map((type) => (
                    <Badge
                      key={type.type.name}
                      color={
                        pokemonTypesColors[
                          type.type.name.toUpperCase() as PokemonType
                        ].color as any
                      }
                      variant={
                        pokemonTypesColors[
                          type.type.name.toUpperCase() as PokemonType
                        ].variant
                      }
                    >
                      {type.type.name}
                    </Badge>
                  ))}
                </Flex>
              </DataList.Value>
            </DataList.Item>
          </DataList.Root>
        </Skeleton>
      </Card>
    </Flex>
  )
}
