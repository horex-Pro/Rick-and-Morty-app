
import Navbar from './components/Navbar'

import "./App.css";
import CharacterList from './components/CharacterList';
import CharacterDetail from './components/CharacterDetail';
import { useEffect, useState } from 'react';

import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import Modal from './components/Modal';


function App ()
{
  
  const [ characters, setCharacters ] = useState( [] );
  const [ query, setQuery ] = useState( '' );
  const [ selectedId, setSelectedId ] = useState();
  const [ favourates, setFavourates ] = useState( [] );


  useEffect( () =>
  {

    const controller = new AbortController;
    const signal = controller.signal;
    async function getData ()
    {
      try
      {
        const { data } = await axios.get( `https://rickandmortyapi.com/api/character/?name=${ query }` , {signal} );

        setCharacters( data.results );
        
      } catch ( error )
      {

        if ( !axios.isCancel() )
        {
          setCharacters( [] );
          toast.error( error.response.data.error );
        }
      }
    }
    getData();

    return () =>
    {
      controller.abort();
    }
  }, [ query ] )


  const selectHnadler = (id) =>
  {
    setSelectedId(id)
  }

  const addFavourateHandler = async ( id ) =>
  {
    setFavourates( prevFav => [ ...prevFav, characters[ id-1 ] ] );
  };

  const deleteFavHandler = ( id ) =>
  {
    setFavourates((prevFav)=> prevFav.filter(item => item.id !== id))
  }

  const isItExist = favourates.map( item => item.id ).includes( selectedId );

  return (
    <div className="app">
      <Toaster />
      <Navbar numOfResult={ characters.length } query={ query } setQuery={ setQuery } favourates={favourates} onDelete={deleteFavHandler}  />
      <Main characters={ characters }>
        <CharacterList characters={ characters} onSelect={selectHnadler}/>
        <CharacterDetail selectedId={ selectedId} addToFav={addFavourateHandler} isItExist={isItExist}  />
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