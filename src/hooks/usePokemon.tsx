import { PokemonClient } from 'pokenode-ts'
import type { Pokemon } from 'pokenode-ts'
import { useState, useEffect } from 'react'

interface UsePokemonReturn {
  pokemons: Pokemon[] | null
  hasNext: boolean
  hasPrev: boolean
  loading: boolean
  error: string | null
}

export function usePokemons(offset = 0, limit = 50): UsePokemonReturn {
  const [pokemons, setPokemons] = useState<Pokemon[] | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  const [hasPrev, setHasPrev] = useState<boolean>(false)
  const [hasNext, setHasNext] = useState<boolean>(false)

  const api = new PokemonClient()

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        setLoading(true)
        setError(null)
        setHasPrev(false)
        setHasNext(false)

        const data = await api.listPokemons(offset, limit)

        setHasPrev(Boolean(data.previous))
        setHasNext(Boolean(data.next))

        const results = await Promise.all(
          data.results.map((namedAPIresource) =>
            api.getPokemonByName(namedAPIresource.name),
          ),
        )

        setPokemons(results)
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : 'An error occurred while quering pokemons',
        )
        setHasPrev(false)
        setHasNext(false)
      } finally {
        setLoading(false)
      }
    }
    fetchPokemons()
  }, [offset, limit])

  return { pokemons, hasNext, hasPrev, loading, error }
}
