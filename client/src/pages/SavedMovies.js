import React, { useState, setState } from 'react';
import Auth from '../utils/auth';
import { Jumbotron, Container, CardColumns, Card, Button, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { removeMovieId } from '../utils/localStorage';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { REMOVE_MOVIE, ADD_FRIEND } from '../utils/mutations';
import { QUERY_COMMENTS, GET_USER, QUERY_ME_BASIC, QUERY_ME, QUERY_USER } from '../utils/queries';
import Toggle from '../components/toggleInfo';
import CommentList from '../components/CommentList';
import FriendList from '../components/FriendList';
import { useParams } from 'react-router-dom';


const SavedMovies = () => {
  const [removeMovie, { error }] = useMutation(REMOVE_MOVIE);
  const [toggle, setToggle] = useState(false);
  const [addFriend] = useMutation(ADD_FRIEND);
  const { loading, data } = useQuery(GET_USER, QUERY_COMMENTS);
  const userData = data?.me || {};
  const comments = data?.comments || [];
    console.log(comments);
  const { username: userParam } = useParams();
  const user = data?.user || {};
  if (loading) {
    return <div>Loading...</div>;
  }

  const clickHandler = (toggle) => {
    setToggle(!toggle);
  };
  //const { data: userData } = useQuery(QUERY_ME_BASIC);
  //const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    //variables: { username: userParam }
  //});
  //const { loading, data } = useQuery(QUERY_COMMENTS);
  //const { loading, data } = useQuery(QUERY_USER, {
    //variables: { username: userParam }
  //});
  //const user = data?.me || data?.user || {};
  

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

  const handleClick = async () => {
    try {
      await addFriend({
        variables: { id: user._id }
      });
    } catch (e) {
      console.error(e);
    }
  };

  if (loading) {
    return <h2>LOADING...</h2>;
  }

  return (
    <>
      <Container>
        <h2 className="results-heading">
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
      <main>
        <div className="flex-row justify-space-between">
          <div className={`col-12 mb-3`}>
            {loading ? (
              <div>Loading...</div>
            ) : (
              <CommentList comments={comments} title="Some Feed for Thought(s)..." />
            )}
          </div>
        </div>
        <div>
          <div className="flex-row mb-3">
            <h2 className="bg-dark text-secondary p-3 display-inline-block">
              Viewing {userParam ? `${user.username}'s` : 'your'} profile.
            </h2>
          </div>
          <div>
            <button className="btn ml-auto" onClick={handleClick}>
              Add Friend
            </button>
          </div>
          <div className="flex-row justify-space-between mb-3">
            {/*<div className="col-12 mb-3 col-lg-8">
              <CommentList comments={user.comments} title={`${user.username}'s thoughts...`} />
            </div>*/}
            <div className="col-12 col-lg-3 mb-3">
              <FriendList
                username={user.username}
                friendCount={user.friendCount}
                friends={user.friends}
              />
            </div>
        </div>
        </div>
      </main>
    </>
  );
};

export default SavedMovies;
