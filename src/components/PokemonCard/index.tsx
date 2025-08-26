import type { FC } from "react"
import "./style.css"
import { typeColors } from "../../utils/typeColors"
import type { Pokemon } from "../../types/pokemon"

type PokemonCardProps = {
    pokemon: Pokemon
}

const PokemonCard: FC<PokemonCardProps> = ({ pokemon }) => {
    return (
        <div className="pokemon-card">
        {pokemon && (
            <>
            <div className="pokemon-image-grid">
                <div className="image-container">
                    <img src={pokemon.sprites.front_default} alt="" className="pokemon-sprite" />
                    <span className="sprite-label"></span>
                </div>
                <div className="image-container">
                    <img src={pokemon.sprites.back_default} alt="" className="pokemon-sprite" />
                    <span className="sprite-label"></span>
                </div>
                <div className="image-container">
                    <img src={pokemon.sprites.front_shiny} alt="" className="pokemon-sprite" />
                    <span className="sprite-label"></span>
                </div>
                <div className="image-container">
                    <img src={pokemon.sprites.back_shiny} alt="" className="pokemon-sprite" />
                    <span className="sprite-label"></span>
                </div>
            </div>

            <div className="pokemon-info">
                <h2>{pokemon.name}</h2>
                <p>{pokemon.id}</p>
                <div className="pokemon-types">
                    {
                        pokemon.types.map((type, index) => (
                            <span 
                            key={`${ index }-${ pokemon.id }`} 
                            className="type-badge"
                            style={{ backgroundColor: typeColors[type.type.name] }}
                            >{ type.type.name }</span>
                        ))
                    }
                </div>
                <div className="pokemon-details">
                    <div className="detail-item">
                        <span className="detail-label">Height: </span>
                        <span>{(pokemon.height / 10).toFixed(1)}m</span>
                    </div>
                    <div className="detail-item">
                        <span className="detail-label">Weight: </span>
                        <span>{(pokemon.weight / 10).toFixed(1)}kg</span>
                    </div>
                    <div className="detail-item">
                        <span className="detail-label">Abilities: </span>
                        <span>
                            {pokemon.abilities.map((ability) => ability.ability.name).join(", ")}
                        </span>
                    </div>
                </div>
            </div>
            </>
        )}
        </div>
    )
}

export default PokemonCard;