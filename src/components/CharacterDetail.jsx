import axios from "axios";
// import { character, episodes } from "../../data/data";
import { ArrowUpCircleIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import ReactLoading from 'react-loading';


function CharacterDetail ( { selectedId } )
{
    
    const [ character, setCharacter ] = useState();
    const [ loading, setLoading ] = useState(false);

    
    useEffect( () =>
    {
        async function getCharacter ()
        {
            setLoading( true );
            axios.get( `https://rickandmortyapi.com/api/character/${ selectedId }` ).then( res => setCharacter( res.data ) );

        }
        if ( selectedId ) getCharacter();
        setLoading(false)
    }, [ selectedId ] );


    if ( !character ) return <di>Please select a charcter</di>
    if (loading) return <ReactLoading type="balls" color="#ffffff" width={100} height={100}/>

    return (
        <div style={ { flex: 1 } }>
            <div className="character-detail">
                <img src={ character.image } alt={ character.name } className="character-detail__img" />
                <div className="character-detail__info">
                    <div className="info">
                        <span className={ `status ${ character.status === 'Dead' ? 'red' : '' }` }></span>
                        <span>&nbsp;{ character.status }</span>
                        <span>&nbsp;{ character.species}</span>
                    </div>
                    <div className="location">
                        <p>Last known location:</p>
                        <p>{ character.location.name}</p>
                    </div>
                    <div className="actions">
                        <button className="btn btn--primary">
                            add to favourite
                        </button>
                    </div>
                </div>
            </div>
            <div className="character-episodes">
                <div className="title">
                    <h2>List of Episodes</h2>
                    <button>
                        <ArrowUpCircleIcon className="icon"/>
                    </button>
                </div>
                <ul className="episodes-container">
                    {
                        character.episode.map( ( item, index ) =>
                        {
                            return (
                                <li key={ item.id }>
                                    <div>
                                        { String( index + 1 ).padStart( 2, '0' ) } &nbsp; { item.episode } : <strong>{ item.name }</strong>
                                    </div>
                                    <div className="badge badge--secondary">
                                        { item.air_date }
                                    </div>
                                </li>
                            );
                        })
                    }
                </ul>
            </div>
        </div>
    )
}

export default CharacterDetail;


