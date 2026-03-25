import { Card, Container, Flex } from '@radix-ui/themes'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/favorites/')({
  component: RouteComponent,
})

function RouteComponent() {
  const favoritePokemons = localStorage.getItem('favorites')
  console.log(favoritePokemons)

  return (
    <Container>
      <Card>
        <Flex>
          
        </Flex>
      </Card>
    </Container>
  )
}
