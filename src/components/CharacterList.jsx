import Character from "./Character";

function CharacterList ({characters})
{

    return (
        <div className="characters-list">
            { characters.map( item =>
            {
                return <Character key={ item.id } item={ item } />;
            } ) }
        </div>
    )
}

export default CharacterList;


