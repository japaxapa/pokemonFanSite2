import { createFileRoute } from '@tanstack/react-router'
import { PokemonClient } from 'pokenode-ts' // Import the Client
import { useEffect } from 'react'

export const Route = createFileRoute('/pokedex/')({
  component: RouteComponent,
})

function RouteComponent() {
  const api = new PokemonClient()

  useEffect(() => {
    api
      .getPokemonByName('luxray')
      .then((data) => console.log(data.name)) // will output "Luxray"
      .catch((error) => console.error(error))
  }, [])

  return <div>Hello "/pokedex/"!</div>
}
