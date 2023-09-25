import Character from "./Character";

function CharacterList ({characters,onSelect})
{

    return (
        <div className="characters-list">
            { characters.map( item =>
            {
                return <Character key={ item.id } item={ item } onSelect={onSelect} />;
            } ) }
        </div>
    )
}

export default CharacterList;


