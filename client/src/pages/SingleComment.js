import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import { QUERY_COMMENT } from '../utils/queries';
import { Jumbotron, Container, CardColumns, Card, Button } from 'react-bootstrap';

const SingleComment = props => {
    const { id: commentId } = useParams();
        console.log(commentId);

    const { loading, data } = useQuery(QUERY_COMMENT, {
        variables: { id: commentId }
    });

    const comment = data?.comment || {};
    if (loading) {
        return <div>Loading...</div>;
    }

  return (
    <>
    <Container>
        <div className="card mb-3">
            <p className="card-header">
                <span style={{ fontWeight: 700 }} className="text-light">
                    {comment.username}
                </span>{' '}
                comment on {comment.createdAt}
            </p>
            <div className="card-body">
                <p>{comment.commentText}</p>
            </div>
        </div>
    </Container>
    </>
  );
};

export default SingleComment;
