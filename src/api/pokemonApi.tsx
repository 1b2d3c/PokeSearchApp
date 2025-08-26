import axios, { AxiosError } from "axios"
import type { Pokemon, ApiError, SearchType } from "../types/pokemon"

const NUMERIC_REGEX = /^\d+$/;
const NAME_REGEX = /^[a-zA-Z-]+$/;
const BASE_URL = "https://pokeapi.co/api/v2/"

type ValidationResult = {
    isValid: boolean
    errorMessage: string
}

const ValidateInput = (query: string, type: SearchType): ValidationResult => {
    // スペース、改行文字を除外
    if (!query) {
        return {
            isValid: false,
            errorMessage: 
                type === "name" 
                    ? "ポケモン名を入力してください" 
                    : "ID を入力してください"
        }
    }
    if (type === "name") {
        // アルファベット
        if (!NAME_REGEX.test(query)) {
            return {
                isValid: false,
                errorMessage: 'name で検索してください'
            }
        }
        // 2文字以上
        if (query.length < 2) {
            return {
                isValid: false,
                errorMessage: '2文字以上で検索してください'
            }
        }
    } else {
        // 数字であること
        if (!NUMERIC_REGEX.test(query)){
            return {
                isValid: false,
                errorMessage: 'ID で検索してください'
            }
        }
        // 1以上であること
        if (parseInt(query, 10) < 1) {
            return {
                isValid: false,
                errorMessage: '1以上の数字で検索してください'
            }
        }
    }
    return { isValid: true, errorMessage: '' }
}

export const fetchPokemon = async (query: string, type: SearchType): Promise<Pokemon | null> => {
    const trimmedQuery = query.trim()
    const validation = ValidateInput(trimmedQuery, type)
    if (!validation.isValid) {
        const validationError: ApiError = {
            message: validation.errorMessage,
            status: 400
        }
        throw validationError
    }

    try {
        const response = await axios.get<Pokemon>(`${BASE_URL}/pokemon/${trimmedQuery.toLowerCase()}`);

        return response.data;
    } catch(e) {
        if (e instanceof AxiosError) {
            const apiError: ApiError = {
                message:
                    e.response?.status === 404 
                        ?  `ポケモン${trimmedQuery}が見つかりませんでした`
                        : 'Api エラーが発生しました',
                status: e.response?.status,
            }
            throw apiError
        }
        throw e
    }
}