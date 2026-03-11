import { PokemonClient } from 'pokenode-ts'
import type { Pokemon } from 'pokenode-ts'
import { useState, useEffect } from 'react'

interface UsePokemonReturn {
  pokemon: Pokemon | null
  loading: boolean
  error: string | null
}

interface UsePokemonsReturn {
  pokemons: Pokemon[] | null
  hasNext: boolean
  hasPrev: boolean
  loading: boolean
  error: string | null
}

const api = new PokemonClient()

export function usePokemon(name: string): UsePokemonReturn {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        setLoading(true)
        setError(null)

        const data = await api.getPokemonByName(name)
        setPokemon(data)
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : 'An error occurred while quering pokemon by name',
        )
      } finally {
        setLoading(false)
      }
    }

    if (name) fetchPokemon()
  }, [name])

  return { pokemon, loading, error }
}

export function usePokemons(offset = 0, limit = 50): UsePokemonsReturn {
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
