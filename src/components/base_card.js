import './styling/pokedex.css'

function Card({imageUrl,name}){
    return(
        <div className='card'>
            <img src={imageUrl} alt={name} />
            <h2>{name}</h2>
            <button className='view-btn'>View</button>
        </div>
    )
}
export default Card;