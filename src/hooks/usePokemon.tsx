import { useQuery } from '@tanstack/react-query'
import { PokemonClient } from 'pokenode-ts'
import type { Pokemon } from 'pokenode-ts'
import { useState, useEffect } from 'react'

interface UsePokemonReturn {
  pokemon: Pokemon | null
  loading: boolean
  error: string | null
}
interface UsePokemon2Return {
  pokemon: Pokemon | null
  loading: boolean
  error: boolean
}

interface UsePokemonsReturn {
  pokemons: Pokemon[] | null
  hasNext: boolean
  hasPrev: boolean
  loading: boolean
  error: string | null
}

interface UsePokemons2Return {
  pokemons: Pokemon[] | null
  hasNext: boolean
  hasPrev: boolean
  loading: boolean
  error: boolean
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

export function usePokemon2(name: string): UsePokemon2Return {
  const { data, isFetching, isError } = useQuery({
    queryKey: ['pokemon' + '-' + name],
    queryFn: async () => {
      const data = await api.getPokemonByName(name)
      return data
    },
  })

  return { pokemon: data || null, loading: isFetching, error: isError }
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

export function usePokemons2(offset = 0, limit = 50): UsePokemons2Return {
  const query = useQuery({
    queryKey: ['pokedex' + '-offset' + offset + '-limit' + limit],
    queryFn: async () => {
      const pokemonList = await api.listPokemons(offset, limit)

      const data = await Promise.all(
        pokemonList.results.map((namedAPIresource) =>
          api.getPokemonByName(namedAPIresource.name),
        ),
      )

      const result = {
        pokemons: data,
        hasNext: Boolean(pokemonList.next),
        hasPrev: Boolean(pokemonList.previous),
      }

      return result
    },
  })

  return {
    pokemons: query.data?.pokemons || [],
    hasNext: query.data?.hasNext || false,
    hasPrev: query.data?.hasPrev || false,
    loading: query.isFetching,
    error: query.isError,
  }
}
