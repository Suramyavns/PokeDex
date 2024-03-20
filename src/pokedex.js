import pokemon_logo from './Pokemon_Logo.png'
import './pokedex.css'
import Card from './base_card.js'
import axios from 'axios';
import 'font-awesome/css/font-awesome.min.css';
import React, { useState } from "react";

const client = axios.create({
    baseURL: "https://pokeapi.co/api/v2/",
});

let initialVals = []
client.get("pokemon?limit=250&offset=0").then(response=>{
    initialVals = response.data.results;
}).catch(e=>{console.log(e)});

function Pokemonswithname(name){
    if(name===""){
        return initialVals;
    }
    return initialVals.filter(p=>{
        return p.name.toLowerCase().startsWith(name.toLowerCase());
    })
}

function Pokedex(){   
    const [pokemons,setpokemons] = useState(initialVals);
    return(
        <div className='container'>
            <div className="header">
                <img src={pokemon_logo} alt="pokemon-logo"></img>
                <form method='get'>
                    <input type='text' placeholder='Search for pokemons...' onInput={e=>setpokemons(Pokemonswithname(e.target.value))} />
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
            <div className='footer'>
                <h2>Made with <i className='fa fa-heart' style={{color:'red'}}></i> by Suramya Didwania</h2>
            </div>
        </div>
    )
}

export default Pokedex;