import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
 mutation loginUser($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
       token
      user {
        _id
        username
        email
      }
  }
`;

export const SAVE_BOOK = gql`
  mutation saveBook($title: String!, $author: String!) {
    saveBook(title: $title, author: $author) {
      _id
      username
      email
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

export const REMOVE_BOOK = gql`
  mutation removeBook($bookId: ID!) {
    removeBook(bookId: $bookId) {
      _id
      title
      author
    }
  }
`;