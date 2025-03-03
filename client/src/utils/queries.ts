// ! Important for useQuery: We bring in gql from the @apollo/client library to allow us to parse queries (and mutations) as template literals
import { gql } from '@apollo/client';
import { query } from 'express';

// ! Important for useQuery: Each query we'd like to be able to perform gets exported out of our queries.js utility
export const QUERY_BOOKS = gql`
  query allBooks {
    books {
      _id
      title
      author
    }
  }
`

export const QUERY_SINGLE_BOOK = gql`
  query singleBOOK($bookId: ID!) {
    book(bookId: $bookId) {
      _id
      title
      author
    }
  }
`

export const QUERY_USERS = gql`
  query allUsers {
    users {
      _id
      username
      email
    }
  }
`;

export const QUERY_SINGLE_USER = gql`
  query singleUser($userId: ID!) {
    user(userId: $userId) {
      _id
      username
      email
    }
  }
`;
export const GET_ME = gql`
  query me {
    me {
      _id
      username
      email
      bookCount
      savedBooks {
        _id
        title
        author
        description
        image
        link
      }
    }
  }
`;
