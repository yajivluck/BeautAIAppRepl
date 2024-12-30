import { gql } from '@apollo/client';

// User Fragment
export const USER_FRAGMENT = gql`
  fragment UserFragment on User {
    user_id
    username
    email
  }
`;
