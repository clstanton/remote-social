import React, { useState, setSta } from 'react';
import Auth from '../utils/auth';
import { Jumbotron, Container, CardColumns, Card, Button, Col, Row } from 'react-bootstrap';
import { removeMovieId } from '../utils/localStorage';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { REMOVE_MOVIE } from '../utils/mutations';
import { GET_USER } from '../utils/queries';
import Toggle from '../components/toggleInfo';

const SavedMovies = () => {
  const [removeMovie, { error }] = useMutation(REMOVE_MOVIE);
  const [toggle, setToggle] = useState(false);

  const { loading, data } = useQuery(GET_USER);
  const userData = data?.me || {};

  const clickHandler = (toggle) => {
    setToggle(!toggle);
  };

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

  return (
    <>
      <Container>
        <h2 className="results-heading saved-heading">
          {userData.movieCount
            ? `Viewing ${userData.movieCount} saved ${userData.movieCount === 1 ? 'movie' : 'movies'}:`
            : 'You have no saved movies!'}
        </h2>
        <CardColumns>
          {userData.savedMovies.map((movie) => {
            return (
              <Toggle movie={movie} />
            );
          })}
        </CardColumns>
      </Container>
    </>
  );
};

export default SavedMovies;
