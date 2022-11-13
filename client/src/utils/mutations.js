import { gql } from 'apollo/client';

export const LOGIN_USER = gql`
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
            user {
             _id
             username
            }
        }
    }
`;

export const ADD_USER = gql`
    mutation addUser($email: String!, $password: String!) {
        addUSer(username: $username, email: $email, password: $password) {
            token
            user {
             _id
             username
            }
        }
    }
`;

export const ADD_FRIEND = gql`
  mutation addFriend($id: ID!) {
    addFriend(friendId: $id) {
      _id
      username
      friendCount
      friends {
        _id
        username
      }
    }
  }
`;

export const ADD_REVIEW = gql`
  mutation addReview($reviewText: String!) {
    addReview(reviewText: $reviewText) {
      _id
      reviewText
      createdAt
      username
      commentCount
      comments {
        _id
      }
    }
  }
`;

export const ADD_COMMENT= gql`
  mutation addComment($reviewId: ID!, $commentBody: String!) {
    addComment(reviewId: $reviewId, commentBody: $commentBody) {
      _id
      commentCount
      comments {
        _id
        commentBody
        createdAt
        username
      }
    }
  }
`;

