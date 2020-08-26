import React, { useState, useEffect } from 'react';
// import Auth from '../utils/auth';
import { Container, Col, Form, Button, Card, CardColumns } from 'react-bootstrap';
import { searchTMDB } from '../utils/API';
// import { saveMovieIds, getSavedMovieIds } from '../utils/localStorage';
// import { SAVE_MOVIE } from '../utils/mutations';
// import { useMutation } from '@apollo/react-hooks';
import Homepage from '../components/Homepage';
import SearchForm from '../components/SearchForm';
import Toggle from '../components/toggleInfo';

const SearchMovies = () => {
  //const [saveMovie, { error }] = useMutation(SAVE_MOVIE);
  const [searchedMovies, setSearchedMovies] = useState([]);
  //const [searchInput, setSearchInput] = useState('');
  // const [savedMovieIds, setSavedMovieIds] = useState(getSavedMovieIds());

  const handleFormSubmit = async (event, searchInput) => {
    event.preventDefault();
    
    if (!searchInput) {
      return false;
    }

    try {
      const response = await searchTMDB(searchInput);

      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      const { results } = await response.json();

      const filteredData = results.filter((movie) => {
        if (movie.poster_path) {
          return movie;
        }
      });

      console.log(filteredData);

      const movieData = filteredData.map((movie) => (
        {
        movieId: movie.id,
        vote: movie.vote_average, //|| ['No providers to display'],
        name: movie.title,
        overview: movie.overview,
        release: movie.release_date,
        // weight: movie.weight,
        // : movie.volumeInfo.imageLinks?.thumbnail || '',
        image: 'https://image.tmdb.org/t/p/w500' + movie.poster_path || '',
        // showingLink: movie.locations.url
      }));

      setSearchedMovies(movieData);
      //setSearchInput('');
    } catch (err) {
      console.error(err);
    }
  };


  return (
    <>
    {!searchedMovies.length && <Homepage handleFormSubmit={handleFormSubmit} />}
    {searchedMovies.length && <SearchForm handleFormSubmit={handleFormSubmit} />}
      <Container>
        <h2 className="results-heading">
          {searchedMovies.length
            ? `Viewing ${searchedMovies.length} results:`
            : ''}
        </h2>
        <CardColumns>
          {searchedMovies.map((movie) => {
            return (
              <Toggle movie={movie} searchOrLibProp={true} searchedMovies={searchedMovies} />
            );
          })}
        </CardColumns>
      </Container>
    </>
  );
};

export default SearchMovies;
