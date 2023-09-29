import axios from "axios";
import { ArrowUpCircleIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import ReactLoading from 'react-loading';


function CharacterDetail ( { selectedId , addToFav ,isItExist } )
{
    
    const [ character, setCharacter ] = useState();
    const [ loading, setLoading ] = useState( false );
    const [ episodes, setEpisodes ] = useState([]);

    useEffect( () =>
    {
        async function getCharacter ()
        {
            try
            {
                setLoading( true );
                const response = await axios.get(
                    `https://rickandmortyapi.com/api/character/${ selectedId }`
                );
                setCharacter( response.data );

                const episodesId = response.data.episode.map( ( item ) => item.split( '/' ).pop() );

                const episodesResponse = await axios.get(
                    `https://rickandmortyapi.com/api/episode/${ episodesId.join( ',' ) }`
                );
                setEpisodes( episodesResponse.data );
            } catch ( error )
            {
            } finally
            {
                setLoading( false );
            }
        }
        getCharacter();

        return () => { };
    }, [ selectedId ] );


    if ( !character ) return <div>Please select a character</div>
    if (loading) return <ReactLoading type="balls" color="#fff" width={100} height={100}/>

    return (
        <div style={ { flex: 1 } }>
            <CharacterSubDetail character={ character } isItExist={isItExist} addToFav={addToFav} />
            <Episodes episodes={ episodes } />
        </div>
    );
}

export default CharacterDetail;


function Episodes ({episodes}) {
    return (
         <div className="character-episodes">
                <div className="title">
                    <h2>List of Episodes</h2>
                    <button>
                        <ArrowUpCircleIcon className="icon" />
                    </button>
                </div>
                <ul className="episodes-container">
                    {
                        episodes.map( ( item, index ) =>
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
                        } )
                    }
                </ul>
            </div>
    )
}


function CharacterSubDetail ( { character , isItExist } )
{
    return (
        <div className="character-detail">
                <img src={ character.image } alt={ character.name } className="character-detail__img" />
                <div className="character-detail__info">
                    <div className="info">
                        <span className={ `status ${ character.status === 'Dead' ? 'red' : '' }` }></span>
                        <span>&nbsp;{ character.status }</span>
                        <span>&nbsp;{ character.species }</span>
                    </div>
                    <div className="location">
                        <p>Last known location:</p>
                        <p>{ character.location.name }</p>
                    </div>
                    <div className="actions">
                        { isItExist ? <p>this character already is in your favourites</p> :
                            <button className="btn btn--primary" onClick={ () => addToFav( character.id ) }>
                            add to favourite
                        </button>}
                    </div>
                </div>
            </div>
    )
}
