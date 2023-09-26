
import { HeartIcon } from '@heroicons/react/24/outline'
  
function Navbar({numOfResult,query,setQuery,numOfFav}) {
  return (
    <nav className='navbar'>
      <div className="navbar__logo">
        Logo
      </div>
      <Search query={query} setQuery={setQuery}/>
      <div className="navbar__result">
        Found { numOfResult } characters
      </div>
      <button className='heart'>
        <HeartIcon className='icon'/>
        <span className="badge">{ numOfFav}</span>
      </button>
    </nav>
  )
}

export default Navbar;


function Search ({query,setQuery})
{
  return (
    <input type="text" className='text-field' placeholder='search...' value={query} onChange={(e)=> setQuery(e.target.value)} />
  )
}