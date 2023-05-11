import { gql } from 'graphql-tag';

export const GET_NEXT_AND_PREVIOUS_POSTS = gql`
  query GetNextAndPreviousPosts($after: String!, $before: String!) {
    posts(before: $before, after: $after) {
      edges {
        node {
          id
          title
          uri
        }
      }
    }
  }
`;
