import { Card, Container, Flex, Grid, Text } from '@radix-ui/themes'
import { createFileRoute } from '@tanstack/react-router'
import type { Pokemon } from 'pokenode-ts'

export const Route = createFileRoute('/favorites/')({
  component: RouteComponent,
})

function RouteComponent() {
  const favoritePokemons: Pokemon[] = (() => {
    try {
      const raw = localStorage.getItem('favorites')
      return raw ? (JSON.parse(raw) as Pokemon[]) : []
    } catch {
      return []
    }
  })()

  if (!favoritePokemons.length) {
    return (
      <Container>
        <Card>
          <Text align="center">No favorite Pokémon yet.</Text>
        </Card>
      </Container>
    )
  }

  return (
    <Container>
      <Grid gap="4" columns={{ initial: '1', sm: '2', md: '3', lg: '4' }}>
        {favoritePokemons.map((pokemon) => (
          <Card key={pokemon.id} size="4">
            <Flex direction="column" align="center" gap="2" style={{ padding: '1rem' }}>
              <img
                src={pokemon.sprites?.front_default || `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}
                alt={pokemon.name}
                width={120}
                height={120}
                style={{ imageRendering: 'pixelated' }}
              />
              <Text weight="bold">
                #{pokemon.id.toString().padStart(3, '0')} {pokemon.name}
              </Text>
            </Flex>
          </Card>
        ))}
      </Grid>
    </Container>
  )
}
