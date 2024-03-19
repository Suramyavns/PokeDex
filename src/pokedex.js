import { useEffect, useState } from 'react';
import pokemon_logo from './Pokemon_Logo.png'
import './pokedex.css'
import Card from './base_card.js'
import axios from 'axios';
const client = axios.create({
    baseURL: "https://pokeapi.co/api/v2/",
});
function Pokedex(){
    const [pokemons,setPokemons] = useState([]);
    useEffect(()=>{
        client.get("pokemon?limit=51").then(response=>{
            setPokemons(response.data.results);
        })
    })
    return(
        <div className='container'>
            <div className="header">
                <img src={pokemon_logo} alt="pokemon-logo"></img>
                <form method='get'>
                    <input type='text' placeholder='Search for pokemon,types or generations...' />
                </form>
            </div>
            <div className="pokemons">
                <div className='pokemon-grid'>
                    {
                        pokemons.map(pokemon=>{
                            return(<Card key={pokemon.name} url={pokemon.url} />);
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default Pokedex;