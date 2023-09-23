
import Navbar from './components/Navbar'

import "./App.css";
import CharacterList from './components/CharacterList';
import CharacterDetail from './components/CharacterDetail';
import { useEffect, useState } from 'react';

import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';


function App ()
{
  
  const [ characters, setCharacters ] = useState([]);

  useEffect( () =>
  {
    async function getData ()
    {
      try
      {
        const { data } = await axios.get( 'https://rickandmortyapi.com/api/character/?page=1' );

        setCharacters(data.results.splice(0,5))
        
      } catch (error) {
        toast.error( error.response.data.error );
      }
    }
    getData();
  }, [] )

  return (
    <div className="app">
      <Toaster/>
      <Navbar numOfResult={characters.length} />
      <Main characters={ characters }>
        <CharacterList characters={ characters} />
        <CharacterDetail/>
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