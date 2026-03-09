import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/pokedex/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/pokedex/"!</div>
}
