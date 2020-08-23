import React, { useState, useEffect } from 'react';
import Auth from '../utils/auth';
import { Jumbotron, Container, Col, Form, Button, Card, CardColumns } from 'react-bootstrap';
import { searchUtelly, searchTMDB } from '../utils/API';
import { saveMovieIds, getSavedMovieIds } from '../utils/localStorage';
import { SAVE_MOVIE } from '../utils/mutations';
import { useMutation } from '@apollo/react-hooks';

const SearchMovies = () => {
  const [saveMovie, { error }] = useMutation(SAVE_MOVIE);
  const [searchedMovies, setSearchedMovies] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [savedMovieIds, setSavedMovieIds] = useState(getSavedMovieIds());

  useEffect(() => {
    return () => saveMovieIds(savedMovieIds);
  });

  const handleFormSubmit = async (event) => {
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

      const movieData = results.map((movie) => ({
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
      setSearchInput('');
    } catch (err) {
      console.error(err);
    }
  };

  const handleSaveMovie = async (movieId) => {
    const movieToSave = searchedMovies.find((movie) => movie.movieId === movieId);

    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const { data } = await saveMovie({
        variables: { input: movieToSave }
      });

      if (error) {
        throw new Error('Something went wrong!');
      }

      setSavedMovieIds([...savedMovieIds, movieToSave.movieId]);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Jumbotron fluid className='text-light bg-dark'>
        <Container>
          <h1>Keep Track of Movies Your Way.</h1>
          <Form onSubmit={handleFormSubmit}>
            <Form.Row>
              <Col xs={12} md={8}>
                <Form.Control
                  name='searchInput'
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  type='text'
                  size='lg'
                  placeholder='The Dark Knight'
                />
              </Col>
              <Col xs={12} md={4}>
                <Button type='submit' variant='success' size='lg'>
                  Submit Search
                </Button>
              </Col>
            </Form.Row>
          </Form>
        </Container>
      </Jumbotron>

      <Container>
        <h2>
          {searchedMovies.length
            ? `Viewing ${searchedMovies.length} results:`
            : 'Search for a movie to begin'}
        </h2>
        <CardColumns>
          {searchedMovies.map((movie) => {
            return (
              <Card key={movie.movieId} border='dark'>
                {movie.image ? (
                  <Card.Img src={movie.image} alt={`The cover for ${movie.name}`} variant='top' />
                ) : null}
                <Card.Body>
                  <Card.Title>{movie.name}</Card.Title>
                  <p className='small'>Rating: {movie.vote} </p>
                  <p className='small'>Release Date: {movie.release} </p>
                  <p className='small'>Overview: {movie.overview} </p>
                  <Card.Text>{movie.description}</Card.Text>
                  {Auth.loggedIn() && (
                    <Button
                      disabled={savedMovieIds?.some((savedMovieId) => savedMovieId === movie.movieId)}
                      className='btn-block btn-info'
                      onClick={() => handleSaveMovie(movie.movieId)}>
                      {savedMovieIds?.some((savedMovieId) => savedMovieId === movie.movieId)
                        ? 'Movie already saved!'
                        : 'Save this Movie!'}
                    </Button>
                  )}
                </Card.Body>
              </Card>
            );
          })}
        </CardColumns>
      </Container>
    </>
  );
};

export default SearchMovies;
