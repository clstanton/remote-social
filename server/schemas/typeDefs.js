const { gql } = require('apollo-server-express');

const typeDefs = gql`
  
    type Movie {
        movieId: String
        vote: Float
        overview: String
        name: String
        image: String
        release: String
    }

    type User {
        _id: ID
        username: String
        email: String
        movieCount: Int
        savedMovies: [Movie]
    }
  
    input movieInput {
        movieId: String
        vote: Float
        overview: String
        name: String
        image: String
        release: String
    }

    type Query {
        me: User
    }

    type Auth {
        token: ID
        user: User
    }

    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        saveMovie(input: movieInput): User
        removeMovie(movieId: String!): User
    }
`;

module.exports = typeDefs; 