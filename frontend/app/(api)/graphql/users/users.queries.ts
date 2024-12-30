import { gql } from '@apollo/client';
import {USER_FRAGMENT } from './users.fragments';

// User Queries
export const GET_USERS = gql`
  query GetUsers {
    users {
      ...UserFragment
    }
  }
  ${USER_FRAGMENT}
`;

export const GET_USER = gql`
  query GetUser($username: String!) {
    user(username: $username) {
      ...UserFragment
    }
  }
  ${USER_FRAGMENT}
`;
