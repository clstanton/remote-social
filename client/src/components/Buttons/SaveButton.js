import React, { Component, useState, useEffect } from 'react'

import Auth from '../../utils/auth';
import { SAVE_MOVIE } from '../../utils/mutations';
import { useMutation } from '@apollo/react-hooks';
import { saveMovieIds, getSavedMovieIds } from '../../utils/localStorage';
import { Button } from 'react-bootstrap';

const SaveButton = (movie, props) => {
    console.log(props)
    const [saveMovie, { error }] = useMutation(SAVE_MOVIE);
    const [savedMovieIds, setSavedMovieIds] = useState(getSavedMovieIds());

    useEffect(() => {
        return () => saveMovieIds(savedMovieIds);
      });

    const handleSaveMovie = async (movieId, props) => {
        // console.log(movieId); UNDEFINED
        const movieToSave = props.searchedMovies.find((movie) => movie.movieId === movieId);
        console.log('------'+movieToSave)
    
        const token = Auth.loggedIn() ? Auth.getToken() : null;
    
        if (!token) {
          return false;
        }
    
        try {
          const { data } = await saveMovie({
           // variables: { input: movieToSave }
          });
    
          if (error) {
            throw new Error('Something went wrong!');
          }
    
         // setSavedMovieIds([...savedMovieIds, movieToSave.movieId]);
        } catch (err) {
          console.error(err);
        }
      };

    return (
        <Button
            disabled={savedMovieIds?.some((savedMovieId) => savedMovieId === movie.movieId)}
            className='btn-block btn-info card-btn'
            onClick={() => handleSaveMovie(movie.movieId)}>
            {savedMovieIds?.some((savedMovieId) => savedMovieId === movie.movieId)
            ? 'Saved!'
            : 'Save this Movie!'}
        </Button>
    )
}

export default SaveButton;