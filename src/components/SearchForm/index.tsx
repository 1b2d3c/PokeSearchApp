import type { ChangeEvent, FC, FormEvent } from "react"
import "./style.css";
import type { SearchType } from "../../types/pokemon";

type SearchFormProps = {
  searchTerm: string
  searchType: SearchType
  isLoading: boolean
  onSearchTermChange: (term: string) => void
  onSubmit: (e: FormEvent<HTMLFormElement>) => void
}

const SearchForm: FC<SearchFormProps> = ({
  searchTerm,
  searchType,
  isLoading,
  onSearchTermChange,
  onSubmit
}) => {

  const handleChangeTerm = (e: ChangeEvent<HTMLInputElement>) => {
    onSearchTermChange(e.target.value)
  }

  return (
    <form className="search-form" onSubmit={onSubmit}>
      <input 
        type={searchType === "id" ? "number" : "text"}
        placeholder={searchType === "id" ? "Please Enter ID (e.g. 25)" : "Please Enter Name (e.g. pikachu)"} 
        value = {searchTerm}
        onChange={handleChangeTerm}
        min={searchType === 'id' ? 1 : undefined}
      />
      <button type="submit" disabled={isLoading}>
        {isLoading ? "Searching..." : "Search"}
      </button>
    </form>
  );
};

export default SearchForm;