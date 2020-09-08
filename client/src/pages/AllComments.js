import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { QUERY_COMMENTS, QUERY_ME_BASIC } from '../utils/queries';
import CommentForm from '../components/CommentForm';
import CommentList from '../components/CommentList';
import FriendList from '../components/FriendList';
import { Jumbotron, Container, CardColumns, Card, Form, Button } from 'react-bootstrap';
import Auth from '../utils/auth';

const AllComments = () => {
  // use useQuery hook to make query request
  const { loading, data } = useQuery(QUERY_COMMENTS);
  
  // use object destructuring to extract `data` from the `useQuery` Hook's response and rename it `userData` to be more descriptive
  const { data: userData } = useQuery(QUERY_ME_BASIC);
  
  const comments = data?.comments || [];
    console.log(comments);

  const loggedIn = Auth.loggedIn();

  return (
    <>
    <Container>
      <h2 className="results-heading saved-heading"></h2>
      <div className="flex-row justify-space-between mb-3">
        {loggedIn && (
          <div className="col-12 mb-3">
            <CommentForm />
          </div>
        )}
        <div className={`col-12 mb-3 ${loggedIn && 'col-lg-8'}`}>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <CommentList comments={comments} title="Comments..." />
          )}
        </div>

        {loggedIn && userData ? (
          <div className="col-12 col-lg-3 mb-3">
            <FriendList
              username={userData.me.username}
              friendCount={userData.me.friendCount}
              friends={userData.me.friends}
            />
          </div>
          ) : null}
      </div>
    </Container>
    </>
  );
};

export default AllComments;