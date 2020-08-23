import React from 'react';
import Auth from '../utils/auth';
import { Jumbotron, Container, CardColumns, Card, Button } from 'react-bootstrap';
import { removeMovieId } from '../utils/localStorage';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { REMOVE_MOVIE } from '../utils/mutations';
import { GET_USER } from '../utils/queries';

const SavedMovies = () => {
  const [removeMovie, { error }] = useMutation(REMOVE_MOVIE);

  const { loading, data } = useQuery(GET_USER);
  const userData = data?.me || {};

  // useEffect(() => {
  //   const getUserData = async () => {
  //     try {
  //       const token = Auth.loggedIn() ? Auth.getToken() : null;

  //       if (!token) {
  //         return false;
  //       }

  //       const response = await getMe(token);

  //       if (!response.ok) {
  //         throw new Error('something went wrong!');
  //       }

  //       const user = await response.json();
  //       setUserData(user);
  //     } catch (err) {
  //       console.error(err);
  //     }
  //   };

  //   getUserData();
  // }, [userDataLength]);

  const handleDeleteMovie = async (movieId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const { data } = await removeMovie({
        variables: { movieId }
      });

      if (error) {
        throw new Error('Something went wrong!');
      }

      removeMovieId(movieId);
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return <h2>LOADING...</h2>;
  }

  function countMovies () {
    if (userData.movieCount) {
      let grammarMovies = 'movies';
      if (userData.movieCount === 1) {
        grammarMovies = 'movie';
      }
      else {
        grammarMovies = 'movies';
      }
      return <h2>Viewing {userData.movieCount} saved {grammarMovies}.</h2>;
    }
    else {
    return <h2>You have no saved movies!</h2>;
    }
  }

  return (
    <>
      <Jumbotron fluid className='text-light bg-dark'>
        <Container>
          <h1>Viewing saved movies!</h1>
        </Container>
      </Jumbotron>
      <Container>
        {/* <h2>
          {userData.movieCount
            ? `Viewing ${userData.movieCount} saved ${userData.movieCount === 1 ? 'movie' : 'movies'}:`
            : 'You have no saved movies!'}
        </h2> */}
        {countMovies()}
        <CardColumns>
          {userData.savedMovies.map((movie) => {
            return (
              <Card key={movie.movieId} border='dark'>
                {movie.image ? <Card.Img src={movie.image} alt={`The cover for ${movie.title}`} variant='top' /> : null}
                <Card.Body>
                  <Card.Title>{movie.title}</Card.Title>
                  <p className='small'>Authors: {movie.authors}</p>
                  <Card.Text>{movie.description}</Card.Text>
                  <Button className='btn-block btn-danger' onClick={() => handleDeleteMovie(movie.movieId)}>
                    Delete this Movie!
                  </Button>
                </Card.Body>
              </Card>
            );
          })}
        </CardColumns>
      </Container>
    </>
  );
};

export default SavedMovies;
