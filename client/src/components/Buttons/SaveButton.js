import React from 'react'

export default function SaveButton() {
    return (
        <Button
            disabled={savedMovieIds?.some((savedMovieId) => savedMovieId === movie.movieId)}
            className='btn-block btn-info'
            onClick={() => handleSaveMovie(movie.movieId)}>
            {savedMovieIds?.some((savedMovieId) => savedMovieId === movie.movieId)
            ? 'Saved!'
            : 'Save this Movie!'}
        </Button>
    )
}
