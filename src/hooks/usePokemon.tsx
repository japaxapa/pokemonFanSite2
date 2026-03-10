import { PokemonClient } from 'pokenode-ts'
import type { Pokemon } from 'pokenode-ts'
import { useState, useEffect } from 'react'

interface UsePokemonReturn {
  pokemons: Pokemon[] | null
  loading: boolean
  error: string | null
}

export function usePokemons(offset = 0, limit = 50): UsePokemonReturn {
  const [pokemons, setPokemons] = useState<Pokemon[] | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const api = new PokemonClient()

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        setLoading(true)
        setError(null)
        const data = await api.listPokemons(offset, limit)
        const results = await Promise.all(
          data.results.map((namedAPIresource) =>
            api.getPokemonByName(namedAPIresource.name),
          ),
        )

        setPokemons(results)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setLoading(false)
      }
    }
    fetchPokemons()
  }, [offset, limit])

  return { pokemons, loading, error }
}
