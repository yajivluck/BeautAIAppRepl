
import { gql } from '@apollo/client';
import {USER_FRAGMENT } from './users.fragments';

// User Mutations
export const SIGNUP_USER = gql`
  mutation SignupUser($signupUserInput: SignupUserInput!) {
    signup(signupUserInput: $signupUserInput) {
      ...UserFragment
    }
  }
  ${USER_FRAGMENT}
`;

export const LOGIN_USER = gql`
  mutation LoginUser($loginUserInput: LoginUserInput!) {
    login(loginUserInput: $loginUserInput) {
      access_token
      user {
        ...UserFragment
      }
    }
  }
  ${USER_FRAGMENT}
`;
