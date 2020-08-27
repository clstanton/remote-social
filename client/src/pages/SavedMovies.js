import React from 'react';
import { Jumbotron, Container, CardColumns, Card, Button, Col, Row } from 'react-bootstrap';
import { useQuery } from '@apollo/react-hooks';
import { QUERY_COMMENTS } from '../utils/queries';
import CommentList from '../components/CommentList';

const SavedMovies = () => {
  // use useQuery hook to make query request
  const { loading, data } = useQuery(QUERY_COMMENTS);
  const comments = data?.comments || [];
    console.log(comments);

  return (
    <Container>
      <CardColumns>
        <div className="flex-row justify-space-between">
          <div className="col-12 mb-3">
            {loading ? (
              <div>Loading...</div>
            ) : (
              <CommentList comments={comments} title="Comments" />
            )}
          </div>
        </div>
      </CardColumns>
    </Container>
  );
};

export default SavedMovies;
