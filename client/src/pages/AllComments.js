import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { QUERY_COMMENTS } from '../utils/queries';
import CommentList from '../components/CommentList';
import { Jumbotron, Container, CardColumns, Card, Button } from 'react-bootstrap';

const AllComments = () => {
  // use useQuery hook to make query request
  const { loading, data } = useQuery(QUERY_COMMENTS);
  const comments = data?.comments || [];
    console.log(comments);

  return (
    <>
    <Container>
        <h2 className="results-heading saved-heading">
            {loading ? (
                <div>Loading...</div>
            ) : (
                <CommentList comments={comments} title="Some Feed for Comment(s)..." />
            )}
        </h2>
    </Container>
    </>
  );
};

export default AllComments;