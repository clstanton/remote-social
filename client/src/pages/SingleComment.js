import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import { QUERY_COMMENT } from '../utils/queries';
import { Jumbotron, Container, CardColumns, Card, Button } from 'react-bootstrap';
import ReactionList from '../components/ReactionList';
import ReactionForm from '../components/ReactionForm';
import Auth from '../utils/auth';

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
        <h2 className="results-heading saved-heading"></h2>
        <div>
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
            {Auth.loggedIn() && <ReactionForm commentId={comment._id} />}
            {comment.reactionCount > 0 && <ReactionList reactions={comment.reactions} />} 
        </div>
    </Container>
    </>
  );
};

export default SingleComment;
