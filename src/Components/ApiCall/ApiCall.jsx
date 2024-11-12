import React, { useState } from 'react';
import './ApiCall.css';
import { useQuery } from 'react-query';
import axios from 'axios';

const fetchCharacters = async (page) => {
  const response = await axios.get(`https://rickandmortyapi.com/api/character?page=${page}`);
  return response.data;
};

const ApiCall = () => {
  const [page, setPage] = useState(1);
  const { data,isLoading,isError} = useQuery(['characters', page], () => fetchCharacters(page), {
    keepPreviousData: true,
  });
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching data</div>;
  }

  const handleNext = () => {
    if (data.info.next) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const handlePrevious = () => {
    if (data.info.prev) {
      setPage((prevPage) => prevPage - 1);
    }
  };

  return (
    <React.Fragment>
      <div className="character-list">
        {data.results.map((character) => (
          <div key={character.id} className="character-card">
            <img src={character.image} alt={character.name} className="character-image" />
            <div className="character-details">
              <h3 className="character-name">{character.name}</h3>
              <p className="character-info">
                <span className={`${character.status.toLowerCase()}`}></span>
                {character.status} - {character.species} {character.type ? `- ${character.type}` : ''}
              </p>
              <p><strong>Gender:</strong> {character.gender}</p>
              <p><strong>Last known location:</strong> {character.location.name}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="pagination">
        <button onClick={handlePrevious} disabled={!data.info.prev} className="pagination-button">Previous</button>
        <span>Page {page}</span>
        <button onClick={handleNext} disabled={!data.info.next} className="pagination-button">Next</button>
      </div>
    </React.Fragment>
  );
};

export default ApiCall;
