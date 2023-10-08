import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function useCharacters (query)
{

  const [ characters, setCharacters ] = useState([])

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
    
    return {characters}
}