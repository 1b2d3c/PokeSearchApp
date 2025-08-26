import { useState, useCallback } from "react"
import { fetchPokemon } from "../api/pokemonApi"
import type { SearchType, Pokemon, ApiError } from "../types/pokemon"

type UsePokemonSearchReturn = {
    pokemon: Pokemon | null
    isLoading: boolean
    error: string | null
    searchPokemon: (query: string, type: SearchType) => Promise<void>
    clearResults: () => void
}

export const usePokemonSearch = (): UsePokemonSearchReturn => {
    const [pokemon, setPokemon] = useState<Pokemon | null>(null)
    const [error, setError] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const searchPokemon = useCallback(
    async ( query: string, type: SearchType ): Promise<void> => {

        //初期化
        setPokemon(null)
        setError(null)
        setIsLoading(false)

        try {
            setIsLoading(true)
            const result = await fetchPokemon(query, type)

            setPokemon(result)
        } catch (err) {
            const apiError = err as ApiError
            setError(apiError.message)
        } finally {
            setIsLoading(false)
        }
    }, [])

    const clearResults = () => {
        setPokemon(null)
        setError(null)
    }

    return {
        pokemon,
        isLoading,
        error,
        searchPokemon,
        clearResults
    }
}