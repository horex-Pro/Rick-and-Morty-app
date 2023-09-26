
import Navbar from './components/Navbar'

import "./App.css";
import CharacterList from './components/CharacterList';
import CharacterDetail from './components/CharacterDetail';
import { useEffect, useState } from 'react';

import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';


function App ()
{
  
  const [ characters, setCharacters ] = useState( [] );
  const [ query, setQuery ] = useState( '' );
  const [ selectedId, setSelectedId ] = useState();
  const [ favourates, setFavourates ] = useState( [] );


  useEffect( () =>
  {
    async function getData ()
    {
      try
      {
        const { data } = await axios.get( `https://rickandmortyapi.com/api/character/?name=${ query }` );

        setCharacters( data.results );
        
      } catch ( error )
      {
        setCharacters( [] );
        toast.error( error.response.data.error );
      }
    }
    getData();
  }, [ query ] )


  const selectHnadler = (id) =>
  {
    setSelectedId(id)
  }

  const addFavourateHandler = async ( id ) =>
  {
    setFavourates( prevFav => [ ...prevFav, characters[ id-1 ] ] );
  };

  const isItExist = favourates.map( item => item.id ).includes( selectedId );


  return (
    <div className="app">
      <Toaster/>
      <Navbar numOfResult={ characters.length } query={ query } setQuery={ setQuery } numOfFav={ favourates.length} />
      <Main characters={ characters }>
        <CharacterList characters={ characters} onSelect={selectHnadler} />
        <CharacterDetail selectedId={ selectedId} addToFav={addFavourateHandler} isItExist={isItExist} />
      </Main>
    </div>
  )
}

export default App;


function Main ({children})
{
  return (
    <div className="main">
        {children}
    </div>
  )
}