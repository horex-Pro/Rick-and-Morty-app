
import Navbar from './components/Navbar'

import "./App.css";
import CharacterList from './components/CharacterList';
import CharacterDetail from './components/CharacterDetail';

import { allCharacters } from '../data/data';

function App(){
  return (
    <div className="app">
      <Navbar />
      <div className="main">
        <CharacterList characters={allCharacters} />
        <CharacterDetail/>
      </div>
    </div>
  )
}


export default App;