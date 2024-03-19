import { useEffect, useState } from 'react';
import './pokedex.css'
import axios from 'axios';

const client = axios.create();
function Card(props){
    const [pokemonData,setPokemonData] = useState({});
    useEffect(()=>{
        client.get(props.url).then(response=>{
            setPokemonData(response.data);
        })
    })
    return(
        <div className='card'>
            <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemonData.id}.svg`} alt={`${pokemonData.name}'s`} />
            <h2>{pokemonData.name}</h2>
            <button className='view-btn'>View</button>
        </div>
    )
}
export default Card;