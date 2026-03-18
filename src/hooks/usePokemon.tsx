import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import { PokemonClient } from 'pokenode-ts'
import type { Pokemon } from 'pokenode-ts'
import { useState, useEffect } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { GENERATIONS_PARAMS } from '#/constants/consts'

interface UsePokemonReturn {
  pokemon: Pokemon | null
  loading: boolean
  error: string | null
}
interface UsePokemon2Return {
  pokemon: Pokemon | null
  loading: boolean
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
}

const api = new PokemonClient()

export function usePokemon(name: string): UsePokemonReturn {
  const navigate = useNavigate()
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
        navigate({ to: '/error' })
      } finally {
        setLoading(false)
      }
    }

    if (name) fetchPokemon()
  }, [name, navigate])

  return { pokemon, loading, error }
}

export function usePokemon2(name: string): UsePokemon2Return {
  const navigate = useNavigate()
  const { data, isFetching, isError } = useQuery({
    queryKey: ['pokemon' + '-' + name],
    queryFn: async () => {
      if (!name) return null

      // Error test
      // throw new Error()
      const data = await api.getPokemonByName(name)

      return data
    },
  })

  if (isError) navigate({ to: '/error' })

  return { pokemon: data || null, loading: isFetching }
}

export function usePokemons(offset = 0, limit = 50): UsePokemonsReturn {
  const navigate = useNavigate()
  const [pokemons, setPokemons] = useState<Pokemon[] | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  const [hasPrev, setHasPrev] = useState<boolean>(false)
  const [hasNext, setHasNext] = useState<boolean>(false)

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
        navigate({ to: '/error' })
      } finally {
        setLoading(false)
      }
    }
    fetchPokemons()
  }, [offset, limit, navigate])

  return { pokemons, hasNext, hasPrev, loading, error }
}

export function usePokemons2(offset = 0, limit = 50): UsePokemons2Return {
  const navigate = useNavigate()
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

  if (query.isError) navigate({ to: '/error' })

  return {
    pokemons: query.data?.pokemons || [],
    hasNext: query.data?.hasNext || false,
    hasPrev: query.data?.hasPrev || false,
    loading: query.isFetching,
  }
}

// TODO cachinf strategy
export function useINFPokemons(
  selectedGeneration: number | null,
  offset = 0,
  limit = 50,
) {
  const navigate = useNavigate()

  const queryKey = [
    'infpokedex',
    selectedGeneration, // include the filter in the cache key
    offset,
    limit,
  ]

  const infQuery = useInfiniteQuery({
    queryKey,
    queryFn: async ({ pageParam = offset }) => {
      if (selectedGeneration !== null) {
        const genInfo = GENERATIONS_PARAMS[selectedGeneration]
        const data = await api.listPokemons(genInfo.offset, genInfo.limit)
        const results = await Promise.all(
          data.results.map((namedAPIResources) =>
            api.getPokemonByName(namedAPIResources.name),
          ),
        )

        return { pokemons: results, next: null, previous: null }
      } else {
        const data = await api.listPokemons(pageParam, limit)
        const results = await Promise.all(
          data.results.map((namedAPIResource) =>
            api.getPokemonByName(namedAPIResource.name),
          ),
        )
        return { pokemons: results, next: data.next, previous: data.previous }
      }
    },
    initialPageParam: offset,
    getNextPageParam: (lastPage, _, lastPageParam) => {
      if (selectedGeneration !== null || !lastPage.next) return undefined
      return lastPageParam + limit
    },
    getPreviousPageParam: (_, __, firstPageParam) => {
      if (selectedGeneration !== null || firstPageParam <= 1) return undefined
      return firstPageParam - limit
    },
  })

  if (infQuery.isError) navigate({ to: '/error' })

  return infQuery
}
