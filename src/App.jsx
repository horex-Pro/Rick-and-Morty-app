
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
  const [ query, setQuery ] = useState('');


  console.log(query)
  useEffect( () =>
  {
    async function getData ()
    {
      try
      {
        const { data } = await axios.get( `https://rickandmortyapi.com/api/character/?name=${query}` );

        setCharacters(data.results)
        
      } catch ( error )
      {
        setCharacters([])
        toast.error( error.response.data.error );
      }
    }
    getData();
  }, [query] )

  return (
    <div className="app">
      <Toaster/>
      <Navbar numOfResult={characters.length} query={query} setQuery={setQuery} />
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