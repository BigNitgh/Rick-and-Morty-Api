import { useState,useEffect } from "react";
import Characters from "./Character";

function NavPage({page, setPage}){
    return(
      <header className="d-flex justify-content-between align-items-center">
        <p>Page: {page}</p>
        <button
        onClick={()=>{
          setPage(page + 1 )
        }} 
        className="btn btn-primary btn-sm">
          Page : {page + 1 }
        </button>
      </header>
    )
  }
  
  const CharacterList = () => {
    const [characters, setCharacters] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page , setPage] = useState(1)
  
    useEffect(() => {
      async function fetchData() {
        const response = await fetch(`https://rickandmortyapi.com/api/character?page=${page}`);
        const data = await response.json();
        setLoading(false);
        setCharacters(data.results);
      }
      fetchData();
    }, [page]);
  
    return (
      <div className="container">
        <NavPage page={page} setPage={setPage}/>
  
        {loading ? (
          <h1>Loading....</h1>
        ) : (
          <div className="row">
            {characters.map((character) => {
              return (
                <div key={character.id} className="col-md-4">
                  <Characters character={character} />
                </div>
              );
            })}
          </div>
        )}
              <NavPage page={page} setPage={setPage}/>
      </div>
    );
  };

 export default CharacterList