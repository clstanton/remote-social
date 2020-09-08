import React from 'react';
import Auth from '../../utils/auth';
import { Redirect, useParams } from 'react-router-dom';
import CommentForm from '../CommentForm';
import CommentList from '../CommentList';
import FriendList from '../FriendList';
import { QUERY_USER, QUERY_ME, QUERY_ME_BASIC } from '../../utils/queries';
import { ADD_FRIEND } from '../../utils/mutations';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { Jumbotron, Container, CardColumns, Card, Form, Button } from 'react-bootstrap';

const SocialProfile = () => {
  const [addFriend] = useMutation(ADD_FRIEND);
  const { username: userParam } = useParams();

  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
  //const { loading, data } = useQuery(QUERY_USER, {
    variables: { username: userParam }
  });

  const user = data?.me || data?.user || {};
  //const user = data?.user || {};

  // use object destructuring to extract `data` from the `useQuery` Hook's response and rename it `userData` to be more descriptive
  //const { data: userData } = useQuery(QUERY_ME_BASIC);

  //redirect to personal profile page if username is the logged-in user's
  //if (Auth.loggedIn() && Auth.getProfile().data.username.toLowerCase() === userParam.toLowerCase()) {
    //return <Redirect to="/saved" />;
  //}

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user?.username) {
    return (
      <h4>
        You need to be logged in to see this page. Use the navigation links above to sign up or log in!
      </h4>
    );
  }

  const handleClick = async () => {
    try {
      await addFriend({
        variables: { id: user._id }
      });
    } catch (e) {
      console.error(e);
    }
  };

  //const loggedIn = Auth.loggedIn();

  return (
    <div>
      <div className="flex-row mb-3">
        <h2 className="bg-dark text-secondary p-3 display-inline-block">
          {/*Viewing {user.username}'s profile.*/}
          Viewing {userParam ? `${user.username}'s` : 'your'} profile.
        </h2>

        {userParam && (
          <Button className='search-btn' type='submit' size='lg' onClick={handleClick}>
            Add Friend
          </Button>
        )}
      </div>

      {/*<div className="flex-row justify-space-between mb-3">
        <div className={`col-12 mb-3 ${loggedIn && 'col-lg-8'}`}>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <CommentList comments={user.comments} title={`${user.username}'s comments...`} />
          )}
        </div>

        {/*{loggedIn && userData ? (
          <div className="col-12 col-lg-3 mb-3">
            <FriendList
              username={userData.me.username}
              friendCount={userData.me.friendCount}
              friends={userData.me.friends}
            />
          </div>
        ) : null}*/}

        <div className="flex-row justify-space-between mb-3">
          <div className="col-12 mb-3 col-lg-8">
            <CommentList comments={user.comments} title={`${user.username}'s comments...`} />
        </div>

        <div className="col-12 col-lg-3 mb-3">
          <FriendList
            username={user.username}
            friendCount={user.friendCount}
            friends={user.friends}
          />
        </div>
      </div>
      <div className="mb-3">{!userParam && <CommentForm />}</div>
    </div>
  );
};

export default SocialProfile;