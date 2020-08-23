import gql from 'graphql-tag';

export const GET_USER = gql`
  {
    me {
        _id
        username
        email
        bookCount
        savedMovies {
              movieId
              name
              vote
              overview
              image
              release
        }
    }
  }
`;