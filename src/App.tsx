import { useState } from 'react';
import './App.css'
import SearchToggle from "./components/SearchToggle";
import SearchForm from './components/SearchForm';
import PokemonCard from './components/PokemonCard';
import type { SearchType } from './types/pokemon';
import { usePokemonSearch } from './hooks/usePokemonSearch';

function App() {
  const [searchType, setSearchType] = useState<SearchType>("id")
  const [searchTerm, setSearchTerm] = useState<string>('')
  const { pokemon, isLoading, error, searchPokemon, clearResults } = usePokemonSearch()
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await searchPokemon(searchTerm, searchType);
    setSearchTerm('');
  };

  const handleTypeChange = (type: SearchType) => {
    setSearchType(type)
    setSearchTerm('')
    clearResults()
  }

  return (
    <>
      <h1>Poké Search</h1>
      <p className='description'>Search for a Pokemon by Name or ID</p>

      <SearchToggle  searchType={searchType} onTypeChange={handleTypeChange}/>
      <SearchForm  
        searchType={searchType} 
        searchTerm={searchTerm} 
        isLoading={isLoading}
        onSearchTermChange={setSearchTerm} 
        onSubmit={handleSubmit} 
      />

      {error && <div className='error-message'>{error}</div>}
      {pokemon && !isLoading && <PokemonCard pokemon = {pokemon} />}
    </>
  );
}

export default App;