import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { ADD_REACTION } from '../../utils/mutations';
import { Jumbotron, Container, CardColumns, Card, Button } from 'react-bootstrap';

const ReactionForm = ({ commentId }) => {
    const [reactionBody, setBody] = useState('');
    const [characterCount, setCharacterCount] = useState(0);
    const [addReaction, { error }] = useMutation(ADD_REACTION);
    
    const handleChange = event => {
        if (event.target.value.length <= 280) {
            setBody(event.target.value);
            setCharacterCount(event.target.value.length);
        }
    };

    const handleFormSubmit = async event => {
      event.preventDefault();

      try {
          // add reaction to comment
          await addReaction({
            variables: { reactionBody, commentId }
          });

          // clear form value
          setBody('');
          setCharacterCount(0);
          } catch (e) {
          console.error(e);
          }
      };
      
  return (
    <div>
      <p className={`m-0 ${characterCount === 280 || error ? 'text-error' : ''}`}>
        Character Count: {characterCount}/280
        {error && <span className="ml-2">Something went wrong...</span>}
      </p>
      <form
        className="flex-row justify-center justify-space-between-md align-stretch"
        onSubmit={handleFormSubmit}
      >
        <textarea
            placeholder="Leave a reaction to this thought..."
            value={reactionBody}
            className="form-input col-12 col-md-9"
            onChange={handleChange}
        ></textarea>

        <Button className='search-btn' type='submit' size='lg'>
          Submit
        </Button>
      </form>
    </div>
  );
};

export default ReactionForm;