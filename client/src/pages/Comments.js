import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { QUERY_COMMENTS } from '../utils/queries';
import CommentList from '../components/CommentList';

const Comments = () => {
  // use useQuery hook to make query request
  const { loading, data } = useQuery(QUERY_COMMENTS);

  // get the comment data out of the query's response
  const comments = data?.comments || [];
  console.log(comments);

  return (
    <main>
        <div className="flex-row justify-space-between">
            <div className="col-12 mb-3">
                {loading ? (
                    <div>Loading...</div>
                ) : (
                    <CommentList comments={comments} title="Some Feed for Thought(s)..." />
                )}
            </div>
        </div>
    </main>
  );
};

export default Comments;
