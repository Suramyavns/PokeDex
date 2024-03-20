import pokemon_logo from './media/Pokemon_Logo.png'
import 'font-awesome/css/font-awesome.min.css';
import axios from 'axios';
import './styling/pokedex.css'
import { useEffect, useState } from 'react';
import Card from './base_card';

function Pokedex(){
    const [pokemonData,setPokemonData] = useState([]);
    const [nextUrl,setNextUrl] = useState();
    const [prevUrl,setPrevUrl] = useState();
    const [url,setUrl] = useState("https://pokeapi.co/api/v2/pokemon?limit=21");
    const [loading,setloading] = useState(true);
    const getPokemons = async()=>{
        setloading(true);
        const data = await axios.get(url).then(res=>{return res.data});
        setPrevUrl(data.previous);
        setNextUrl(data.next);
        fetchPokemon(data.results)
        setloading(false);
        console.log(pokemonData)
    }
    const fetchPokemon=async(results)=>{
        results.map(
            async(item)=>{
                const res = await axios.get(item.url)
                setPokemonData(state=>{
                    for(let s of state){
                        if(s.id===res.data.id){
                            return state;
                        }
                    }
                    return [...state,res.data]
                })
            }
        );
    }
    useEffect(()=>{
        getPokemons();
    },[url]);
    return(
        <div className='container'>
            <div className="header">
                <img src={pokemon_logo} alt="pokemon-logo"></img>
            </div>
            <div className="pokemons">
                <div className='pokemon-grid'>
                    {
                        pokemonData.map((pokemon)=>{
                            return <Card key={pokemon.id} imageUrl={pokemon.sprites.other.dream_world.front_default} name={pokemon.name} />
                        })
                    }
                </div>
            </div>
            <div className='navs'>
                {
                    prevUrl?
                        <button className='nav-btn' onClick={()=>{
                            setPokemonData([]);
                            setUrl(prevUrl);
                        }}>Prev</button>
                        :<></>
                }
                <button className='nav-btn' onClick={()=>{
                        setPokemonData([]);
                        setUrl(nextUrl);
                    }}>Next</button>
            </div>
            <div className='footer'>
                <h2>Made with <i className='fa fa-heart' style={{color:'red'}}></i> by Suramya Didwania</h2>
            </div>
        </div>
    )
}

export default Pokedex;