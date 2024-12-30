import { gql } from "@apollo/client";

export const LOGIN_MUTATION = gql`
  mutation Login($emailOrUsername: String!, $password: String!) {
    login(
      loginUserInput: { emailOrUsername: $emailOrUsername, password: $password }
    ) {
      access_token
      user {
        username
        email
        name
      }
    }
  }
`;

export const SIGN_UP_MUTATION = gql`
  mutation Signup($signupUserInput: SignupUserInput!) {
    signup(signupUserInput: $signupUserInput) {
      access_token
      user {
        user_id
        name
        username
        email
      }
    }
  }
`;
